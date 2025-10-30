import React from 'react'
import './App.css'

function App() {
 return (
 <div className="app">
 <header>
 <h1>LPMS - Servidores Publicos</h1>
 <p>Sistema de Gestao de Escritorio de Advocacia</p>
 </header>
 
 <main>
 <section className="welcome">
 <h2>Bem-vindo ao LPMS</h2>
 <p>Sistema completo de gestao juridica para acoes de servidores publicos</p>
 
 <div className="features">
 <div className="feature">
 <h3> Dashboard</h3>
 <p>Visao geral de todas as demandas e casos</p>
 </div>
 
 <div className="feature">
 <h3> Controle Processual</h3>
 <p>Gerenciamento de prazos e processos administrativos</p>
 </div>
 
 <div className="feature">
 <h3> Onboarding</h3>
 <p>Recebimento e gestao de novos clientes</p>
 </div>
 
 <div className="feature">
 <h3> Automacao</h3>
 <p>Geracao automatica de peticoes</p>
 </div>
 
 <div className="feature">
 <h3> Descoberta</h3>
 <p>Analise documental inteligente</p>
 </div>
 
 <div className="feature">
 <h3> Financeiro</h3>
 <p>Fluxo de caixa e previsao de RPVs</p>
 </div>
 </div>
 </section>
 </main>
 </div>
 )
}

export default App
