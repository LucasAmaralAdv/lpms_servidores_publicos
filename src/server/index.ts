import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import authRoutes from './routes/auth';
import clientesRoutes from './routes/clientes';
import processosRoutes from './routes/processos';
import documentosRoutes from './routes/documentos';
import andamentoRoutes from './routes/andamento';
import financeiroRoutes from './routes/financeiro';
import peticoesRoutes from './routes/peticoes';
import oportunidadesRoutes from './routes/oportunidades';
import respostasRoutes from './routes/respostas';
import { errorHandler } from './middleware';

dotenv.config();

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'LPMS Server is running' });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/clientes', clientesRoutes);
app.use('/api/processos', processosRoutes);
app.use('/api/documentos', documentosRoutes);
app.use('/api/andamento', andamentoRoutes);
app.use('/api/financeiro', financeiroRoutes);
app.use('/api/peticoes', peticoesRoutes);
app.use('/api/oportunidades', oportunidadesRoutes);
app.use('/api/respostas', respostasRoutes);

// Error handling
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`LPMS Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});

export default app;
