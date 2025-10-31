import express, { Router, Response } from 'express';
import { gerarPeticao, analisarDocumento, gerarResumo, validarPeticao } from '../services/peticaoService';
import { authMiddleware, AuthRequest } from '../middleware';

const router = Router();

// Gerar peticao
router.post('/gerar', authMiddleware, async (req: AuthRequest, res: Response) => {
 try {
 const { tipo, tese, cliente, processo, modeloReferencia, informacoesAdicionais } = req.body;

 if (!tipo || !tese || !cliente || !processo) {
 return res.status(400).json({ error: 'Campos obrigatorios nao preenchidos' });
 }

 const peticao = await gerarPeticao({
 tipo,
 tese,
 cliente,
 processo,
 modeloReferencia,
 informacoesAdicionais
 });

 // Validar peticao
 const validacao = await validarPeticao(peticao);

 res.json({
 id: Math.random().toString(36).substr(2, 9),
 tipo,
 tese,
 cliente,
 processo,
 conteudo: peticao,
 status: 'pronta',
 dataCriacao: new Date().toISOString(),
 validacao
 });
 } catch (error: any) {
 res.status(400).json({ error: error.message });
 }
});

// Analisar documento
router.post('/analisar', authMiddleware, async (req: AuthRequest, res: Response) => {
 try {
 const { conteudo, tipo } = req.body;

 if (!conteudo) {
 return res.status(400).json({ error: 'Conteudo do documento e obrigatorio' });
 }

 const pontosChave = await analisarDocumento(conteudo, tipo || 'documento');

 res.json({
 pontosChave,
 totalPontos: pontosChave.length
 });
 } catch (error: any) {
 res.status(400).json({ error: error.message });
 }
});

// Gerar resumo de peticao
router.post('/resumo', authMiddleware, async (req: AuthRequest, res: Response) => {
 try {
 const { peticao } = req.body;

 if (!peticao) {
 return res.status(400).json({ error: 'Peticao e obrigatoria' });
 }

 const resumo = await gerarResumo(peticao);

 res.json({ resumo });
 } catch (error: any) {
 res.status(400).json({ error: error.message });
 }
});

// Validar peticao
router.post('/validar', authMiddleware, async (req: AuthRequest, res: Response) => {
 try {
 const { peticao } = req.body;

 if (!peticao) {
 return res.status(400).json({ error: 'Peticao e obrigatoria' });
 }

 const validacao = await validarPeticao(peticao);

 res.json(validacao);
 } catch (error: any) {
 res.status(400).json({ error: error.message });
 }
});

// Listar peticoes do usuario
router.get('/', authMiddleware, async (req: AuthRequest, res: Response) => {
 try {
 // Simular listagem de peticoes
 const peticoes = [
 {
 id: '1',
 tipo: 'replica',
 tese: 'Licenca-Premio',
 cliente: 'Joao Silva',
 processo: '#001',
 status: 'pronta',
 dataCriacao: '28/10/2025'
 },
 {
 id: '2',
 tipo: 'recurso',
 tese: 'Abono Permanencia',
 cliente: 'Maria Santos',
 processo: '#002',
 status: 'enviada',
 dataCriacao: '27/10/2025'
 }
 ];

 res.json(peticoes);
 } catch (error: any) {
 res.status(500).json({ error: error.message });
 }
});

// Obter peticao especifica
router.get('/:id', authMiddleware, async (req: AuthRequest, res: Response) => {
 try {
 const { id } = req.params;

 // Simular busca de peticao
 const peticao = {
 id,
 tipo: 'replica',
 tese: 'Licenca-Premio',
 cliente: 'Joao Silva',
 processo: '#001',
 conteudo: 'Conteudo da peticao...',
 status: 'pronta',
 dataCriacao: '28/10/2025'
 };

 res.json(peticao);
 } catch (error: any) {
 res.status(500).json({ error: error.message });
 }
});

// Atualizar peticao
router.put('/:id', authMiddleware, async (req: AuthRequest, res: Response) => {
 try {
 const { id } = req.params;
 const { conteudo, status } = req.body;

 // Simular atualizacao
 const peticao = {
 id,
 conteudo,
 status,
 dataAtualizacao: new Date().toISOString()
 };

 res.json(peticao);
 } catch (error: any) {
 res.status(400).json({ error: error.message });
 }
});

// Deletar peticao
router.delete('/:id', authMiddleware, async (req: AuthRequest, res: Response) => {
 try {
 const { id } = req.params;

 res.json({ message: `Peticao ${id} deletada com sucesso` });
 } catch (error: any) {
 res.status(400).json({ error: error.message });
 }
});

export default router;

