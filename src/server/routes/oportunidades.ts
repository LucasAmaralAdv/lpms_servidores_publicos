import express, { Router, Response } from 'express';
import {
 analisarClienteOportunidades,
 analisarClientesEmMassa,
 gerarRelatorioOportunidades,
 priorizarOportunidades
} from '../services/oportunidadeService';
import { authMiddleware, AuthRequest } from '../middleware';

const router = Router();

// Analisar cliente especifico
router.post('/analisar-cliente', authMiddleware, async (req: AuthRequest, res: Response) => {
 try {
 const { clienteId, nome, cpf, dataAdmissao, dataAposentadoria, cargo, salario } = req.body;

 if (!nome || !dataAdmissao || !dataAposentadoria) {
 return res.status(400).json({ error: 'Dados obrigatorios nao preenchidos' });
 }

 const oportunidades = await analisarClienteOportunidades({
 id: clienteId || Math.random().toString(36).substr(2, 9),
 nome,
 cpf,
 dataAdmissao,
 dataAposentadoria,
 cargo,
 salario: salario || 0
 });

 res.json({
 cliente: { nome, cpf, cargo },
 oportunidades,
 total: oportunidades.length
 });
 } catch (error: any) {
 res.status(400).json({ error: error.message });
 }
});

// Analisar multiplos clientes
router.post('/analisar-massa', authMiddleware, async (req: AuthRequest, res: Response) => {
 try {
 const { clientes } = req.body;

 if (!Array.isArray(clientes) || clientes.length === 0) {
 return res.status(400).json({ error: 'Lista de clientes e obrigatoria' });
 }

 const resultados = await analisarClientesEmMassa(clientes);
 const todasOportunidades: any[] = [];

 resultados.forEach((opps, clienteId) => {
 todasOportunidades.push({
 clienteId,
 oportunidades: opps
 });
 });

 res.json({
 totalClientes: clientes.length,
 totalOportunidades: todasOportunidades.reduce((sum, item) => sum + item.oportunidades.length, 0),
 resultados: todasOportunidades
 });
 } catch (error: any) {
 res.status(400).json({ error: error.message });
 }
});

// Gerar relatorio de oportunidades
router.post('/relatorio', authMiddleware, async (req: AuthRequest, res: Response) => {
 try {
 const { oportunidades } = req.body;

 if (!Array.isArray(oportunidades)) {
 return res.status(400).json({ error: 'Lista de oportunidades e obrigatoria' });
 }

 const relatorio = await gerarRelatorioOportunidades(oportunidades);

 res.json({
 relatorio,
 dataGeracao: new Date().toISOString()
 });
 } catch (error: any) {
 res.status(400).json({ error: error.message });
 }
});

// Priorizar oportunidades
router.post('/priorizar', authMiddleware, async (req: AuthRequest, res: Response) => {
 try {
 const { oportunidades, salario, tempoServico } = req.body;

 if (!Array.isArray(oportunidades)) {
 return res.status(400).json({ error: 'Lista de oportunidades e obrigatoria' });
 }

 const oportunidadesPriorizadas = priorizarOportunidades(
 oportunidades,
 salario || 0,
 tempoServico || 0
 );

 res.json({
 oportunidadesPriorizadas,
 total: oportunidadesPriorizadas.length
 });
 } catch (error: any) {
 res.status(400).json({ error: error.message });
 }
});

// Listar oportunidades do usuario
router.get('/', authMiddleware, async (req: AuthRequest, res: Response) => {
 try {
 // Simular listagem
 const oportunidades = [
 {
 id: '1',
 cliente: 'Joao Silva',
 tese: 'Licenca-Premio',
 confianca: 95,
 status: 'nova',
 dataCriacao: '28/10/2025'
 },
 {
 id: '2',
 cliente: 'Maria Santos',
 tese: 'Abono Permanencia',
 confianca: 88,
 status: 'nova',
 dataCriacao: '28/10/2025'
 }
 ];

 res.json(oportunidades);
 } catch (error: any) {
 res.status(500).json({ error: error.message });
 }
});

// Obter oportunidade especifica
router.get('/:id', authMiddleware, async (req: AuthRequest, res: Response) => {
 try {
 const { id } = req.params;

 // Simular busca
 const oportunidade = {
 id,
 cliente: 'Joao Silva',
 tese: 'Licenca-Premio',
 confianca: 95,
 motivo: 'Cliente tem 15 anos de servico e nao usufruiu licenca-premio',
 documentosNecessarios: ['Contracheque', 'Ficha Funcional'],
 status: 'nova',
 dataCriacao: '28/10/2025'
 };

 res.json(oportunidade);
 } catch (error: any) {
 res.status(500).json({ error: error.message });
 }
});

// Marcar oportunidade como ajuizada
router.put('/:id/ajuizar', authMiddleware, async (req: AuthRequest, res: Response) => {
 try {
 const { id } = req.params;

 res.json({
 id,
 status: 'ajuizada',
 dataAjuizamento: new Date().toISOString()
 });
 } catch (error: any) {
 res.status(400).json({ error: error.message });
 }
});

export default router;

