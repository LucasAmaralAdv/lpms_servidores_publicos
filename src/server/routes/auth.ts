import express, { Router, Request, Response } from 'express';
import { registerUser, loginUser } from '../auth';
import { authMiddleware, AuthRequest } from '../middleware';

const router = Router();

// Registrorouter.post('/register', async (req: Request, res: Response) => {
 try {
 const { email, password, name, role } = req.body;

 if (!email || !password || !name) {
 return res.status(400).json({ error: 'Email, senha e nome sao obrigatorios' });
 }

 const result = await registerUser(email, password, name, role);
 res.status(201).json(result);
 } catch (error: any) {
 res.status(400).json({ error: error.message });
 }
});

// Loginrouter.post('/login', async (req: Request, res: Response) => {
 try {
 const { email, password } = req.body;

 if (!email || !password) {
 return res.status(400).json({ error: 'Email e senha sao obrigatorios' });
 }

 const result = await loginUser(email, password);
 res.json(result);
 } catch (error: any) {
 res.status(401).json({ error: error.message });
 }
});

// Verificar autenticacaorouter.get('/me', authMiddleware, async (req: AuthRequest, res: Response) => {
 try {
 res.json(req.user);
 } catch (error: any) {
 res.status(500).json({ error: error.message });
 }
});

export default router;
