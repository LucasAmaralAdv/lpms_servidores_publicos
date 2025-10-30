# LPMS - Sistema de Gestão de Escritório de Advocacia

Sistema completo de gestão jurídica especializado em ações de Servidores Públicos contra o Distrito Federal e a União.

## 🎯 Funcionalidades Principais

### 1. **Dashboard de Visão Geral**
- Painel centralizado com visão de todas as demandas e casos
- Indicadores-chave (KPIs) em tempo real
- Acesso compartilhado com múltiplos usuários

### 2. **Controle Processual** (Prioridade 1)
- Unificação de prazos, novas ações e processos administrativos
- Integração com publicações oficiais
- Gestão de dependências (cliente/secretaria)
- Monitoramento de processos "dormentes"
- Alertas automáticos para prazos vencidos

### 3. **Onboarding de Clientes** (Prioridade 1)
- Página pública para preenchimento de dados
- Geração automática de PDFs (Procuração, Contrato, Declaração)
- Upload seguro de documentos assinados digitalmente
- Rastreamento de tarefas pendentes

### 4. **Consulta de Andamento Processual**
- Página pública integrada com TJDFT
- Análise por IA com resumo humanizado
- Acesso sem necessidade de login

### 5. **Automação de Petições** (Prioridade 2)
- Geração automática de peças processuais
- Baseada em modelos por tese jurídica
- Análise documental para adaptação automática

### 6. **Descoberta de Oportunidades** (Prioridade 3)
- Análise documental inteligente
- Identificação automática de novas teses aplicáveis
- Relatório de oportunidades para prospecção

### 7. **Módulo Financeiro**
- Fluxo de caixa completo
- Previsão de RPVs
- Automação de prazos de cobrança e peticionamento

### 8. **Resposta Sistematizada a Clientes**
- Sistema de respostas padronizadas
- Integração com WhatsApp/E-mail
- Histórico de comunicações

## 🛠️ Stack Tecnológico

### Frontend
- **React 19** - UI Framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **CSS3** - Styling

### Backend
- **Express.js** - API Framework
- **Node.js** - Runtime
- **TypeScript** - Type safety
- **Prisma** - ORM

### Database
- **PostgreSQL** - Banco de dados principal
- **Prisma** - Query builder

### IA & Integração
- **OpenAI API** - Análise de documentos e geração de petições
- **Axios** - HTTP client para integração TJDFT

### Autenticação & Segurança
- **JWT** - Token-based authentication
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin requests

### Utilitários
- **PDFKit** - Geração de PDFs
- **Multer** - File upload handling
- **Dotenv** - Environment variables

## 📦 Instalação

### Pré-requisitos
- Node.js 18+
- pnpm (ou npm/yarn)
- PostgreSQL 12+

### Passos

1. **Clone o repositório**
```bash
git clone <repo-url>
cd lpms_servidores_publicos
```

2. **Instale as dependências**
```bash
pnpm install
```

3. **Configure as variáveis de ambiente**
```bash
cp .env.example .env
# Edite o arquivo .env com suas configurações
```

4. **Configure o banco de dados**
```bash
pnpm db:push
```

5. **Inicie o desenvolvimento**
```bash
# Terminal 1: Frontend
pnpm dev

# Terminal 2: Backend
pnpm server:dev
```

## 📁 Estrutura do Projeto

```
lpms_servidores_publicos/
├── src/
│   ├── App.tsx              # Componente principal
│   ├── App.css              # Estilos
│   ├── main.tsx             # Ponto de entrada
│   ├── index.css            # Estilos globais
│   └── server/
│       └── index.ts         # Servidor Express
├── prisma/
│   └── schema.prisma        # Schema do banco de dados
├── index.html               # HTML principal
├── vite.config.ts           # Configuração Vite
├── tsconfig.json            # Configuração TypeScript
├── package.json             # Dependências
├── .env.example             # Variáveis de ambiente
└── README.md                # Este arquivo
```

## 🗄️ Banco de Dados

### Modelos Principais

- **User** - Usuários do sistema (advogados, secretaria)
- **Cliente** - Dados pessoais, profissionais e financeiros dos clientes
- **Processo** - Informações dos processos jurídicos
- **Prazo** - Prazos processuais
- **Andamento** - Andamentos dos processos
- **Peticao** - Petições geradas
- **Documento** - Documentos dos clientes
- **Tarefa** - Tarefas do escritório
- **Comunicacao** - Comunicações com clientes
- **Oportunidade** - Oportunidades identificadas por IA
- **Financeiro** - Dados financeiros (receitas, despesas, RPVs)
- **RequisicaoSEI** - Rastreamento de requisições SEI-DF
- **ModeloPeticao** - Modelos de petições por tese

## 🔐 Segurança

- Autenticação JWT
- Passwords com bcryptjs
- CORS configurado
- Validação de entrada
- Proteção contra SQL injection (via Prisma)

## 📝 Variáveis de Ambiente

```
DATABASE_URL=postgresql://user:password@localhost:5432/lpms_db
JWT_SECRET=seu_secret_jwt_muito_seguro_aqui
OPENAI_API_KEY=sua_chave_openai_aqui
PORT=3000
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173
MAX_FILE_SIZE=52428800
UPLOAD_DIR=./uploads
TJDFT_API_URL=https://pje-consultapublica.tjdft.jus.br/consultapublica
```

## 🚀 Deploy

### Opções de Hospedagem Recomendadas
- **Render** - Full-stack hosting
- **Railway** - Full-stack hosting
- **Vercel** - Frontend + Serverless
- **Heroku** - Backend

## 📞 Suporte

Para dúvidas ou problemas, entre em contato com o desenvolvedor.

## 📄 Licença

ISC

---

**Desenvolvido com ❤️ para escritórios de advocacia especializados em direitos de servidores públicos**
