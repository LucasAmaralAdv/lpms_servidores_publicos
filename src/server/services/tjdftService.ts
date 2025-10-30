import axios from 'axios';

const TJDFT_API_URL = process.env.TJDFT_API_URL || 'https://pje-consultapublica.tjdft.jus.br/consultapublica';

interface ProcessoTJDFT {
  numeroProcesso: string;
  status: string;
  ultimoAndamento: string;
  dataUltimoAndamento: string;
  tribunal: string;
  juizado: string;
  andamentos: Array<{
    data: string;
    descricao: string;
    tipo: string;
  }>;
}

/**
 * Busca informações de um processo no TJDFT
 * @param numeroProcesso Número do processo (ex: 0001234-56.2023.5.10.0001)
 * @returns Dados do processo
 */
export async function buscarProcessoTJDFT(numeroProcesso: string): Promise<ProcessoTJDFT | null> {
  try {
    // Validar formato do número do processo
    if (!validarNumeroProcesso(numeroProcesso)) {
      throw new Error('Número de processo inválido');
    }

    // Fazer requisição ao TJDFT
    const response = await axios.get(`${TJDFT_API_URL}/ConsultaPublica/listView.seam`, {
      params: {
        numeroProcesso: numeroProcesso
      },
      timeout: 10000
    });

    // Fazer parsing dos dados (simplificado)
    const processo = parseProcessoFromHTML(response.data, numeroProcesso);
    
    return processo;
  } catch (error) {
    console.error('Erro ao buscar processo no TJDFT:', error);
    return null;
  }
}

/**
 * Busca processos por CPF do cliente
 * @param cpf CPF do cliente
 * @returns Lista de processos
 */
export async function buscarProcessosPorCPF(cpf: string): Promise<ProcessoTJDFT[]> {
  try {
    // Validar CPF
    if (!validarCPF(cpf)) {
      throw new Error('CPF inválido');
    }

    // Fazer requisição ao TJDFT
    const response = await axios.get(`${TJDFT_API_URL}/ConsultaPublica/listView.seam`, {
      params: {
        cpf: cpf
      },
      timeout: 10000
    });

    // Fazer parsing dos dados
    const processos = parseProcessosFromHTML(response.data);
    
    return processos;
  } catch (error) {
    console.error('Erro ao buscar processos por CPF:', error);
    return [];
  }
}

/**
 * Valida o formato do número do processo
 */
function validarNumeroProcesso(numeroProcesso: string): boolean {
  // Formato: NNNNNNN-DD.AAAA.J.TT.OOOO
  const regex = /^\d{7}-\d{2}\.\d{4}\.\d{1}\.\d{2}\.\d{4}$/;
  return regex.test(numeroProcesso);
}

/**
 * Valida o CPF
 */
function validarCPF(cpf: string): boolean {
  // Remove caracteres especiais
  const cpfLimpo = cpf.replace(/\D/g, '');
  
  // Verifica se tem 11 dígitos
  if (cpfLimpo.length !== 11) {
    return false;
  }

  // Verifica se todos os dígitos são iguais
  if (/^(\d)\1{10}$/.test(cpfLimpo)) {
    return false;
  }

  return true;
}

/**
 * Faz parsing do HTML da página do TJDFT
 * (Simplificado - em produção, usar biblioteca de parsing HTML)
 */
function parseProcessoFromHTML(html: string, numeroProcesso: string): ProcessoTJDFT | null {
  try {
    // Simulação: em produção, usar cheerio ou similar para fazer parsing
    return {
      numeroProcesso: numeroProcesso,
      status: 'Aguardando Sentença',
      ultimoAndamento: 'Despacho do Juiz',
      dataUltimoAndamento: new Date().toLocaleDateString('pt-BR'),
      tribunal: 'TRT 10ª Região (DF/TO)',
      juizado: 'Juizado Especial da Fazenda Pública',
      andamentos: [
        {
          data: new Date().toLocaleDateString('pt-BR'),
          descricao: 'Despacho do Juiz',
          tipo: 'DESPACHO'
        },
        {
          data: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toLocaleDateString('pt-BR'),
          descricao: 'Petição recebida',
          tipo: 'PETIÇÃO'
        }
      ]
    };
  } catch (error) {
    console.error('Erro ao fazer parsing do processo:', error);
    return null;
  }
}

/**
 * Faz parsing de múltiplos processos do HTML
 */
function parseProcessosFromHTML(html: string): ProcessoTJDFT[] {
  try {
    // Simulação: em produção, fazer parsing real
    return [
      {
        numeroProcesso: '0001234-56.2023.5.10.0001',
        status: 'Aguardando Sentença',
        ultimoAndamento: 'Despacho do Juiz',
        dataUltimoAndamento: new Date().toLocaleDateString('pt-BR'),
        tribunal: 'TRT 10ª Região (DF/TO)',
        juizado: 'Juizado Especial da Fazenda Pública',
        andamentos: []
      }
    ];
  } catch (error) {
    console.error('Erro ao fazer parsing dos processos:', error);
    return [];
  }
}

/**
 * Gera resumo humanizado do andamento usando IA
 */
export async function gerarResumoAndamento(processo: ProcessoTJDFT): Promise<string> {
  try {
    // Aqui seria integrado com OpenAI para gerar resumo
    // Por enquanto, retorna um resumo template
    
    const resumoTemplate = `
      Seu processo está em fase de ${processo.status.toLowerCase()}. 
      O último andamento foi "${processo.ultimoAndamento}" em ${processo.dataUltimoAndamento}.
      O processo tramita no ${processo.tribunal}.
      Acompanhe regularmente para não perder prazos importantes.
    `;

    return resumoTemplate.trim();
  } catch (error) {
    console.error('Erro ao gerar resumo:', error);
    return 'Não foi possível gerar resumo do processo.';
  }
}
