import React, { useState } from 'react';
import '../styles/ConsultaAndamento.css';

interface ProcessoInfo {
  numeroProcesso: string;
  tese: string;
  status: string;
  dataAjuizamento: string;
  tribunal: string;
  ultimoAndamento: string;
  dataUltimoAndamento: string;
  proximoPrazo?: string;
  descricaoPrazo?: string;
  resumoIA: string;
}

export function ConsultaAndamento() {
  const [searchType, setSearchType] = useState('cpf'); // cpf ou numeroProcesso
  const [searchValue, setSearchValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [processo, setProcesso] = useState<ProcessoInfo | null>(null);
  const [error, setError] = useState('');

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setProcesso(null);

    try {
      // Simular busca na API
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Dados simulados
      const processosSimulados: { [key: string]: ProcessoInfo } = {
        '12345678901': {
          numeroProcesso: '0001234-56.2023.5.10.0001',
          tese: 'Licença-Prêmio',
          status: 'Aguardando Sentença',
          dataAjuizamento: '15/03/2023',
          tribunal: 'TRT 10ª Região (DF/TO)',
          ultimoAndamento: 'Despacho do Juiz',
          dataUltimoAndamento: '28/10/2025',
          proximoPrazo: '15/11/2025',
          descricaoPrazo: 'Prazo para resposta da parte adversa',
          resumoIA: 'Seu processo está em fase de julgamento. O juiz já analisou as petições e está preparando a sentença. Previsão: 2-3 meses para decisão final.'
        },
        '0001234-56.2023.5.10.0001': {
          numeroProcesso: '0001234-56.2023.5.10.0001',
          tese: 'Licença-Prêmio',
          status: 'Aguardando Sentença',
          dataAjuizamento: '15/03/2023',
          tribunal: 'TRT 10ª Região (DF/TO)',
          ultimoAndamento: 'Despacho do Juiz',
          dataUltimoAndamento: '28/10/2025',
          proximoPrazo: '15/11/2025',
          descricaoPrazo: 'Prazo para resposta da parte adversa',
          resumoIA: 'Seu processo está em fase de julgamento. O juiz já analisou as petições e está preparando a sentença. Previsão: 2-3 meses para decisão final.'
        }
      };

      const resultado = processosSimulados[searchValue];
      
      if (resultado) {
        setProcesso(resultado);
      } else {
        setError('Nenhum processo encontrado com os dados informados.');
      }
    } catch (err) {
      setError('Erro ao buscar processo. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="consulta-container">
      <div className="consulta-card">
        <div className="consulta-header">
          <h1>Consulta de Andamento Processual</h1>
          <p>Acompanhe o status do seu processo de forma simples e clara</p>
        </div>

        <form onSubmit={handleSearch} className="consulta-form">
          <div className="search-type-selector">
            <label>
              <input
                type="radio"
                value="cpf"
                checked={searchType === 'cpf'}
                onChange={(e) => setSearchType(e.target.value)}
              />
              Buscar por CPF
            </label>
            <label>
              <input
                type="radio"
                value="numeroProcesso"
                checked={searchType === 'numeroProcesso'}
                onChange={(e) => setSearchType(e.target.value)}
              />
              Buscar por Número do Processo
            </label>
          </div>

          <div className="search-input-group">
            <input
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder={
                searchType === 'cpf'
                  ? 'Digite seu CPF (ex: 123.456.789-00)'
                  : 'Digite o número do processo (ex: 0001234-56.2023.5.10.0001)'
              }
              required
            />
            <button type="submit" disabled={loading} className="search-btn">
              {loading ? '🔍 Buscando...' : '🔍 Buscar'}
            </button>
          </div>
        </form>

        {error && (
          <div className="error-message">
            ❌ {error}
          </div>
        )}

        {processo && (
          <div className="resultado-container">
            <div className="processo-header">
              <h2>Processo #{processo.numeroProcesso}</h2>
              <span className={`status-badge ${processo.status.toLowerCase().replace(/\s+/g, '-')}`}>
                {processo.status}
              </span>
            </div>

            <div className="processo-info-grid">
              <div className="info-card">
                <h3>📋 Tese Jurídica</h3>
                <p>{processo.tese}</p>
              </div>

              <div className="info-card">
                <h3>📅 Data de Ajuizamento</h3>
                <p>{processo.dataAjuizamento}</p>
              </div>

              <div className="info-card">
                <h3>⚖️ Tribunal</h3>
                <p>{processo.tribunal}</p>
              </div>

              <div className="info-card">
                <h3>📝 Último Andamento</h3>
                <p>{processo.ultimoAndamento}</p>
                <small>{processo.dataUltimoAndamento}</small>
              </div>
            </div>

            <div className="resumo-ia-section">
              <h3>🤖 Resumo Inteligente (Análise por IA)</h3>
              <div className="resumo-box">
                <p>{processo.resumoIA}</p>
              </div>
            </div>

            {processo.proximoPrazo && (
              <div className="proximo-prazo-section">
                <h3>⏰ Próximo Prazo</h3>
                <div className="prazo-card alert">
                  <p className="prazo-data">{processo.proximoPrazo}</p>
                  <p className="prazo-descricao">{processo.descricaoPrazo}</p>
                </div>
              </div>
            )}

            <div className="informacoes-importantes">
              <h3>ℹ️ Informações Importantes</h3>
              <ul>
                <li>Este é um resumo automático do andamento do seu processo.</li>
                <li>Para informações detalhadas, consulte o site do tribunal.</li>
                <li>Em caso de dúvidas, entre em contato com nosso escritório.</li>
                <li>Atualizações são feitas automaticamente conforme os andamentos processuais.</li>
              </ul>
            </div>

            <div className="contato-section">
              <h3>📞 Dúvidas?</h3>
              <p>Entre em contato com nosso escritório:</p>
              <p className="contato-info">
                <strong>WhatsApp:</strong> (61) 9.9841-8226<br/>
                <strong>E-mail:</strong> contato@escritorio.com.br
              </p>
            </div>
          </div>
        )}

        {!processo && !error && !loading && (
          <div className="placeholder">
            <p>🔍 Digite seus dados acima para consultar o andamento do seu processo</p>
          </div>
        )}
      </div>
    </div>
  );
}
