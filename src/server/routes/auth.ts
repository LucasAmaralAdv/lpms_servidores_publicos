import express, { Router, Request, Response } from 'express';
import { registerUser, loginUser } from '../auth';
import { authMiddleware, AuthRequest } from '../middleware';

const router = Router();

// Registro
router.post('/register', async (req: Request, res: Response) => {
  try {
    const { email, password, name, role } = req.body;

    if (!email || !password || !name) {
      return res.status(400).json({ error: 'Email, senha e nome são obrigatórios' });
    }

    const result = await registerUser(email, password, name, role);
    res.status(201).json(result);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

// Login
router.post('/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email e senha são obrigatórios' });
    }

    const result = await loginUser(email, password);
    res.json(result);
  } catch (error: any) {
    res.status(401).json({ error: error.message });
  }
});

// Verificar autenticação
router.get('/me', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    res.json(req.user);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
