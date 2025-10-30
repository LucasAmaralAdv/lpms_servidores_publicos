import React from 'react'
import './App.css'

function App() {
  return (
    <div className="app">
      <header>
        <h1>LPMS - Servidores Públicos</h1>
        <p>Sistema de Gestão de Escritório de Advocacia</p>
      </header>
      
      <main>
        <section className="welcome">
          <h2>Bem-vindo ao LPMS</h2>
          <p>Sistema completo de gestão jurídica para ações de servidores públicos</p>
          
          <div className="features">
            <div className="feature">
              <h3>📊 Dashboard</h3>
              <p>Visão geral de todas as demandas e casos</p>
            </div>
            
            <div className="feature">
              <h3>⏰ Controle Processual</h3>
              <p>Gerenciamento de prazos e processos administrativos</p>
            </div>
            
            <div className="feature">
              <h3>👥 Onboarding</h3>
              <p>Recebimento e gestão de novos clientes</p>
            </div>
            
            <div className="feature">
              <h3>📄 Automação</h3>
              <p>Geração automática de petições</p>
            </div>
            
            <div className="feature">
              <h3>🔍 Descoberta</h3>
              <p>Análise documental inteligente</p>
            </div>
            
            <div className="feature">
              <h3>💰 Financeiro</h3>
              <p>Fluxo de caixa e previsão de RPVs</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default App
