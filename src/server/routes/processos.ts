import express, { Router, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { authMiddleware, AuthRequest } from '../middleware';

const router = Router();
const prisma = new PrismaClient();

// Listar processos
router.get('/', authMiddleware, async (req: AuthRequest, res: Response) => {
 try {
 const processos = await prisma.processo.findMany({
 where: {
 criadoPorId: req.userId
 },
 include: {
 cliente: true,
 prazos: true,
 andamentos: true
 },
 orderBy: {
 dataCriacao: 'desc'
 }
 });

 res.json(processos);
 } catch (error: any) {
 res.status(500).json({ error: error.message });
 }
});

// Obter processo por ID
router.get('/:id', authMiddleware, async (req: AuthRequest, res: Response) => {
 try {
 const { id } = req.params;

 const processo = await prisma.processo.findUnique({
 where: { id },
 include: {
 cliente: true,
 prazos: true,
 peticiones: true,
 tarefas: true,
 andamentos: true
 }
 });

 if (!processo) {
 return res.status(404).json({ error: 'Processo nao encontrado' });
 }

 if (processo.criadoPorId !== req.userId) {
 return res.status(403).json({ error: 'Acesso negado' });
 }

 res.json(processo);
 } catch (error: any) {
 res.status(500).json({ error: error.message });
 }
});

// Criar processo
router.post('/', authMiddleware, async (req: AuthRequest, res: Response) => {
 try {
 const {
 numeroProcesso,
 clienteId,
 tese,
 descricao,
 dataAjuizamento,
 statusProcesso,
 tribunal,
 juizado,
 numeroJuizado,
 proximoPrazo,
 descricaoPrazo,
 dataVencimentoPrazo,
 dependenciaCliente,
 dependenciaSecretaria,
 valorCausaEstimado,
 valorSentenca
 } = req.body;

 if (!numeroProcesso || !clienteId || !tese || !dataAjuizamento) {
 return res.status(400).json({ error: 'Campos obrigatorios nao preenchidos' });
 }

 // Verificar se cliente existe e pertence ao usuario
 const cliente = await prisma.cliente.findUnique({
 where: { id: clienteId }
 });

 if (!cliente || cliente.criadoPorId !== req.userId) {
 return res.status(403).json({ error: 'Cliente nao encontrado ou acesso negado' });
 }

 const processo = await prisma.processo.create({
 data: {
 numeroProcesso,
 clienteId,
 tese,
 descricao,
 dataAjuizamento: new Date(dataAjuizamento),
 statusProcesso: statusProcesso || 'ativo',
 tribunal,
 juizado,
 numeroJuizado,
 proximoPrazo: proximoPrazo ? new Date(proximoPrazo) : null,
 descricaoPrazo,
 dataVencimentoPrazo: dataVencimentoPrazo ? new Date(dataVencimentoPrazo) : null,
 dependenciaCliente,
 dependenciaSecretaria,
 valorCausaEstimado,
 valorSentenca,
 criadoPorId: req.userId!
 }
 });

 res.status(201).json(processo);
 } catch (error: any) {
 res.status(400).json({ error: error.message });
 }
});

// Atualizar processo
router.put('/:id', authMiddleware, async (req: AuthRequest, res: Response) => {
 try {
 const { id } = req.params;

 // Verificar permissao
 const processo = await prisma.processo.findUnique({
 where: { id }
 });

 if (!processo) {
 return res.status(404).json({ error: 'Processo nao encontrado' });
 }

 if (processo.criadoPorId !== req.userId) {
 return res.status(403).json({ error: 'Acesso negado' });
 }

 const processoAtualizado = await prisma.processo.update({
 where: { id },
 data: {
 ...req.body,
 dataAjuizamento: req.body.dataAjuizamento ? new Date(req.body.dataAjuizamento) : undefined,
 proximoPrazo: req.body.proximoPrazo ? new Date(req.body.proximoPrazo) : undefined,
 dataVencimentoPrazo: req.body.dataVencimentoPrazo ? new Date(req.body.dataVencimentoPrazo) : undefined
 }
 });

 res.json(processoAtualizado);
 } catch (error: any) {
 res.status(400).json({ error: error.message });
 }
});

// Deletar processo
router.delete('/:id', authMiddleware, async (req: AuthRequest, res: Response) => {
 try {
 const { id } = req.params;

 // Verificar permissao
 const processo = await prisma.processo.findUnique({
 where: { id }
 });

 if (!processo) {
 return res.status(404).json({ error: 'Processo nao encontrado' });
 }

 if (processo.criadoPorId !== req.userId) {
 return res.status(403).json({ error: 'Acesso negado' });
 }

 await prisma.processo.delete({
 where: { id }
 });

 res.json({ message: 'Processo deletado com sucesso' });
 } catch (error: any) {
 res.status(500).json({ error: error.message });
 }
});

export default router;
