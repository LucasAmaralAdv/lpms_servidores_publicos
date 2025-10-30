import express, { Router, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { authMiddleware, AuthRequest } from '../middleware';

const router = Router();
const prisma = new PrismaClient();

// Obter estatísticas financeiras
router.get('/stats', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    // Simular dados (em produção, buscar do banco de dados)
    const stats = {
      saldoAtual: 125000,
      recebitaMes: 45000,
      despesasMes: 15000,
      lucroMes: 30000,
      rpvsPendentes: 12,
      valorRPVsPendentes: 180000,
      processosComPrazo: 5
    };

    res.json(stats);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Listar movimentações financeiras
router.get('/movimentacoes', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const { tipo, categoria, dataInicio, dataFim } = req.query;

    // Simular dados
    const movimentacoes = [
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
      }
    ];

    res.json(movimentacoes);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Criar movimentação financeira
router.post('/movimentacoes', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const { data, descricao, tipo, valor, categoria, processoId } = req.body;

    if (!data || !descricao || !tipo || !valor || !categoria) {
      return res.status(400).json({ error: 'Campos obrigatórios não preenchidos' });
    }

    // Simular criação
    const movimentacao = {
      id: Math.random().toString(36).substr(2, 9),
      data,
      descricao,
      tipo,
      valor,
      categoria,
      processoId
    };

    res.status(201).json(movimentacao);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

// Listar previsões de RPVs
router.get('/rpvs', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const { status, dataInicio, dataFim } = req.query;

    // Simular dados
    const rpvs = [
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
    ];

    res.json(rpvs);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Criar previsão de RPV
router.post('/rpvs', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const { clienteId, processoId, dataEstimada, valorEstimado, tese } = req.body;

    if (!clienteId || !processoId || !dataEstimada || !valorEstimado) {
      return res.status(400).json({ error: 'Campos obrigatórios não preenchidos' });
    }

    // Simular criação
    const rpv = {
      id: Math.random().toString(36).substr(2, 9),
      clienteId,
      processoId,
      dataEstimada,
      valorEstimado,
      tese,
      status: 'pendente'
    };

    res.status(201).json(rpv);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

// Atualizar status de RPV
router.put('/rpvs/:id', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ error: 'Status é obrigatório' });
    }

    // Simular atualização
    const rpv = {
      id,
      status
    };

    res.json(rpv);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

// Gerar relatório financeiro
router.get('/relatorio', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const { dataInicio, dataFim, formato } = req.query;

    // Simular geração de relatório
    const relatorio = {
      periodo: `${dataInicio} a ${dataFim}`,
      totalEntradas: 45000,
      totalSaidas: 15000,
      lucroLiquido: 30000,
      rpvsPendentes: 180000,
      processosAtivos: 345,
      geradoEm: new Date().toLocaleString('pt-BR')
    };

    if (formato === 'pdf') {
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 'attachment; filename="relatorio_financeiro.pdf"');
      // Em produção, gerar PDF real
      res.send('PDF do relatório');
    } else {
      res.json(relatorio);
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Configurar alertas financeiros
router.post('/alertas', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const { tipo, valor, email } = req.body;

    if (!tipo || !valor) {
      return res.status(400).json({ error: 'Campos obrigatórios não preenchidos' });
    }

    // Simular criação de alerta
    const alerta = {
      id: Math.random().toString(36).substr(2, 9),
      tipo,
      valor,
      email: email || req.user?.email,
      ativo: true
    };

    res.status(201).json(alerta);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
