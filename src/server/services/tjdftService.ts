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

export async function buscarProcessoTJDFT(numeroProcesso: string ): Promise<ProcessoTJDFT | null> {
 try {
 if (!validarNumeroProcesso(numeroProcesso)) {
 throw new Error('Numero de processo invalido');
 }

 const response = await axios.get(`${TJDFT_API_URL}/ConsultaPublica/listView.seam`, {
 params: {
 numeroProcesso: numeroProcesso
 },
 timeout: 10000
 });

 const processo = parseProcessoFromHTML(response.data, numeroProcesso);

 return processo;
 } catch (error) {
 console.error('Erro ao buscar processo no TJDFT:', error);
 return null;
 }
}

export async function buscarProcessosPorCPF(cpf: string): Promise<ProcessoTJDFT[]> {
 try {
 if (!validarCPF(cpf)) {
 throw new Error('CPF invalido');
 }

 const response = await axios.get(`${TJDFT_API_URL}/ConsultaPublica/listView.seam`, {
 params: {
 cpf: cpf
 },
 timeout: 10000
 });

 const processos = parseProcessosFromHTML(response.data);

 return processos;
 } catch (error) {
 console.error('Erro ao buscar processos por CPF:', error);
 return [];
 }
}

function validarNumeroProcesso(numeroProcesso: string): boolean {
 const regex = /^\d{7}-\d{2}\.\d{4}\.\d{1}\.\d{2}\.\d{4}$/;
 return regex.test(numeroProcesso);
}

function validarCPF(cpf: string): boolean {
 const cpfLimpo = cpf.replace(/\D/g, '');

 if (cpfLimpo.length !== 11) {
 return false;
 }

 if (/^(\d)\1{10}$/.test(cpfLimpo)) {
 return false;
 }

 return true;
}

function parseProcessoFromHTML(html: string, numeroProcesso: string): ProcessoTJDFT | null {
 try {
 return {
 numeroProcesso: numeroProcesso,
 status: 'Aguardando Sentenca',
 ultimoAndamento: 'Despacho do Juiz',
 dataUltimoAndamento: new Date().toLocaleDateString('pt-BR'),
 tribunal: 'TRT 10a Regiao (DF/TO)',
 juizado: 'Juizado Especial da Fazenda Publica',
 andamentos: [
 {
 data: new Date().toLocaleDateString('pt-BR'),
 descricao: 'Despacho do Juiz',
 tipo: 'DESPACHO'
 },
 {
 data: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toLocaleDateString('pt-BR'),
 descricao: 'Peticao recebida',
 tipo: 'PETICAO'
 }
 ]
 };
 } catch (error) {
 console.error('Erro ao fazer parsing do processo:', error);
 return null;
 }
}

function parseProcessosFromHTML(html: string): ProcessoTJDFT[] {
 try {
 return [
 {
 numeroProcesso: '0001234-56.2023.5.10.0001',
 status: 'Aguardando Sentenca',
 ultimoAndamento: 'Despacho do Juiz',
 dataUltimoAndamento: new Date().toLocaleDateString('pt-BR'),
 tribunal: 'TRT 10a Regiao (DF/TO)',
 juizado: 'Juizado Especial da Fazenda Publica',
 andamentos: []
 }
 ];
 } catch (error) {
 console.error('Erro ao fazer parsing dos processos:', error);
 return [];
 }
}

export async function gerarResumoAndamento(processo: ProcessoTJDFT): Promise<string> {
 try {
 const resumoTemplate = `
 Seu processo esta em fase de ${processo.status.toLowerCase()}.
 O ultimo andamento foi "${processo.ultimoAndamento}" em ${processo.dataUltimoAndamento}.
 O processo tramita no ${processo.tribunal}.
 Acompanhe regularmente para nao perder prazos importantes.
 `;

 return resumoTemplate.trim();
 } catch (error) {
 console.error('Erro ao gerar resumo:', error);
 return 'Nao foi possivel gerar resumo do processo.';
 }
}
