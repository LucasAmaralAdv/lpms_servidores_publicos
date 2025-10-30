import express, { Router, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { authMiddleware, AuthRequest } from '../middleware';

const router = Router();
const prisma = new PrismaClient();

// Listar clientes
router.get('/', authMiddleware, async (req: AuthRequest, res: Response) => {
 try {
 const clientes = await prisma.cliente.findMany({
 where: {
 criadoPorId: req.userId
 },
 include: {
 processos: true,
 documentos: true
 },
 orderBy: {
 dataCadastro: 'desc'
 }
 });

 res.json(clientes);
 } catch (error: any) {
 res.status(500).json({ error: error.message });
 }
});

// Obter cliente por ID
router.get('/:id', authMiddleware, async (req: AuthRequest, res: Response) => {
 try {
 const { id } = req.params;

 const cliente = await prisma.cliente.findUnique({
 where: { id },
 include: {
 processos: {
 include: {
 prazos: true,
 andamentos: true
 }
 },
 documentos: true,
 comunicacoes: true,
 oportunidades: true
 }
 });

 if (!cliente) {
 return res.status(404).json({ error: 'Cliente nao encontrado' });
 }

 if (cliente.criadoPorId !== req.userId) {
 return res.status(403).json({ error: 'Acesso negado' });
 }

 res.json(cliente);
 } catch (error: any) {
 res.status(500).json({ error: error.message });
 }
});

// Criar cliente
router.post('/', authMiddleware, async (req: AuthRequest, res: Response) => {
 try {
 const {
 nome,
 cpf,
 rg,
 dataNascimento,
 estadoCivil,
 telefone,
 email,
 endereco,
 numero,
 complemento,
 bairro,
 cidade,
 estado,
 cep,
 orgaoTrabalho,
 cargo,
 matricula,
 dataAdmissao,
 dataPrevistAposentadoria,
 situacaoFuncional
 } = req.body;

 if (!nome || !cpf || !telefone || !email) {
 return res.status(400).json({ error: 'Nome, CPF, telefone e email sao obrigatorios' });
 }

 // Verificar se CPF ja existe
 const clienteExistente = await prisma.cliente.findUnique({
 where: { cpf }
 });

 if (clienteExistente) {
 return res.status(400).json({ error: 'Cliente com este CPF ja existe' });
 }

 const cliente = await prisma.cliente.create({
 data: {
 nome,
 cpf,
 rg,
 dataNascimento: dataNascimento ? new Date(dataNascimento) : null,
 estadoCivil,
 telefone,
 email,
 endereco,
 numero,
 complemento,
 bairro,
 cidade,
 estado,
 cep,
 orgaoTrabalho,
 cargo,
 matricula,
 dataAdmissao: dataAdmissao ? new Date(dataAdmissao) : null,
 dataPrevistAposentadoria: dataPrevistAposentadoria ? new Date(dataPrevistAposentadoria) : null,
 situacaoFuncional,
 criadoPorId: req.userId!
 }
 });

 res.status(201).json(cliente);
 } catch (error: any) {
 res.status(400).json({ error: error.message });
 }
});

// Atualizar cliente
router.put('/:id', authMiddleware, async (req: AuthRequest, res: Response) => {
 try {
 const { id } = req.params;

 // Verificar permissao
 const cliente = await prisma.cliente.findUnique({
 where: { id }
 });

 if (!cliente) {
 return res.status(404).json({ error: 'Cliente nao encontrado' });
 }

 if (cliente.criadoPorId !== req.userId) {
 return res.status(403).json({ error: 'Acesso negado' });
 }

 const clienteAtualizado = await prisma.cliente.update({
 where: { id },
 data: {
 ...req.body,
 dataNascimento: req.body.dataNascimento ? new Date(req.body.dataNascimento) : undefined,
 dataAdmissao: req.body.dataAdmissao ? new Date(req.body.dataAdmissao) : undefined,
 dataPrevistAposentadoria: req.body.dataPrevistAposentadoria ? new Date(req.body.dataPrevistAposentadoria) : undefined
 }
 });

 res.json(clienteAtualizado);
 } catch (error: any) {
 res.status(400).json({ error: error.message });
 }
});

// Deletar cliente
router.delete('/:id', authMiddleware, async (req: AuthRequest, res: Response) => {
 try {
 const { id } = req.params;

 // Verificar permissao
 const cliente = await prisma.cliente.findUnique({
 where: { id }
 });

 if (!cliente) {
 return res.status(404).json({ error: 'Cliente nao encontrado' });
 }

 if (cliente.criadoPorId !== req.userId) {
 return res.status(403).json({ error: 'Acesso negado' });
 }

 await prisma.cliente.delete({
 where: { id }
 });

 res.json({ message: 'Cliente deletado com sucesso' });
 } catch (error: any) {
 res.status(500).json({ error: error.message });
 }
});

export default router;
