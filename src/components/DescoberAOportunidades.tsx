import React, { useState } from 'react';
import '../styles/DescoberAOportunidades.css';

interface Oportunidade {
 id: string;
 cliente: string;
 cpf: string;
 tese: string;
 confianca: number;
 motivo: string;
 documentosNecessarios: string[];
 dataIdentificacao: string;
 status: 'nova' | 'analisada' | 'ajuizada';
}

interface ClienteAnalise {
 id: string;
 nome: string;
 cpf: string;
 dataAdmissao: string;
 dataAposentadoria: string;
 cargo: string;
 oportunidades: Oportunidade[];
}

export function DescoberAOportunidades() {
 const [step, setStep] = useState(1);
 const [loading, setLoading] = useState(false);
 const [message, setMessage] = useState('');
 const [clienteSelecionado, setClienteSelecionado] = useState<ClienteAnalise | null>(null);
 const [oportunidades, setOportunidades] = useState<Oportunidade[]>([]);
 const [filtroStatus, setFiltroStatus] = useState('todas');
 const [filtroConfianca, setFiltroConfianca] = useState(0);

 const clientes = [
 {
 id: '1',
 nome: 'Joao Silva',
 cpf: '123.456.789-00',
 dataAdmissao: '15/03/2010',
 dataAposentadoria: '15/03/2025',
 cargo: 'Analista de Sistemas',
 oportunidades: []
 },
 {
 id: '2',
 nome: 'Maria Santos',
 cpf: '987.654.321-00',
 dataAdmissao: '20/05/2008',
 dataAposentadoria: '20/05/2023',
 cargo: 'Advogada',
 oportunidades: []
 },
 {
 id: '3',
 nome: 'Pedro Costa',
 cpf: '456.789.123-00',
 dataAdmissao: '10/01/2012',
 dataAposentadoria: '10/01/2027',
 cargo: 'Auditor',
 oportunidades: []
 }
 ];

 const handleAnalisarCliente = async (cliente: ClienteAnalise) => {
 setLoading(true);
 setMessage('');

 try {
 // Simular analise
 await new Promise(resolve => setTimeout(resolve, 2000));

 const oportunidadesIdentificadas: Oportunidade[] = [
 {
 id: '1',
 cliente: cliente.nome,
 cpf: cliente.cpf,
 tese: 'Licenca-Premio',
 confianca: 95,
 motivo: 'Cliente tem 15 anos de servico e nao usufruiu licenca-premio',
 documentosNecessarios: ['Contracheque', 'Ficha Funcional', 'Certidao de Tempo de Servico'],
 dataIdentificacao: new Date().toLocaleDateString('pt-BR'),
 status: 'nova'
 },
 {
 id: '2',
 cliente: cliente.nome,
 cpf: cliente.cpf,
 tese: 'Abono Permanencia',
 confianca: 88,
 motivo: 'Cliente se enquadra nos criterios de aposentadoria por tempo de contribuicao',
 documentosNecessarios: ['Contracheque', 'Certidao de Aposentadoria', 'Comprovante de Contribuicao'],
 dataIdentificacao: new Date().toLocaleDateString('pt-BR'),
 status: 'nova'
 },
 {
 id: '3',
 cliente: cliente.nome,
 cpf: cliente.cpf,
 tese: 'Diferencas Salariais',
 confianca: 72,
 motivo: 'Possivel diferenca entre salario recebido e salario devido',
 documentosNecessarios: ['Contracheque', 'Folha de Pagamento', 'Decreto de Reajuste'],
 dataIdentificacao: new Date().toLocaleDateString('pt-BR'),
 status: 'nova'
 }
 ];

 setClienteSelecionado(cliente);
 setOportunidades(oportunidadesIdentificadas);
 setMessage(' Analise concluida! Oportunidades identificadas.');
 setStep(2);
 } catch (error) {
 setMessage(' Erro ao analisar cliente. Tente novamente.');
 } finally {
 setLoading(false);
 }
 };

 const handleAnalisarTodos = async () => {
 setLoading(true);
 setMessage('');

 try {
 // Simular analise em massa
 await new Promise(resolve => setTimeout(resolve, 3000));

 let todasOportunidades: Oportunidade[] = [];
 clientes.forEach((cliente, idx) => {
 const optsCliente: Oportunidade[] = [
 {
 id: `${idx}-1`,
 cliente: cliente.nome,
 cpf: cliente.cpf,
 tese: 'Licenca-Premio',
 confianca: 85 + Math.random() * 15,
 motivo: 'Elegivel para licenca-premio',
 documentosNecessarios: ['Contracheque', 'Ficha Funcional'],
 dataIdentificacao: new Date().toLocaleDateString('pt-BR'),
 status: 'nova'
 }
 ];
 todasOportunidades = [...todasOportunidades, ...optsCliente];
 });

 setOportunidades(todasOportunidades);
 setMessage(` Analise em massa concluida! ${todasOportunidades.length} oportunidades identificadas.`);
 setStep(2);
 } catch (error) {
 setMessage(' Erro ao analisar clientes. Tente novamente.');
 } finally {
 setLoading(false);
 }
 };

 const oportunidadesFiltradas = oportunidades.filter(opp => {
 const statusCombina = filtroStatus === 'todas' || opp.status === filtroStatus;
 const confiancaCombina = opp.confianca >= filtroConfianca;
 return statusCombina && confiancaCombina;
 });

 const handleMarcarAjuizada = (id: string) => {
 setOportunidades(opp => 
 opp.map(o => o.id === id ? { ...o, status: 'ajuizada' as const } : o)
 );
 };

 return (
 <div className=\"descoberta-container\">
 <div className=\"descoberta-card\">
 <div className=\"descoberta-header\">
 <h1>Descoberta de Oportunidades</h1>
 <p>Identifique automaticamente novas teses aplicaveis aos seus clientes</p>
 </div>

 {message && (
 <div className={`message ${message.includes('') ? 'success' : 'error'}`}>
 {message}
 </div>
 )}

 {/* Step 1: Selecao de Cliente */}
 {step === 1 && (
 <div className=\"form-step\">
 <h2>Selecione um Cliente para Analise</h2>

 <div className=\"clientes-grid\">
 {clientes.map(cliente => (
 <div key={cliente.id} className=\"cliente-card\">
 <div className=\"cliente-info\">
 <h3>{cliente.nome}</h3>
 <p><strong>CPF:</strong> {cliente.cpf}</p>
 <p><strong>Cargo:</strong> {cliente.cargo}</p>
 <p><strong>Admissao:</strong> {cliente.dataAdmissao}</p>
 <p><strong>Aposentadoria:</strong> {cliente.dataAposentadoria}</p>
 </div>
 <button
 onClick={() => handleAnalisarCliente(cliente)}
 disabled={loading}
 className=\"btn btn-primary\"
 >
 {loading ? ' Analisando...' : ' Analisar'}
 </button>
 </div>
 ))}
 </div>

 <div className=\"analise-massa\">
 <h3>Ou Analisar Todos os Clientes</h3>
 <button
 onClick={handleAnalisarTodos}
 disabled={loading}
 className=\"btn btn-secondary\"
 >
 {loading ? ' Analisando...' : ' Analisar Todos'}
 </button>
 </div>
 </div>
 )}

 {/* Step 2: Resultados */}
 {step === 2 && (
 <div className=\"form-step\">
 <h2>Oportunidades Identificadas</h2>

 {clienteSelecionado && (
 <div className=\"cliente-selecionado\">
 <h3>{clienteSelecionado.nome}</h3>
 <p>CPF: {clienteSelecionado.cpf} | Cargo: {clienteSelecionado.cargo}</p>
 </div>
 )}

 <div className=\"filtros\">
 <div className=\"filtro-grupo\">
 <label>Status:</label>
 <select value={filtroStatus} onChange={(e) => setFiltroStatus(e.target.value)}>
 <option value=\"todas\">Todas</option>
 <option value=\"nova\">Nova</option>
 <option value=\"analisada\">Analisada</option>
 <option value=\"ajuizada\">Ajuizada</option>
 </select>
 </div>

 <div className=\"filtro-grupo\">
 <label>Confianca Minima: {filtroConfianca}%</label>
 <input
 type=\"range\"
 min=\"0\"
 max=\"100\"
 value={filtroConfianca}
 onChange={(e) => setFiltroConfianca(Number(e.target.value))}
 />
 </div>
 </div>

 <div className=\"oportunidades-list\">
 {oportunidadesFiltradas.length > 0 ? (
 oportunidadesFiltradas.map(opp => (
 <div key={opp.id} className=\"oportunidade-card\">
 <div className=\"opp-header\">
 <h3>{opp.tese}</h3>
 <div className=\"opp-badges\">
 <span className=\"confianca-badge\" style={{
 background: opp.confianca > 90 ? '#d1e7dd' : opp.confianca > 75 ? '#cfe2ff' : '#fff3cd',
 color: opp.confianca > 90 ? '#0f5132' : opp.confianca > 75 ? '#084298' : '#856404'
 }}>
 {opp.confianca.toFixed(0)}% confianca
 </span>
 <span className={`status-badge ${opp.status}`}>
 {opp.status === 'nova' && ' Nova'}
 {opp.status === 'analisada' && ' Analisada'}
 {opp.status === 'ajuizada' && ' Ajuizada'}
 </span>
 </div>
 </div>

 <div className=\"opp-content\">
 <p className=\"motivo\"><strong>Motivo:</strong> {opp.motivo}</p>

 <div className=\"documentos\">
 <strong>Documentos Necessarios:</strong>
 <ul>
 {opp.documentosNecessarios.map((doc, idx) => (
 <li key={idx}>{doc}</li>
 ))}
 </ul>
 </div>

 <p className=\"data-identificacao\">
 <small>Identificada em: {opp.dataIdentificacao}</small>
 </p>
 </div>

 <div className=\"opp-acoes\">
 <button className=\"btn btn-small btn-primary\">
 Ajuizar Acao
 </button>
 {opp.status !== 'ajuizada' && (
 <button
 onClick={() => handleMarcarAjuizada(opp.id)}
 className=\"btn btn-small btn-secondary\"
 >
 Marcar como Ajuizada
 </button>
 )}
 </div>
 </div>
 ))
 ) : (
 <p className=\"sem-dados\">Nenhuma oportunidade encontrada com os filtros selecionados</p>
 )}
 </div>

 <div className=\"resumo-stats\">
 <div className=\"stat\">
 <span className=\"label\">Total de Oportunidades:</span>
 <span className=\"value\">{oportunidades.length}</span>
 </div>
 <div className=\"stat\">
 <span className=\"label\">Novas:</span>
 <span className=\"value\">{oportunidades.filter(o => o.status === 'nova').length}</span>
 </div>
 <div className=\"stat\">
 <span className=\"label\">Ajuizadas:</span>
 <span className=\"value\">{oportunidades.filter(o => o.status === 'ajuizada').length}</span>
 </div>
 <div className=\"stat\">
 <span className=\"label\">Valor Potencial:</span>
 <span className=\"value\">R$ {(oportunidades.length * 25000).toLocaleString('pt-BR')}</span>
 </div>
 </div>

 <button onClick={() => setStep(1)} className=\"btn btn-secondary\">
 Voltar
 </button>
 </div>
 )}
 </div>
 </div>
 );
}

