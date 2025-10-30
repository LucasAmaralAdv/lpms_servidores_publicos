import express, { Router, Response } from 'express';
import { authMiddleware, AuthRequest } from '../middleware';
import { gerarProcuracao, gerarContrato, gerarDeclaracaoHipossuficiencia } from '../services/pdfGenerator';

const router = Router();

// Gerar e baixar Procuração
router.post('/procuracao', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const { nome, cpf, rg, endereco, numero, complemento, bairro, cidade, estado, cep } = req.body;

    if (!nome || !cpf || !rg) {
      return res.status(400).json({ error: 'Dados obrigatórios não preenchidos' });
    }

    const pdfStream = gerarProcuracao({
      nome,
      cpf,
      rg,
      endereco: endereco || '',
      numero: numero || '',
      complemento: complemento || '',
      bairro: bairro || '',
      cidade: cidade || '',
      estado: estado || '',
      cep: cep || ''
    });

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename="Procuracao.pdf"');
    pdfStream.pipe(res);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Gerar e baixar Contrato
router.post('/contrato', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const { nome, cpf, rg, endereco, numero, complemento, bairro, cidade, estado, cep } = req.body;

    if (!nome || !cpf || !rg) {
      return res.status(400).json({ error: 'Dados obrigatórios não preenchidos' });
    }

    const pdfStream = gerarContrato({
      nome,
      cpf,
      rg,
      endereco: endereco || '',
      numero: numero || '',
      complemento: complemento || '',
      bairro: bairro || '',
      cidade: cidade || '',
      estado: estado || '',
      cep: cep || ''
    });

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename="Contrato.pdf"');
    pdfStream.pipe(res);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Gerar e baixar Declaração de Hipossuficiência
router.post('/declaracao', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const { nome, cpf, rg, endereco, numero, complemento, bairro, cidade, estado, cep } = req.body;

    if (!nome || !cpf || !rg) {
      return res.status(400).json({ error: 'Dados obrigatórios não preenchidos' });
    }

    const pdfStream = gerarDeclaracaoHipossuficiencia({
      nome,
      cpf,
      rg,
      endereco: endereco || '',
      numero: numero || '',
      complemento: complemento || '',
      bairro: bairro || '',
      cidade: cidade || '',
      estado: estado || '',
      cep: cep || ''
    });

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename="Declaracao_Hipossuficiencia.pdf"');
    pdfStream.pipe(res);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
