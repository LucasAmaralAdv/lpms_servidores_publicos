import { Request, Response, NextFunction } from 'express';
import { verifyToken, getUserById } from './auth';

export interface AuthRequest extends Request {
  userId?: string;
  user?: any;
}

export async function authMiddleware(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Token não fornecido' });
    }

    const token = authHeader.substring(7);
    const decoded = verifyToken(token);

    if (!decoded) {
      return res.status(401).json({ error: 'Token inválido' });
    }

    req.userId = decoded.userId;
    req.user = await getUserById(decoded.userId);

    next();
  } catch (error) {
    res.status(401).json({ error: 'Erro na autenticação' });
  }
}

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  console.error('Erro:', err);

  if (err.message === 'Usuário já existe') {
    return res.status(400).json({ error: err.message });
  }

  if (err.message === 'Usuário não encontrado' || err.message === 'Senha inválida') {
    return res.status(401).json({ error: err.message });
  }

  res.status(500).json({ error: 'Erro interno do servidor' });
}
