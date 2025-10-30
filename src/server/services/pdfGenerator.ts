import PDFDocument from 'pdfkit';
import { Readable } from 'stream';

interface ClienteData {
  nome: string;
  cpf: string;
  rg: string;
  endereco: string;
  numero: string;
  complemento: string;
  bairro: string;
  cidade: string;
  estado: string;
  cep: string;
  profissao?: string;
  nacionalidade?: string;
}

export function gerarProcuracao(cliente: ClienteData): Readable {
  const doc = new PDFDocument();
  const dataAtual = new Date().toLocaleDateString('pt-BR');

  doc.fontSize(14).font('Helvetica-Bold').text('PROCURACAO', { align: 'center' });
  doc.moveDown(0.5);

  doc.fontSize(11).font('Helvetica').text(
    `Saibam quantos este publico instrumento de procuracao virem, que no ano de ${new Date().getFullYear()}, ` +
    `aos ${new Date().getDate()} dias do mes de ${getMonthName(new Date().getMonth())} de ${new Date().getFullYear()}, ` +
    `nesta cidade, compareceu como outorgante ${cliente.nome}, pessoa fisica, portador(a) da cedula de identidade ` +
    `RG no ${cliente.rg}, inscrito(a) no Cadastro de Pessoa Fisica sob o no ${cliente.cpf}, residente e domiciliado(a) ` +
    `${cliente.endereco}, no ${cliente.numero}${cliente.complemento ? ', ' + cliente.complemento : ''}, ` +
    `${cliente.bairro}, ${cliente.cidade}, ${cliente.estado}, CEP ${cliente.cep}.`,
    { align: 'justify' }
  );

  doc.moveDown(1);
  doc.text(
    'Pelo presente instrumento, outorga poderes especiais aos advogados inscritos na Ordem dos Advogados do Brasil, ' +
    'para que, em seu nome e representacao, pratiquem todos os atos necessarios a defesa de seus direitos perante os ' +
    'Tribunais do Trabalho, bem como para receber citacoes, intimacoes, notificacoes e demais comunicacoes processuais.',
    { align: 'justify' }
  );

  doc.moveDown(1);
  doc.text(
    'O outorgante autoriza, ainda, os procuradores a transigir, desistir, receber valores, assinar documentos e ' +
    'praticar todos os demais atos que se fizerem necessarios a defesa de seus interesses.',
    { align: 'justify' }
  );

  doc.moveDown(2);
  doc.text(`${cliente.cidade}, ${new Date().getDate()} de ${getMonthName(new Date().getMonth())} de ${new Date().getFullYear()}.`);

  doc.moveDown(2);
  doc.text('_'.repeat(50));
  doc.text(cliente.nome);

  return doc;
}

export function gerarContrato(cliente: ClienteData): Readable {
  const doc = new PDFDocument();
  const dataAtual = new Date().toLocaleDateString('pt-BR');

  doc.fontSize(14).font('Helvetica-Bold').text('CONTRATO DE PRESTACAO DE SERVICOS JURIDICOS', { align: 'center' });
  doc.moveDown(1);

  doc.fontSize(11).font('Helvetica-Bold').text('PARTES:');
  doc.fontSize(11).font('Helvetica').text(
    `CONTRATANTE: ${cliente.nome}, pessoa fisica, portador(a) da cedula de identidade RG no ${cliente.rg}, ` +
    `inscrito(a) no Cadastro de Pessoa Fisica sob o no ${cliente.cpf}.`,
    { align: 'justify' }
  );

  doc.moveDown(0.5);
  doc.text(
    'CONTRATADA: Escritorio de Advocacia, pessoa juridica, inscrita no CNPJ no [CNPJ], com sede em [Endereco].',
    { align: 'justify' }
  );

  doc.moveDown(1);
  doc.fontSize(11).font('Helvetica-Bold').text('CLAUSULA PRIMEIRA - DO OBJETO:');
  doc.fontSize(11).font('Helvetica').text(
    'A CONTRATADA se obriga a prestar servicos de consultoria e representacao juridica ao CONTRATANTE, ' +
    'em acoes trabalhistas e demais demandas judiciais que se fizerem necessarias.',
    { align: 'justify' }
  );

  doc.moveDown(1);
  doc.fontSize(11).font('Helvetica-Bold').text('CLAUSULA SEGUNDA - DOS HONORARIOS:');
  doc.fontSize(11).font('Helvetica').text(
    'Os honorarios serao cobrados conforme acordado entre as partes, sendo que a CONTRATADA recebera ' +
    'percentual sobre o valor recuperado ao final do processo.',
    { align: 'justify' }
  );

  doc.moveDown(1);
  doc.fontSize(11).font('Helvetica-Bold').text('CLAUSULA TERCEIRA - DA VIGENCIA:');
  doc.fontSize(11).font('Helvetica').text(
    'O presente contrato vigorara a partir da data de sua assinatura ate o termino do processo ou ' +
    'rescisao por qualquer das partes.',
    { align: 'justify' }
  );

  doc.moveDown(2);
  doc.text(`${cliente.cidade}, ${dataAtual}.`);

  doc.moveDown(2);
  doc.text('_'.repeat(50));
  doc.text(cliente.nome);
  doc.text('CONTRATANTE');

  return doc;
}

export function gerarDeclaracaoHipossuficiencia(cliente: ClienteData): Readable {
  const doc = new PDFDocument();
  const dataAtual = new Date().toLocaleDateString('pt-BR');

  doc.fontSize(14).font('Helvetica-Bold').text('DECLARACAO DE HIPOSSUFICIENCIA', { align: 'center' });
  doc.moveDown(1);

  doc.fontSize(11).font('Helvetica').text(
    `Eu, ${cliente.nome}, pessoa fisica, portador(a) da cedula de identidade RG no ${cliente.rg}, ` +
    `inscrito(a) no Cadastro de Pessoa Fisica sob o no ${cliente.cpf}, residente e domiciliado(a) ` +
    `${cliente.endereco}, no ${cliente.numero}${cliente.complemento ? ', ' + cliente.complemento : ''}, ` +
    `${cliente.bairro}, ${cliente.cidade}, ${cliente.estado}, CEP ${cliente.cep}, por este instrumento particular, ` +
    `DECLARO, sob as penas da lei, que sou pessoa de insuficientes recursos financeiros para arcar com as custas ` +
    `processuais e despesas decorrentes de acao judicial, razao pela qual solicito o beneficio da assistencia judiciaria gratuita.`,
    { align: 'justify' }
  );

  doc.moveDown(1);
  doc.text(
    'Declaro, ainda, que nao possuo bens ou renda suficientes para custear as despesas do processo sem ' +
    'comprometer meu sustento e de minha familia.',
    { align: 'justify' }
  );

  doc.moveDown(2);
  doc.text(`${cliente.cidade}, ${dataAtual}.`);

  doc.moveDown(2);
  doc.text('_'.repeat(50));
  doc.text(cliente.nome);

  return doc;
}

function getMonthName(month: number): string {
  const months = [
    'janeiro', 'fevereiro', 'marco', 'abril', 'maio', 'junho',
    'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'
  ];
  return months[month];
}
