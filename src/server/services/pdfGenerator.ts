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

  // Título
  doc.fontSize(14).font('Helvetica-Bold').text('PROCURAÇÃO', { align: 'center' });
  doc.moveDown(0.5);

  // Corpo do documento
  doc.fontSize(11).font('Helvetica').text(
    `Saibam quantos este público instrumento de procuração virem, que no ano de ${new Date().getFullYear()}, ` +
    `aos ${new Date().getDate()} dias do mês de ${getMonthName(new Date().getMonth())} de ${new Date().getFullYear()}, ` +
    `nesta cidade, compareceu como outorgante ${cliente.nome}, pessoa física, portador(a) da cédula de identidade ` +
    `RG nº ${cliente.rg}, inscrito(a) no Cadastro de Pessoa Física sob o nº ${cliente.cpf}, residente e domiciliado(a) ` +
    `${cliente.endereco}, nº ${cliente.numero}${cliente.complemento ? ', ' + cliente.complemento : ''}, ` +
    `${cliente.bairro}, ${cliente.cidade}, ${cliente.estado}, CEP ${cliente.cep}.`,
    { align: 'justify' }
  );

  doc.moveDown(1);
  doc.text(
    'Pelo presente instrumento, outorga poderes especiais aos advogados inscritos na Ordem dos Advogados do Brasil, ' +
    'para que, em seu nome e representação, pratiquem todos os atos necessários à defesa de seus direitos perante os ' +
    'Tribunais do Trabalho, bem como para receber citações, intimações, notificações e demais comunicações processuais.',
    { align: 'justify' }
  );

  doc.moveDown(1);
  doc.text(
    'O outorgante autoriza, ainda, os procuradores a transigir, desistir, receber valores, assinar documentos e ' +
    'praticar todos os demais atos que se fizerem necessários à defesa de seus interesses.',
    { align: 'justify' }
  );

  doc.moveDown(2);
  doc.text(`${cliente.cidade}, ${new Date().getDate()} de ${getMonthName(new Date().getMonth())} de ${new Date().getFullYear()}.`);

  doc.moveDown(2);
  doc.text('_' . repeat(50));
  doc.text(cliente.nome);

  return doc;
}

export function gerarContrato(cliente: ClienteData): Readable {
  const doc = new PDFDocument();
  const dataAtual = new Date().toLocaleDateString('pt-BR');

  // Título
  doc.fontSize(14).font('Helvetica-Bold').text('CONTRATO DE PRESTAÇÃO DE SERVIÇOS JURÍDICOS', { align: 'center' });
  doc.moveDown(1);

  // Partes
  doc.fontSize(11).font('Helvetica-Bold').text('PARTES:');
  doc.fontSize(11).font('Helvetica').text(
    `CONTRATANTE: ${cliente.nome}, pessoa física, portador(a) da cédula de identidade RG nº ${cliente.rg}, ` +
    `inscrito(a) no Cadastro de Pessoa Física sob o nº ${cliente.cpf}.`,
    { align: 'justify' }
  );

  doc.moveDown(0.5);
  doc.text(
    'CONTRATADA: Escritório de Advocacia, pessoa jurídica, inscrita no CNPJ nº [CNPJ], com sede em [Endereço].',
    { align: 'justify' }
  );

  doc.moveDown(1);
  doc.fontSize(11).font('Helvetica-Bold').text('CLÁUSULA PRIMEIRA - DO OBJETO:');
  doc.fontSize(11).font('Helvetica').text(
    'A CONTRATADA se obriga a prestar serviços de consultoria e representação jurídica ao CONTRATANTE, ' +
    'em ações trabalhistas e demais demandas judiciais que se fizerem necessárias.',
    { align: 'justify' }
  );

  doc.moveDown(1);
  doc.fontSize(11).font('Helvetica-Bold').text('CLÁUSULA SEGUNDA - DOS HONORÁRIOS:');
  doc.fontSize(11).font('Helvetica').text(
    'Os honorários serão cobrados conforme acordado entre as partes, sendo que a CONTRATADA receberá ' +
    'percentual sobre o valor recuperado ao final do processo.',
    { align: 'justify' }
  );

  doc.moveDown(1);
  doc.fontSize(11).font('Helvetica-Bold').text('CLÁUSULA TERCEIRA - DA VIGÊNCIA:');
  doc.fontSize(11).font('Helvetica').text(
    'O presente contrato vigorará a partir da data de sua assinatura até o término do processo ou ' +
    'rescisão por qualquer das partes.',
    { align: 'justify' }
  );

  doc.moveDown(2);
  doc.text(`${cliente.cidade}, ${dataAtual}.`);

  doc.moveDown(2);
  doc.text('_' . repeat(50));
  doc.text(cliente.nome);
  doc.text('CONTRATANTE');

  return doc;
}

export function gerarDeclaracaoHipossuficiencia(cliente: ClienteData): Readable {
  const doc = new PDFDocument();
  const dataAtual = new Date().toLocaleDateString('pt-BR');

  // Título
  doc.fontSize(14).font('Helvetica-Bold').text('DECLARAÇÃO DE HIPOSSUFICIÊNCIA', { align: 'center' });
  doc.moveDown(1);

  // Corpo
  doc.fontSize(11).font('Helvetica').text(
    `Eu, ${cliente.nome}, pessoa física, portador(a) da cédula de identidade RG nº ${cliente.rg}, ` +
    `inscrito(a) no Cadastro de Pessoa Física sob o nº ${cliente.cpf}, residente e domiciliado(a) ` +
    `${cliente.endereco}, nº ${cliente.numero}${cliente.complemento ? ', ' + cliente.complemento : ''}, ` +
    `${cliente.bairro}, ${cliente.cidade}, ${cliente.estado}, CEP ${cliente.cep}, por este instrumento particular, ` +
    `DECLARO, sob as penas da lei, que sou pessoa de insuficientes recursos financeiros para arcar com as custas ` +
    `processuais e despesas decorrentes de ação judicial, razão pela qual solicito o benefício da assistência judiciária gratuita.`,
    { align: 'justify' }
  );

  doc.moveDown(1);
  doc.text(
    'Declaro, ainda, que não possuo bens ou renda suficientes para custear as despesas do processo sem ' +
    'comprometer meu sustento e de minha família.',
    { align: 'justify' }
  );

  doc.moveDown(2);
  doc.text(`${cliente.cidade}, ${dataAtual}.`);

  doc.moveDown(2);
  doc.text('_' . repeat(50));
  doc.text(cliente.nome);

  return doc;
}

function getMonthName(month: number): string {
  const months = [
    'janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho',
    'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'
  ];
  return months[month];
}
