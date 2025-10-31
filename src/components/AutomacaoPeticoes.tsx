import React, { useState } from 'react';
import '../styles/AutomacaoPeticoes.css';

interface Peticao {
 id: string;
 tipo: string;
 tese: string;
 cliente: string;
 processo: string;
 dataCriacao: string;
 status: 'rascunho' | 'pronta' | 'enviada';
 conteudo: string;
}

export function AutomacaoPeticoes() {
 const [step, setStep] = useState(1);
 const [formData, setFormData] = useState({
 tipo: 'replica',
 tese: 'licenca-premio',
 cliente: '',
 processo: '',
 modeloReferencia: '',
 informacoesAdicionais: ''
 });

 const [peticaoGerada, setPeticaoGerada] = useState<Peticao | null>(null);
 const [loading, setLoading] = useState(false);
 const [message, setMessage] = useState('');

 const tipos = [
 { value: 'replica', label: 'Replica' },
 { value: 'recurso', label: 'Recurso' },
 { value: 'contrarrazao', label: 'Contra-razao' },
 { value: 'embargo', label: 'Embargo' },
 { value: 'peticial', label: 'Peticao Inicial' }
 ];

 const teses = [
 { value: 'licenca-premio', label: 'Licenca-Premio' },
 { value: 'abono-permanencia', label: 'Abono Permanencia' },
 { value: 'diferencas-salariais', label: 'Diferencas Salariais' },
 { value: 'gratificacao', label: 'Gratificacao' },
 { value: 'indenizacao', label: 'Indenizacao' }
 ];

 const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
 const { name, value } = e.target;
 setFormData(prev => ({
 ...prev,
 [name]: value
 }));
 };

 const handleGerarPeticao = async () => {
 setLoading(true);
 setMessage('');

 try {
 // Simular geracao de peticao
 await new Promise(resolve => setTimeout(resolve, 2000));

 const peticao: Peticao = {
 id: Math.random().toString(36).substr(2, 9),
 tipo: formData.tipo,
 tese: formData.tese,
 cliente: formData.cliente,
 processo: formData.processo,
 dataCriacao: new Date().toLocaleDateString('pt-BR'),
 status: 'pronta',
 conteudo: `EXCELENTSSIMO SENHOR DOUTOR JUIZ DA ${formData.tese.toUpperCase()}

Vem, respeitosamente, perante Vossa Excelencia, o(a) cliente ${formData.cliente}, por seu advogado infra-assinado, com fundamento no artigo 5 da Constituicao Federal, apresentar ${formData.tipo.toUpperCase()} ao processo n ${formData.processo}, pelos motivos de fato e de direito a seguir expostos:

I - DOS FATOS

${formData.informacoesAdicionais || 'Conforme documentacao em anexo, o cliente faz jus aos direitos pleiteados.'}

II - DO DIREITO

A legislacao trabalhista e a jurisprudencia consolidada reconhecem o direito do cliente ao recebimento da verba em questao.

III - DO PEDIDO

Pelo exposto, requer-se:

a) A procedencia do pedido para condenar a parte adversa ao pagamento da verba devida;
b) A condenacao em custas processuais e honorarios advocaticios.

Nestes termos, pede deferimento.

Respeitosamente submetido,

[Assinado digitalmente]
Advogado(a) Responsavel`
 };

 setPeticaoGerada(peticao);
 setMessage(' Peticao gerada com sucesso!');
 setStep(2);
 } catch (error) {
 setMessage(' Erro ao gerar peticao. Tente novamente.');
 } finally {
 setLoading(false);
 }
 };

 const handleBaixarPeticao = () => {
 if (!peticaoGerada) return;

 const element = document.createElement('a');
 const file = new Blob([peticaoGerada.conteudo], { type: 'text/plain' });
 element.href = URL.createObjectURL(file);
 element.download = `${peticaoGerada.tipo}_${peticaoGerada.processo}.txt`;
 document.body.appendChild(element);
 element.click();
 document.body.removeChild(element);
 };

 return (
 <div className=\"automacao-container\">
 <div className=\"automacao-card\">
 <div className=\"automacao-header\">
 <h1>Automacao de Peticoes</h1>
 <p>Gere peticoes automaticamente com base em modelos e analise de IA</p>
 </div>

 {message && (
 <div className={`message ${message.includes('') ? 'success' : 'error'}`}>
 {message}
 </div>
 )}

 {/* Step 1: Configuracao */}
 {step === 1 && (
 <div className=\"form-step\">
 <h2>Configuracao da Peticao</h2>

 <div className=\"form-group\">
 <label>Tipo de Peticao *</label>
 <select
 name=\"tipo\"
 value={formData.tipo}
 onChange={handleInputChange}
 required
 >
 {tipos.map(t => (
 <option key={t.value} value={t.value}>{t.label}</option>
 ))}
 </select>
 </div>

 <div className=\"form-group\">
 <label>Tese Juridica *</label>
 <select
 name=\"tese\"
 value={formData.tese}
 onChange={handleInputChange}
 required
 >
 {teses.map(t => (
 <option key={t.value} value={t.value}>{t.label}</option>
 ))}
 </select>
 </div>

 <div className=\"form-row\">
 <div className=\"form-group\">
 <label>Cliente *</label>
 <input
 type=\"text\"
 name=\"cliente\"
 value={formData.cliente}
 onChange={handleInputChange}
 placeholder=\"Nome do cliente\"
 required
 />
 </div>

 <div className=\"form-group\">
 <label>Numero do Processo *</label>
 <input
 type=\"text\"
 name=\"processo\"
 value={formData.processo}
 onChange={handleInputChange}
 placeholder=\"0001234-56.2023.5.10.0001\"
 required
 />
 </div>
 </div>

 <div className=\"form-group\">
 <label>Modelo de Referencia</label>
 <select
 name=\"modeloReferencia\"
 value={formData.modeloReferencia}
 onChange={handleInputChange}
 >
 <option value=\"\">Selecione um modelo...</option>
 <option value=\"modelo1\">Modelo Padrao - Licenca-Premio</option>
 <option value=\"modelo2\">Modelo Padrao - Abono Permanencia</option>
 <option value=\"modelo3\">Modelo Padrao - Diferencas Salariais</option>
 </select>
 </div>

 <div className=\"form-group\">
 <label>Informacoes Adicionais</label>
 <textarea
 name=\"informacoesAdicionais\"
 value={formData.informacoesAdicionais}
 onChange={handleInputChange}
 placeholder=\"Adicione informacoes especificas do caso...\"
 rows={4}
 />
 </div>

 <button
 onClick={handleGerarPeticao}
 disabled={loading || !formData.cliente || !formData.processo}
 className=\"btn btn-primary\"
 >
 {loading ? ' Gerando...' : ' Gerar Peticao'}
 </button>
 </div>
 )}

 {/* Step 2: Revisao e Download */}
 {step === 2 && peticaoGerada && (
 <div className=\"form-step\">
 <h2>Peticao Gerada</h2>

 <div className=\"peticao-info\">
 <div className=\"info-row\">
 <span className=\"label\">Tipo:</span>
 <span className=\"value\">{peticaoGerada.tipo.toUpperCase()}</span>
 </div>
 <div className=\"info-row\">
 <span className=\"label\">Tese:</span>
 <span className=\"value\">{peticaoGerada.tese}</span>
 </div>
 <div className=\"info-row\">
 <span className=\"label\">Cliente:</span>
 <span className=\"value\">{peticaoGerada.cliente}</span>
 </div>
 <div className=\"info-row\">
 <span className=\"label\">Processo:</span>
 <span className=\"value\">{peticaoGerada.processo}</span>
 </div>
 <div className=\"info-row\">
 <span className=\"label\">Status:</span>
 <span className=\"value status-pronta\">Pronta para Envio</span>
 </div>
 </div>

 <div className=\"peticao-preview\">
 <h3>Preview do Conteudo</h3>
 <div className=\"preview-box\">
 {peticaoGerada.conteudo.split('\
').map((linha, idx) => (
 <p key={idx}>{linha}</p>
 ))}
 </div>
 </div>

 <div className=\"acoes\">
 <button onClick={() => setStep(1)} className=\"btn btn-secondary\">
 Voltar
 </button>
 <button onClick={handleBaixarPeticao} className=\"btn btn-success\">
 Baixar Peticao
 </button>
 <button className=\"btn btn-primary\">
 Enviar para Protocolo
 </button>
 </div>
 </div>
 )}
 </div>
 </div>
 );
}

