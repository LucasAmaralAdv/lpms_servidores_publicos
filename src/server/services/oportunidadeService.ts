import { OpenAI } from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

interface DadosCliente {
  id: string;
  nome: string;
  cpf: string;
  dataAdmissao: string;
  dataAposentadoria: string;
  cargo: string;
  salario: number;
  documentos?: string[];
}

interface Oportunidade {
  id: string;
  tese: string;
  confianca: number;
  motivo: string;
  documentosNecessarios: string[];
}

const tesesDisponiveis = [
  {
    nome: 'Licenca-Premio',
    criterios: {
      tempoMinimoServico: 5,
      descricao: 'Direito a licenca remunerada a cada 5 anos de servico'
    }
  },
  {
    nome: 'Abono Permanencia',
    criterios: {
      tempoMinimoContribuicao: 30,
      descricao: 'Direito ao abono para quem se enquadra em aposentadoria por tempo de contribuicao'
    }
  },
  {
    nome: 'Diferencas Salariais',
    criterios: {
      descricao: 'Possivel diferenca entre salario recebido e salario devido'
    }
  },
  {
    nome: 'Gratificacao',
    criterios: {
      descricao: 'Direito a gratificacoes nao recebidas'
    }
  },
  {
    nome: 'Indenizacao',
    criterios: {
      descricao: 'Direito a indenizacoes por danos morais ou materiais'
    }
  }
];

export async function analisarClienteOportunidades(cliente: DadosCliente): Promise<Oportunidade[]> {
  try {
    const oportunidades: Oportunidade[] = [];

    const dataAdm = new Date(cliente.dataAdmissao);
    const dataAposentadoria = new Date(cliente.dataAposentadoria);
    const tempoServico = (dataAposentadoria.getTime() - dataAdm.getTime()) / (1000 * 60 * 60 * 24 * 365.25);

    for (const tese of tesesDisponiveis) {
      let confianca = 0;
      let motivo = '';
      const documentos: string[] = [];

      switch (tese.nome) {
        case 'Licenca-Premio':
          if (tempoServico >= 5) {
            confianca = Math.min(95, 50 + tempoServico * 5);
            motivo = `Cliente tem ${tempoServico.toFixed(1)} anos de servico`;
            documentos.push('Contracheque', 'Ficha Funcional', 'Certidao de Tempo de Servico');
          }
          break;

        case 'Abono Permanencia':
          if (tempoServico >= 25) {
            confianca = Math.min(95, 70 + (tempoServico - 25) * 2);
            motivo = 'Cliente se enquadra nos criterios de aposentadoria';
            documentos.push('Contracheque', 'Certidao de Aposentadoria', 'Comprovante de Contribuicao');
          }
          break;

        case 'Diferencas Salariais':
          confianca = 60;
          motivo = 'Possivel diferenca entre salario recebido e salario devido';
          documentos.push('Contracheque', 'Folha de Pagamento', 'Decreto de Reajuste');
          break;

        case 'Gratificacao':
          confianca = 55;
          motivo = 'Possivel direito a gratificacoes nao recebidas';
          documentos.push('Contracheque', 'Decreto de Gratificacao');
          break;

        case 'Indenizacao':
          confianca = 40;
          motivo = 'Possivel direito a indenizacoes por danos';
          documentos.push('Documentacao de Danos', 'Comprovantes');
          break;
      }

      if (confianca > 0) {
        oportunidades.push({
          id: `${cliente.id}-${tese.nome.toLowerCase().replace(/\\s/g, '-')}`,
          tese: tese.nome,
          confianca,
          motivo,
          documentosNecessarios: documentos
        });
      }
    }

    return oportunidades.sort((a, b) => b.confianca - a.confianca);
  } catch (error) {
    console.error('Erro ao analisar oportunidades:', error);
    return [];
  }
}

export async function analisarClientesEmMassa(clientes: DadosCliente[]): Promise<Map<string, Oportunidade[]>> {
  const resultados = new Map<string, Oportunidade[]>();

  for (const cliente of clientes) {
    const oportunidades = await analisarClienteOportunidades(cliente);
    resultados.set(cliente.id, oportunidades);
  }

  return resultados;
}

export async function gerarRelatorioOportunidades(oportunidades: Oportunidade[]): Promise<string> {
  try {
    const prompt = 'Voce e um advogado especialista. Analise as seguintes oportunidades de acoes juridicas';

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

    return response.choices[0]?.message?.content || 'Relatorio nao disponivel';
  } catch (error) {
    console.error('Erro ao gerar relatorio:', error);
    return 'Erro ao gerar relatorio';
  }
}

export function calcularValorPotencial(tese: string, tempoServico: number, salario: number): number {
  let valor = 0;

  switch (tese) {
    case 'Licenca-Premio':
      valor = (salario / 3) * 30;
      break;

    case 'Abono Permanencia':
      valor = salario * 0.1 * 12;
      break;

    case 'Diferencas Salariais':
      valor = salario * 0.05 * 12;
      break;

    case 'Gratificacao':
      valor = salario * 0.15;
      break;

    case 'Indenizacao':
      valor = salario * 3;
      break;
  }

  return valor;
}

export function priorizarOportunidades(
  oportunidades: Oportunidade[],
  salario: number,
  tempoServico: number
): Oportunidade[] {
  return oportunidades
    .map(opp => ({
      ...opp,
      valorPotencial: calcularValorPotencial(opp.tese, tempoServico, salario),
      score: opp.confianca * 0.7 + (calcularValorPotencial(opp.tese, tempoServico, salario) / salario) * 30
    }))
    .sort((a, b) => (b as any).score - (a as any).score)
    .map(({ valorPotencial, score, ...opp }) => opp);
}
