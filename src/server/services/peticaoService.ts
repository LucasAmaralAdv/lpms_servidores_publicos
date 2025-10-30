import { OpenAI } from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

interface DadosPeticao {
  tipo: string;
  tese: string;
  cliente: string;
  processo: string;
  modeloReferencia?: string;
  informacoesAdicionais?: string;
}

interface TemplateModelo {
  [key: string]: string;
}

const templates: TemplateModelo = {
  'replica-licenca-premio': `EXCELENTISSIMO SENHOR DOUTOR JUIZ

Vem, respeitosamente, perante Vossa Excelencia, o(a) cliente [CLIENTE], por seu advogado infra-assinado, apresentar REPLICA ao processo no [PROCESSO], relativo a demanda sobre LICENCA-PREMIO, pelos motivos de fato e de direito a seguir expostos:

I - DOS FATOS

Trata-se de acao em que o cliente busca o reconhecimento de seu direito a licenca-premio nao usufruida durante sua carreira profissional.

II - DO DIREITO

A legislacao trabalhista garante ao servidor publico o direito a licenca-premio como forma de reconhecimento ao tempo de servico prestado.

III - DO PEDIDO

Pelo exposto, requer-se a procedencia da demanda para condenar a parte adversa ao pagamento da verba devida.

Respeitosamente submetido.`,

  'replica-abono-permanencia': `EXCELENTISSIMO SENHOR DOUTOR JUIZ

Vem, respeitosamente, perante Vossa Excelencia, o(a) cliente [CLIENTE], por seu advogado infra-assinado, apresentar REPLICA ao processo no [PROCESSO], relativo a demanda sobre ABONO DE PERMANENCIA, pelos motivos de fato e de direito a seguir expostos:

I - DOS FATOS

O cliente faz jus ao recebimento do abono de permanencia, conforme previsao constitucional e legal.

II - DO DIREITO

O abono de permanencia e direito adquirido do servidor que se submete ao regime de aposentadoria por tempo de contribuicao.

III - DO PEDIDO

Pelo exposto, requer-se a procedencia da demanda.

Respeitosamente submetido.`,

  'recurso-padrao': `EXCELENTISSIMO SENHOR DOUTOR PRESIDENTE DO TRIBUNAL

Vem, respeitosamente, perante Vossa Excelencia, o(a) cliente [CLIENTE], por seu advogado infra-assinado, interpor RECURSO ao processo no [PROCESSO], pelos motivos de fato e de direito a seguir expostos:

I - DOS FUNDAMENTOS DO RECURSO

A decisao recorrida contraria a jurisprudencia consolidada sobre a materia.

II - DO PEDIDO

Requer-se o provimento do recurso para reformar a decisao recorrida.

Respeitosamente submetido.`
};

/**
 * Gera uma peticao baseada em modelo e informacoes do caso
 */
export async function gerarPeticao(dados: DadosPeticao): Promise<string> {
  try {
    // Obter template base
    const chaveTemplate = `${dados.tipo}-${dados.tese.toLowerCase()}`;
    let template = templates[chaveTemplate] || templates['replica-padrao'] || templates['recurso-padrao'];

    // Substituir placeholders
    let peticao = template
      .replace('[CLIENTE]', dados.cliente)
      .replace('[PROCESSO]', dados.processo);

    // Se houver informacoes adicionais, usar IA para melhorar
    if (dados.informacoesAdicionais && dados.informacoesAdicionais.trim()) {
      peticao = await melhorarComIA(peticao, dados.informacoesAdicionais, dados.tese);
    }

    return peticao;
  } catch (error) {
    console.error('Erro ao gerar peticao:', error);
    throw new Error('Erro ao gerar peticao');
  }
}

/**
 * Melhora a peticao usando IA (OpenAI)
 */
async function melhorarComIA(peticao: string, informacoesAdicionais: string, tese: string): Promise<string> {
  try {
    const prompt = `Voce e um advogado especialista em direito trabalhista e administrativo. 

Melhore a seguinte peticao juridica sobre ${tese}, incorporando as informacoes adicionais fornecidas:

Peticao Original:
${peticao}

Informacoes Adicionais do Caso:
${informacoesAdicionais}

Por favor, melhore a peticao mantendo a estrutura formal, mas tornando-a mais robusta e fundamentada com as informacoes fornecidas.`;

    const response = await openai.chat.completions.create({
      model: 'gpt-4.1-mini',
      messages: [
        {
          role: 'user',
          content: prompt
        }
      ],
      max_tokens: 2000,
      temperature: 0.7
    });

    const conteudo = response.choices[0]?.message?.content;
    return conteudo || peticao;
  } catch (error) {
    console.error('Erro ao melhorar com IA:', error);
    // Retornar peticao original se IA falhar
    return peticao;
  }
}

/**
 * Analisa um documento e extrai informacoes relevantes
 */
export async function analisarDocumento(conteudo: string, tipo: string): Promise<string[]> {
  try {
    const prompt = `Voce e um analista juridico. Analise o seguinte documento de tipo "${tipo}" e extraia os pontos-chave relevantes para uma peticao juridica:

${conteudo}

Forneca uma lista de pontos-chave em formato de topicos.`;

    const response = await openai.chat.completions.create({
      model: 'gpt-4.1-mini',
      messages: [
        {
          role: 'user',
          content: prompt
        }
      ],
      max_tokens: 1000,
      temperature: 0.7
    });

    const conteudo_resposta = response.choices[0]?.message?.content || '';
    return conteudo_resposta.split('\n').filter(linha => linha.trim());
  } catch (error) {
    console.error('Erro ao analisar documento:', error);
    return [];
  }
}

/**
 * Gera um resumo de uma peticao
 */
export async function gerarResumo(peticao: string): Promise<string> {
  try {
    const prompt = `Voce e um advogado. Faca um resumo executivo da seguinte peticao juridica em no maximo 3 paragrafos:

${peticao}`;

    const response = await openai.chat.completions.create({
      model: 'gpt-4.1-mini',
      messages: [
        {
          role: 'user',
          content: prompt
        }
      ],
      max_tokens: 500,
      temperature: 0.7
    });

    return response.choices[0]?.message?.content || 'Resumo nao disponivel';
  } catch (error) {
    console.error('Erro ao gerar resumo:', error);
    return 'Resumo nao disponivel';
  }
}

/**
 * Valida uma peticao quanto a completude e qualidade
 */
export async function validarPeticao(peticao: string): Promise<{ valida: boolean; avisos: string[] }> {
  const avisos: string[] = [];

  // Validacoes basicas
  if (!peticao.includes('EXCELENTISSIMO')) {
    avisos.push('Falta saudacao formal ao juiz');
  }

  if (!peticao.includes('Pelos motivos')) {
    avisos.push('Falta introducao dos motivos');
  }

  if (!peticao.includes('PEDIDO') && !peticao.includes('pedido')) {
    avisos.push('Falta secao de pedidos');
  }

  if (peticao.length < 500) {
    avisos.push('Peticao muito curta, considere adicionar mais argumentacao');
  }

  return {
    valida: avisos.length === 0,
    avisos
  };
}
