import React, { useState, useEffect } from 'react';
import '../styles/Dashboard.css';

interface DashboardStats {
  totalClientes: number;
  totalProcessos: number;
  processosAtivos: number;
  prazosVencidos: number;
  oportunidadesIdentificadas: number;
  recebitaPrevistoMes: number;
}

export function Dashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalClientes: 0,
    totalProcessos: 0,
    processosAtivos: 0,
    prazosVencidos: 0,
    oportunidadesIdentificadas: 0,
    recebitaPrevistoMes: 0
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simular carregamento de dados
    setTimeout(() => {
      setStats({
        totalClientes: 127,
        totalProcessos: 598,
        processosAtivos: 345,
        prazosVencidos: 12,
        oportunidadesIdentificadas: 23,
        recebitaPrevistoMes: 45000
      });
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return <div className="dashboard loading">Carregando...</div>;
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Dashboard LPMS</h1>
        <p>Visão geral do seu escritório de advocacia</p>
      </div>

      <div className="dashboard-grid">
        <div className="stat-card">
          <div className="stat-icon">👥</div>
          <div className="stat-content">
            <h3>Total de Clientes</h3>
            <p className="stat-value">{stats.totalClientes}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">📋</div>
          <div className="stat-content">
            <h3>Total de Processos</h3>
            <p className="stat-value">{stats.totalProcessos}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">⚡</div>
          <div className="stat-content">
            <h3>Processos Ativos</h3>
            <p className="stat-value">{stats.processosAtivos}</p>
          </div>
        </div>

        <div className="stat-card alert">
          <div className="stat-icon">⏰</div>
          <div className="stat-content">
            <h3>Prazos Vencidos</h3>
            <p className="stat-value">{stats.prazosVencidos}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">🔍</div>
          <div className="stat-content">
            <h3>Oportunidades Identificadas</h3>
            <p className="stat-value">{stats.oportunidadesIdentificadas}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">💰</div>
          <div className="stat-content">
            <h3>Receita Prevista (Mês)</h3>
            <p className="stat-value">R$ {stats.recebitaPrevistoMes.toLocaleString('pt-BR')}</p>
          </div>
        </div>
      </div>

      <div className="dashboard-sections">
        <section className="section">
          <h2>Ações Rápidas</h2>
          <div className="action-buttons">
            <button className="action-btn">➕ Novo Cliente</button>
            <button className="action-btn">📄 Novo Processo</button>
            <button className="action-btn">✉️ Responder Cliente</button>
            <button className="action-btn">🔍 Analisar Oportunidades</button>
          </div>
        </section>

        <section className="section">
          <h2>Prazos Próximos</h2>
          <div className="list">
            <div className="list-item">
              <span className="date">Hoje</span>
              <span className="description">Prazo para resposta - Processo #001</span>
            </div>
            <div className="list-item">
              <span className="date">Amanhã</span>
              <span className="description">Prazo para petição - Processo #002</span>
            </div>
            <div className="list-item">
              <span className="date">Em 3 dias</span>
              <span className="description">Revisão SEI-DF - Requisição #045</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
