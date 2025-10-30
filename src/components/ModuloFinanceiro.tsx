import React, { useState, useEffect } from 'react';
import '../styles/ModuloFinanceiro.css';

interface MovimentacaoFinanceira {
  id: string;
  data: string;
  descricao: string;
  tipo: 'entrada' | 'saida';
  valor: number;
  categoria: string;
  processo?: string;
}

interface PrevisaoRPV {
  id: string;
  cliente: string;
  processo: string;
  dataEstimada: string;
  valorEstimado: number;
  status: 'pendente' | 'recebido' | 'atrasado';
  tese: string;
}

interface FinanceiroStats {
  saldoAtual: number;
  recebitaMes: number;
  despesasMes: number;
  lucroMes: number;
  rpvsPendentes: number;
  valorRPVsPendentes: number;
  processosComPrazo: number;
}

export function ModuloFinanceiro() {
  const [stats, setStats] = useState<FinanceiroStats>({
    saldoAtual: 125000,
    recebitaMes: 45000,
    despesasMes: 15000,
    lucroMes: 30000,
    rpvsPendentes: 12,
    valorRPVsPendentes: 180000,
    processosComPrazo: 5
  });

  const [movimentacoes, setMovimentacoes] = useState<MovimentacaoFinanceira[]>([
    {
      id: '1',
      data: '28/10/2025',
      descricao: 'Honorários - Processo #001',
      tipo: 'entrada',
      valor: 5000,
      categoria: 'Honorários',
      processo: '#001'
    },
    {
      id: '2',
      data: '27/10/2025',
      descricao: 'Aluguel do escritório',
      tipo: 'saida',
      valor: 3000,
      categoria: 'Aluguel'
    },
    {
      id: '3',
      data: '26/10/2025',
      descricao: 'Honorários - Processo #002',
      tipo: 'entrada',
      valor: 4500,
      categoria: 'Honorários',
      processo: '#002'
    }
  ]);

  const [rpvs, setRPVs] = useState<PrevisaoRPV[]>([
    {
      id: '1',
      cliente: 'João Silva',
      processo: '#001',
      dataEstimada: '15/11/2025',
      valorEstimado: 25000,
      status: 'pendente',
      tese: 'Licença-Prêmio'
    },
    {
      id: '2',
      cliente: 'Maria Santos',
      processo: '#002',
      dataEstimada: '20/11/2025',
      valorEstimado: 18000,
      status: 'pendente',
      tese: 'Abono Permanência'
    },
    {
      id: '3',
      cliente: 'Pedro Costa',
      processo: '#003',
      dataEstimada: '05/11/2025',
      valorEstimado: 32000,
      status: 'atrasado',
      tese: 'Diferenças Salariais'
    }
  ]);

  const [filtroCategoria, setFiltroCategoria] = useState('todas');
  const [filtroTipo, setFiltroTipo] = useState('todas');

  const movimentacoesFiltradas = movimentacoes.filter(mov => {
    const categoriaCombina = filtroCategoria === 'todas' || mov.categoria === filtroCategoria;
    const tipoCombina = filtroTipo === 'todas' || mov.tipo === filtroTipo;
    return categoriaCombina && tipoCombina;
  });

  return (
    <div className="modulo-financeiro">
      <div className="financeiro-header">
        <h1>Módulo Financeiro</h1>
        <p>Gestão de fluxo de caixa e previsão de RPVs</p>
      </div>

      {/* Cards de Estatísticas */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">💰</div>
          <div className="stat-content">
            <h3>Saldo Atual</h3>
            <p className="stat-value">R$ {stats.saldoAtual.toLocaleString('pt-BR')}</p>
          </div>
        </div>

        <div className="stat-card entrada">
          <div className="stat-icon">📈</div>
          <div className="stat-content">
            <h3>Receita (Mês)</h3>
            <p className="stat-value">R$ {stats.recebitaMes.toLocaleString('pt-BR')}</p>
          </div>
        </div>

        <div className="stat-card saida">
          <div className="stat-icon">📉</div>
          <div className="stat-content">
            <h3>Despesas (Mês)</h3>
            <p className="stat-value">R$ {stats.despesasMes.toLocaleString('pt-BR')}</p>
          </div>
        </div>

        <div className="stat-card lucro">
          <div className="stat-icon">✨</div>
          <div className="stat-content">
            <h3>Lucro (Mês)</h3>
            <p className="stat-value">R$ {stats.lucroMes.toLocaleString('pt-BR')}</p>
          </div>
        </div>

        <div className="stat-card rpv">
          <div className="stat-icon">⏳</div>
          <div className="stat-content">
            <h3>RPVs Pendentes</h3>
            <p className="stat-value">{stats.rpvsPendentes}</p>
            <small>R$ {stats.valorRPVsPendentes.toLocaleString('pt-BR')}</small>
          </div>
        </div>

        <div className="stat-card alerta">
          <div className="stat-icon">⚠️</div>
          <div className="stat-content">
            <h3>Processos com Prazo</h3>
            <p className="stat-value">{stats.processosComPrazo}</p>
          </div>
        </div>
      </div>

      {/* Seção de Fluxo de Caixa */}
      <div className="section">
        <h2>Fluxo de Caixa</h2>

        <div className="filtros">
          <div className="filtro-grupo">
            <label>Tipo:</label>
            <select value={filtroTipo} onChange={(e) => setFiltroTipo(e.target.value)}>
              <option value="todas">Todas</option>
              <option value="entrada">Entradas</option>
              <option value="saida">Saídas</option>
            </select>
          </div>

          <div className="filtro-grupo">
            <label>Categoria:</label>
            <select value={filtroCategoria} onChange={(e) => setFiltroCategoria(e.target.value)}>
              <option value="todas">Todas</option>
              <option value="Honorários">Honorários</option>
              <option value="Aluguel">Aluguel</option>
              <option value="Pessoal">Pessoal</option>
              <option value="Outros">Outros</option>
            </select>
          </div>
        </div>

        <div className="movimentacoes-list">
          {movimentacoesFiltradas.length > 0 ? (
            movimentacoesFiltradas.map(mov => (
              <div key={mov.id} className={`movimentacao-item ${mov.tipo}`}>
                <div className="mov-info">
                  <div className="mov-header">
                    <span className="mov-data">{mov.data}</span>
                    <span className="mov-categoria">{mov.categoria}</span>
                  </div>
                  <p className="mov-descricao">{mov.descricao}</p>
                </div>
                <div className={`mov-valor ${mov.tipo}`}>
                  {mov.tipo === 'entrada' ? '+' : '-'} R$ {mov.valor.toLocaleString('pt-BR')}
                </div>
              </div>
            ))
          ) : (
            <p className="sem-dados">Nenhuma movimentação encontrada</p>
          )}
        </div>
      </div>

      {/* Seção de Previsão de RPVs */}
      <div className="section">
        <h2>Previsão de RPVs (Recebimentos Processuais Vinculados)</h2>

        <div className="rpvs-grid">
          {rpvs.map(rpv => (
            <div key={rpv.id} className={`rpv-card ${rpv.status}`}>
              <div className="rpv-header">
                <h3>{rpv.cliente}</h3>
                <span className={`rpv-status ${rpv.status}`}>
                  {rpv.status === 'pendente' && '⏳ Pendente'}
                  {rpv.status === 'recebido' && '✅ Recebido'}
                  {rpv.status === 'atrasado' && '⚠️ Atrasado'}
                </span>
              </div>

              <div className="rpv-info">
                <p><strong>Processo:</strong> {rpv.processo}</p>
                <p><strong>Tese:</strong> {rpv.tese}</p>
                <p><strong>Data Estimada:</strong> {rpv.dataEstimada}</p>
              </div>

              <div className="rpv-valor">
                R$ {rpv.valorEstimado.toLocaleString('pt-BR')}
              </div>

              <button className="rpv-btn">
                {rpv.status === 'atrasado' ? '🔔 Cobrar' : '📋 Acompanhar'}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Seção de Ações Rápidas */}
      <div className="section">
        <h2>Ações Rápidas</h2>
        <div className="acoes-grid">
          <button className="acao-btn">➕ Nova Movimentação</button>
          <button className="acao-btn">📊 Gerar Relatório</button>
          <button className="acao-btn">💾 Exportar Dados</button>
          <button className="acao-btn">🔔 Configurar Alertas</button>
        </div>
      </div>
    </div>
  );
}
