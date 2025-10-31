import React, { useState } from 'react';
import '../styles/RespostaSistematizada.css';

interface Resposta {
 id: string;
 cliente: string;
 pergunta: string;
 respostaAutomatica: string;
 respostaPersonalizada?: string;
 tipo: 'andamento' | 'documentos' | 'prazos' | 'honorarios' | 'outro';
 dataCriacao: string;
 status: 'pendente' | 'enviada' | 'respondida';
 canalEnvio?: 'whatsapp' | 'email' | 'sms';
}

const respostasTemplate = {
 andamento: `Prezado(a) [CLIENTE],

Obrigado por entrar em contato conosco.

Sobre o andamento do seu processo n [PROCESSO]:

O processo encontra-se em fase de [FASE]. O ultimo andamento foi registrado em [DATA], quando [EVENTO].

O proximo prazo importante e em [PROXIMO_PRAZO], quando [ACAO].

Continuamos acompanhando seu caso com atencao e o manteremos informado sobre qualquer desenvolvimento importante.

Qualquer duvida, nao hesite em entrar em contato.

Atenciosamente,
Equipe Juridica`,

 documentos: `Prezado(a) [CLIENTE],

Obrigado por sua pergunta.

Os documentos necessarios para seu caso sao:

1. [DOC1]
2. [DOC2]
3. [DOC3]

Por favor, envie-nos esses documentos assim que possivel para que possamos prosseguir com seu processo.

Caso tenha duvidas sobre como obter esses documentos, estamos a disposicao para ajuda-lo.

Atenciosamente,
Equipe Juridica`,

 prazos: `Prezado(a) [CLIENTE],

Obrigado por entrar em contato.

Os prazos importantes do seu processo sao:

- [PRAZO1]: [DESCRICAO1]
- [PRAZO2]: [DESCRICAO2]
- [PRAZO3]: [DESCRICAO3]

Estamos acompanhando todos esses prazos para garantir que nenhum seja perdido.

Atenciosamente,
Equipe Juridica`,

 honorarios: `Prezado(a) [CLIENTE],

Obrigado por sua pergunta sobre os honorarios.

Conforme contrato assinado entre as partes, os honorarios sao:

[DETALHES_HONORARIOS]

O pagamento pode ser realizado em [FORMAS_PAGAMENTO].

Caso tenha duvidas, estamos a disposicao.

Atenciosamente,
Equipe Juridica`,

 outro: `Prezado(a) [CLIENTE],

Obrigado por entrar em contato conosco.

[RESPOSTA_PERSONALIZADA]

Caso tenha outras duvidas, nao hesite em nos contatar.

Atenciosamente,
Equipe Juridica`
};

export function RespostaSistematizada() {
 const [step, setStep] = useState(1);
 const [respostas, setRespostas] = useState<Resposta[]>([
 {
 id: '1',
 cliente: 'Joao Silva',
 pergunta: 'Como esta o andamento do meu processo?',
 respostaAutomatica: 'Seu processo esta em fase de julgamento...',
 tipo: 'andamento',
 dataCriacao: '28/10/2025',
 status: 'pendente'
 },
 {
 id: '2',
 cliente: 'Maria Santos',
 pergunta: 'Quais documentos preciso enviar?',
 respostaAutomatica: 'Os documentos necessarios sao: Contracheque, Ficha Funcional...',
 tipo: 'documentos',
 dataCriacao: '27/10/2025',
 status: 'enviada'
 }
 ]);

 const [formData, setFormData] = useState({
 cliente: '',
 pergunta: '',
 tipo: 'outro' as const,
 canalEnvio: 'whatsapp' as const,
 respostaPersonalizada: ''
 });

 const [respostaGerada, setRespostaGerada] = useState('');
 const [loading, setLoading] = useState(false);
 const [message, setMessage] = useState('');
 const [filtroStatus, setFiltroStatus] = useState('todas');

 const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
 const { name, value } = e.target;
 setFormData(prev => ({
 ...prev,
 [name]: value
 }));
 };

 const handleGerarResposta = async () => {
 setLoading(true);
 setMessage('');

 try {
 await new Promise(resolve => setTimeout(resolve, 1000));

 const template = respostasTemplate[formData.tipo];
 const resposta = template
 .replace('[CLIENTE]', formData.cliente)
 .replace('[PROCESSO]', '#001')
 .replace('[FASE]', 'julgamento')
 .replace('[DATA]', '28/10/2025')
 .replace('[EVENTO]', 'foi proferida sentenca')
 .replace('[PROXIMO_PRAZO]', '15/11/2025')
 .replace('[ACAO]', 'vence prazo para recurso');

 setRespostaGerada(resposta);
 setMessage(' Resposta gerada com sucesso!');
 setStep(2);
 } catch (error) {
 setMessage(' Erro ao gerar resposta. Tente novamente.');
 } finally {
 setLoading(false);
 }
 };

 const handleEnviarResposta = async () => {
 setLoading(true);
 setMessage('');

 try {
 await new Promise(resolve => setTimeout(resolve, 1500));

 const novaResposta: Resposta = {
 id: Math.random().toString(36).substr(2, 9),
 cliente: formData.cliente,
 pergunta: formData.pergunta,
 respostaAutomatica: respostaGerada,
 tipo: formData.tipo,
 dataCriacao: new Date().toLocaleDateString('pt-BR'),
 status: 'enviada',
 canalEnvio: formData.canalEnvio
 };

 setRespostas([novaResposta, ...respostas]);
 setMessage(` Resposta enviada via ${formData.canalEnvio.toUpperCase()}!`);
 setStep(1);
 setFormData({
 cliente: '',
 pergunta: '',
 tipo: 'outro',
 canalEnvio: 'whatsapp',
 respostaPersonalizada: ''
 });
 setRespostaGerada('');
 } catch (error) {
 setMessage(' Erro ao enviar resposta. Tente novamente.');
 } finally {
 setLoading(false);
 }
 };

 const respostasFiltradas = respostas.filter(r => 
 filtroStatus === 'todas' || r.status === filtroStatus
 );

 return (
 <div className=\"resposta-container\">
 <div className=\"resposta-card\">
 <div className=\"resposta-header\">
 <h1>Resposta Sistematizada a Clientes</h1>
 <p>Responda perguntas de clientes com respostas padronizadas e personalizadas</p>
 </div>

 {message && (
 <div className={`message ${message.includes('') ? 'success' : 'error'}`}>
 {message}
 </div>
 )}

 <div className=\"resposta-layout\">
 {/* Painel Esquerdo - Formulario */}
 <div className=\"resposta-form-panel\">
 {step === 1 && (
 <div className=\"form-section\">
 <h2>Nova Resposta</h2>

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
 <label>Pergunta do Cliente *</label>
 <textarea
 name=\"pergunta\"
 value={formData.pergunta}
 onChange={handleInputChange}
 placeholder=\"Qual e a pergunta ou duvida do cliente?\"
 rows={3}
 required
 />
 </div>

 <div className=\"form-group\">
 <label>Tipo de Resposta *</label>
 <select
 name=\"tipo\"
 value={formData.tipo}
 onChange={handleInputChange}
 required
 >
 <option value=\"andamento\">Andamento do Processo</option>
 <option value=\"documentos\">Documentos Necessarios</option>
 <option value=\"prazos\">Prazos Processuais</option>
 <option value=\"honorarios\">Honorarios</option>
 <option value=\"outro\">Outro</option>
 </select>
 </div>

 <div className=\"form-group\">
 <label>Canal de Envio *</label>
 <select
 name=\"canalEnvio\"
 value={formData.canalEnvio}
 onChange={handleInputChange}
 required
 >
 <option value=\"whatsapp\">WhatsApp</option>
 <option value=\"email\">E-mail</option>
 <option value=\"sms\">SMS</option>
 </select>
 </div>

 <button
 onClick={handleGerarResposta}
 disabled={loading || !formData.cliente || !formData.pergunta}
 className=\"btn btn-primary\"
 >
 {loading ? ' Gerando...' : ' Gerar Resposta'}
 </button>
 </div>
 )}

 {step === 2 && (
 <div className=\"form-section\">
 <h2>Revisar Resposta</h2>

 <div className=\"resposta-preview\">
 <div className=\"preview-header\">
 <p><strong>Cliente:</strong> {formData.cliente}</p>
 <p><strong>Tipo:</strong> {formData.tipo}</p>
 </div>

 <div className=\"preview-content\">
 {respostaGerada.split('\
').map((linha, idx) => (
 <p key={idx}>{linha}</p>
 ))}
 </div>
 </div>

 <div className=\"form-group\">
 <label>Personalizar Resposta (opcional)</label>
 <textarea
 name=\"respostaPersonalizada\"
 value={formData.respostaPersonalizada}
 onChange={handleInputChange}
 placeholder=\"Adicione ajustes personalizados...\"
 rows={3}
 />
 </div>

 <div className=\"acoes\">
 <button onClick={() => setStep(1)} className=\"btn btn-secondary\">
 Voltar
 </button>
 <button
 onClick={handleEnviarResposta}
 disabled={loading}
 className=\"btn btn-success\"
 >
 {loading ? ' Enviando...' : ` Enviar via ${formData.canalEnvio.toUpperCase()}`}
 </button>
 </div>
 </div>
 )}
 </div>

 {/* Painel Direito - Historico */}
 <div className=\"resposta-history-panel\">
 <h2>Historico de Respostas</h2>

 <div className=\"filtro\">
 <label>Status:</label>
 <select value={filtroStatus} onChange={(e) => setFiltroStatus(e.target.value)}>
 <option value=\"todas\">Todas</option>
 <option value=\"pendente\">Pendentes</option>
 <option value=\"enviada\">Enviadas</option>
 <option value=\"respondida\">Respondidas</option>
 </select>
 </div>

 <div className=\"respostas-list\">
 {respostasFiltradas.length > 0 ? (
 respostasFiltradas.map(resp => (
 <div key={resp.id} className={`resposta-item ${resp.status}`}>
 <div className=\"item-header\">
 <h4>{resp.cliente}</h4>
 <span className={`status-badge ${resp.status}`}>
 {resp.status === 'pendente' && ''}
 {resp.status === 'enviada' && ''}
 {resp.status === 'respondida' && ''}
 </span>
 </div>
 <p className=\"pergunta\">{resp.pergunta}</p>
 <div className=\"item-footer\">
 <small>{resp.dataCriacao}</small>
 {resp.canalEnvio && <small>via {resp.canalEnvio.toUpperCase()}</small>}
 </div>
 </div>
 ))
 ) : (
 <p className=\"sem-dados\">Nenhuma resposta encontrada</p>
 )}
 </div>
 </div>
 </div>
 </div>
 </div>
 );
}

