import React, { useState } from 'react';
import '../styles/ClienteOnboarding.css';

interface FormData {
  nome: string;
  cpf: string;
  rg: string;
  dataNascimento: string;
  estadoCivil: string;
  telefone: string;
  email: string;
  endereco: string;
  numero: string;
  complemento: string;
  bairro: string;
  cidade: string;
  estado: string;
  cep: string;
  orgaoTrabalho: string;
  cargo: string;
  matricula: string;
  dataAdmissao: string;
  dataPrevistAposentadoria: string;
  situacaoFuncional: string;
}

export function ClienteOnboarding() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    nome: '',
    cpf: '',
    rg: '',
    dataNascimento: '',
    estadoCivil: '',
    telefone: '',
    email: '',
    endereco: '',
    numero: '',
    complemento: '',
    bairro: '',
    cidade: '',
    estado: '',
    cep: '',
    orgaoTrabalho: '',
    cargo: '',
    matricula: '',
    dataAdmissao: '',
    dataPrevistAposentadoria: '',
    situacaoFuncional: ''
  });

  const [uploadedFiles, setUploadedFiles] = useState<{
    procuracao?: File;
    contrato?: File;
    declaracao?: File;
  }>({});

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, fileType: string) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFiles(prev => ({
        ...prev,
        [fileType]: file
      }));
      setMessage(`${fileType} enviado com sucesso!`);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simular envio
      console.log('Dados do cliente:', formData);
      console.log('Arquivos:', uploadedFiles);
      
      setMessage('✅ Cliente cadastrado com sucesso! Voce recebera um e-mail de confirmacao.');
      
      // Limpar formulario
      setTimeout(() => {
        setStep(1);
        setFormData({
          nome: '',
          cpf: '',
          rg: '',
          dataNascimento: '',
          estadoCivil: '',
          telefone: '',
          email: '',
          endereco: '',
          numero: '',
          complemento: '',
          bairro: '',
          cidade: '',
          estado: '',
          cep: '',
          orgaoTrabalho: '',
          cargo: '',
          matricula: '',
          dataAdmissao: '',
          dataPrevistAposentadoria: '',
          situacaoFuncional: ''
        });
        setUploadedFiles({});
      }, 3000);
    } catch (error) {
      setMessage('❌ Erro ao cadastrar cliente. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="onboarding-container">
      <div className="onboarding-card">
        <div className="onboarding-header">
          <h1>Bem-vindo ao LPMS</h1>
          <p>Cadastro de Novo Cliente</p>
          <div className="progress-bar">
            <div className="progress" style={{ width: `${(step / 4) * 100}%` }}></div>
          </div>
        </div>

        {message && (
          <div className={`message ${message.includes('✅') ? 'success' : 'error'}`}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Step 1: Dados Pessoais */}
          {step === 1 && (
            <div className="form-step">
              <h2>Dados Pessoais</h2>
              
              <div className="form-group">
                <label>Nome Completo *</label>
                <input
                  type="text"
                  name="nome"
                  value={formData.nome}
                  onChange={handleInputChange}
                  required
                  placeholder="Seu nome completo"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>CPF *</label>
                  <input
                    type="text"
                    name="cpf"
                    value={formData.cpf}
                    onChange={handleInputChange}
                    required
                    placeholder="000.000.000-00"
                  />
                </div>
                <div className="form-group">
                  <label>RG</label>
                  <input
                    type="text"
                    name="rg"
                    value={formData.rg}
                    onChange={handleInputChange}
                    placeholder="RG"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Data de Nascimento</label>
                  <input
                    type="date"
                    name="dataNascimento"
                    value={formData.dataNascimento}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label>Estado Civil</label>
                  <select name="estadoCivil" value={formData.estadoCivil} onChange={handleInputChange}>
                    <option value="">Selecione...</option>
                    <option value="solteiro">Solteiro(a)</option>
                    <option value="casado">Casado(a)</option>
                    <option value="divorciado">Divorciado(a)</option>
                    <option value="viuvo">Viuvo(a)</option>
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Telefone *</label>
                  <input
                    type="tel"
                    name="telefone"
                    value={formData.telefone}
                    onChange={handleInputChange}
                    required
                    placeholder="(61) 9.9999-9999"
                  />
                </div>
                <div className="form-group">
                  <label>E-mail *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder="seu@email.com"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Endereco */}
          {step === 2 && (
            <div className="form-step">
              <h2>Endereco</h2>
              
              <div className="form-group">
                <label>Endereco</label>
                <input
                  type="text"
                  name="endereco"
                  value={formData.endereco}
                  onChange={handleInputChange}
                  placeholder="Rua, avenida, etc"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Numero</label>
                  <input
                    type="text"
                    name="numero"
                    value={formData.numero}
                    onChange={handleInputChange}
                    placeholder="Nº"
                  />
                </div>
                <div className="form-group">
                  <label>Complemento</label>
                  <input
                    type="text"
                    name="complemento"
                    value={formData.complemento}
                    onChange={handleInputChange}
                    placeholder="Apto, sala, etc"
                  />
              </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Bairro</label>
                  <input
                    type="text"
                    name="bairro"
                    value={formData.bairro}
                    onChange={handleInputChange}
                    placeholder="Bairro"
                  />
                </div>
                <div className="form-group">
                  <label>Cidade</label>
                  <input
                    type="text"
                    name="cidade"
                    value={formData.cidade}
                    onChange={handleInputChange}
                    placeholder="Cidade"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Estado</label>
                  <input
                    type="text"
                    name="estado"
                    value={formData.estado}
                    onChange={handleInputChange}
                    placeholder="DF"
                    maxLength={2}
                  />
                </div>
                <div className="form-group">
                  <label>CEP</label>
                  <input
                    type="text"
                    name="cep"
                    value={formData.cep}
                    onChange={handleInputChange}
                    placeholder="00000-000"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Dados Profissionais */}
          {step === 3 && (
            <div className="form-step">
              <h2>Dados Profissionais</h2>
              
              <div className="form-group">
                <label>Órgao onde trabalha/trabalhou</label>
                <input
                  type="text"
                  name="orgaoTrabalho"
                  value={formData.orgaoTrabalho}
                  onChange={handleInputChange}
                  placeholder="Ex: Secretaria de Educacao"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Cargo</label>
                  <input
                    type="text"
                    name="cargo"
                    value={formData.cargo}
                    onChange={handleInputChange}
                    placeholder="Seu cargo"
                  />
                </div>
                <div className="form-group">
                  <label>Matricula</label>
                  <input
                    type="text"
                    name="matricula"
                    value={formData.matricula}
                    onChange={handleInputChange}
                    placeholder="Numero da matricula"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Data de Admissao</label>
                  <input
                    type="date"
                    name="dataAdmissao"
                    value={formData.dataAdmissao}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label>Data Prevista de Aposentadoria</label>
                  <input
                    type="date"
                    name="dataPrevistAposentadoria"
                    value={formData.dataPrevistAposentadoria}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Situacao Funcional</label>
                <select name="situacaoFuncional" value={formData.situacaoFuncional} onChange={handleInputChange}>
                  <option value="">Selecione...</option>
                  <option value="ativo">Ativo</option>
                  <option value="aposentado">Aposentado</option>
                  <option value="exonerado">Exonerado</option>
                  <option value="licenca">Em Licenca</option>
                </select>
              </div>
            </div>
          )}

          {/* Step 4: Documentos */}
          {step === 4 && (
            <div className="form-step">
              <h2>Documentos</h2>
              <p className="step-description">
                Faca o download dos documentos, assine digitalmente e envie de volta.
              </p>

              <div className="documents-section">
                <div className="document-card">
                  <h3>📄 Procuracao</h3>
                  <p>Documento que autoriza o escritorio a agir em seu nome</p>
                  <button type="button" className="download-btn">
                    ⬇️ Baixar Procuracao
                  </button>
                  <label className="upload-label">
                    📤 Enviar Procuracao Assinada
                    <input
                      type="file"
                      accept=".pdf"
                      onChange={(e) => handleFileUpload(e, 'procuracao')}
                    />
                  </label>
                  {uploadedFiles.procuracao && (
                    <p className="file-uploaded">✅ {uploadedFiles.procuracao.name}</p>
                  )}
                </div>

                <div className="document-card">
                  <h3>📋 Contrato</h3>
                  <p>Contrato de prestacao de servicos juridicos</p>
                  <button type="button" className="download-btn">
                    ⬇️ Baixar Contrato
                  </button>
                  <label className="upload-label">
                    📤 Enviar Contrato Assinado
                    <input
                      type="file"
                      accept=".pdf"
                      onChange={(e) => handleFileUpload(e, 'contrato')}
                    />
                  </label>
                  {uploadedFiles.contrato && (
                    <p className="file-uploaded">✅ {uploadedFiles.contrato.name}</p>
                  )}
                </div>

                <div className="document-card">
                  <h3>📝 Declaracao de Hipossuficiencia</h3>
                  <p>Declaracao de insuficiencia de recursos para pagar custas</p>
                  <button type="button" className="download-btn">
                    ⬇️ Baixar Declaracao
                  </button>
                  <label className="upload-label">
                    📤 Enviar Declaracao Assinada
                    <input
                      type="file"
                      accept=".pdf"
                      onChange={(e) => handleFileUpload(e, 'declaracao')}
                    />
                  </label>
                  {uploadedFiles.declaracao && (
                    <p className="file-uploaded">✅ {uploadedFiles.declaracao.name}</p>
                  )}
                </div>
              </div>

              <div className="tutorial-section">
                <h3>📹 Como Assinar Digitalmente?</h3>
                <p>Assista ao tutorial abaixo para aprender como assinar seus documentos:</p>
                <a href="https://www.youtube.com/watch?v=dE_hy6sbe9Q" target="_blank" rel="noopener noreferrer" className="youtube-link">
                  🎥 Assista ao Tutorial
                </a>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="form-navigation">
            {step > 1 && (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="btn btn-secondary"
                disabled={loading}
              >
                ← Voltar
              </button>
            )}
            
            {step < 4 ? (
              <button
                type="button"
                onClick={() => setStep(step + 1)}
                className="btn btn-primary"
                disabled={loading}
              >
                Proximo →
              </button>
            ) : (
              <button
                type="submit"
                className="btn btn-success"
                disabled={loading || !uploadedFiles.procuracao || !uploadedFiles.contrato || !uploadedFiles.declaracao}
              >
                {loading ? 'Enviando...' : '✅ Finalizar Cadastro'}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
