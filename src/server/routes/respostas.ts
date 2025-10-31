import express, { Router, Response } from 'express';
import { authMiddleware, AuthRequest } from '../middleware';

const router = Router();

const respostasTemplate = {
 andamento: `Prezado(a) [CLIENTE],

Obrigado por entrar em contato conosco.

Sobre o andamento do seu processo n [PROCESSO]:

O processo encontra-se em fase de [FASE]. O ultimo andamento foi registrado em [DATA], quando [EVENTO].

O proximo prazo importante e em [PROXIMO_PRAZO], quando [ACAO].

Continuamos acompanhando seu caso com atencao e o manteremos informado sobre qualquer desenvolvimento importante.

Qualquer duvida, nao hesite em entrar em contato.

Atenciosamente,
Equipe Juridica`,

 documentos: `Prezado(a) [CLIENTE],

Obrigado por sua pergunta.

Os documentos necessarios para seu caso sao:

1. [DOC1]
2. [DOC2]
3. [DOC3]

Por favor, envie-nos esses documentos assim que possivel para que possamos prosseguir com seu processo.

Caso tenha duvidas sobre como obter esses documentos, estamos a disposicao para ajuda-lo.

Atenciosamente,
Equipe Juridica`,

 prazos: `Prezado(a) [CLIENTE],

Obrigado por entrar em contato.

Os prazos importantes do seu processo sao:

- [PRAZO1]: [DESCRICAO1]
- [PRAZO2]: [DESCRICAO2]
- [PRAZO3]: [DESCRICAO3]

Estamos acompanhando todos esses prazos para garantir que nenhum seja perdido.

Atenciosamente,
Equipe Juridica`,

 honorarios: `Prezado(a) [CLIENTE],

Obrigado por sua pergunta sobre os honorarios.

Conforme contrato assinado entre as partes, os honorarios sao:

[DETALHES_HONORARIOS]

O pagamento pode ser realizado em [FORMAS_PAGAMENTO].

Caso tenha duvidas, estamos a disposicao.

Atenciosamente,
Equipe Juridica`,

 outro: `Prezado(a) [CLIENTE],

Obrigado por entrar em contato conosco.

[RESPOSTA_PERSONALIZADA]

Caso tenha outras duvidas, nao hesite em nos contatar.

Atenciosamente,
Equipe Juridica`
};

// Gerar resposta
router.post('/gerar', authMiddleware, async (req: AuthRequest, res: Response) => {
 try {
 const { cliente, pergunta, tipo, canalEnvio } = req.body;

 if (!cliente || !pergunta || !tipo) {
 return res.status(400).json({ error: 'Campos obrigatorios nao preenchidos' });
 }

 const template = (respostasTemplate as any)[tipo] || respostasTemplate.outro;
 const resposta = template
 .replace('[CLIENTE]', cliente)
 .replace('[PROCESSO]', '#001')
 .replace('[FASE]', 'julgamento')
 .replace('[DATA]', new Date().toLocaleDateString('pt-BR'))
 .replace('[EVENTO]', 'foi proferida sentenca')
 .replace('[PROXIMO_PRAZO]', '15/11/2025')
 .replace('[ACAO]', 'vence prazo para recurso');

 res.json({
 id: Math.random().toString(36).substr(2, 9),
 cliente,
 pergunta,
 tipo,
 canalEnvio,
 resposta,
 status: 'gerada',
 dataCriacao: new Date().toISOString()
 });
 } catch (error: any) {
 res.status(400).json({ error: error.message });
 }
});

// Enviar resposta
router.post('/enviar', authMiddleware, async (req: AuthRequest, res: Response) => {
 try {
 const { cliente, resposta, canalEnvio, numeroWhatsapp } = req.body;

 if (!cliente || !resposta || !canalEnvio) {
 return res.status(400).json({ error: 'Dados obrigatorios nao preenchidos' });
 }

 // Simular envio
 const resultado = {
 id: Math.random().toString(36).substr(2, 9),
 cliente,
 canalEnvio,
 status: 'enviada',
 dataEnvio: new Date().toISOString(),
 mensagem: `Resposta enviada com sucesso via ${canalEnvio.toUpperCase()}`
 };

 res.json(resultado);
 } catch (error: any) {
 res.status(400).json({ error: error.message });
 }
});

// Listar respostas
router.get('/', authMiddleware, async (req: AuthRequest, res: Response) => {
 try {
 const { status } = req.query;

 const respostas = [
 {
 id: '1',
 cliente: 'Joao Silva',
 pergunta: 'Como esta o andamento do meu processo?',
 tipo: 'andamento',
 canalEnvio: 'whatsapp',
 status: 'enviada',
 dataCriacao: '28/10/2025'
 },
 {
 id: '2',
 cliente: 'Maria Santos',
 pergunta: 'Quais documentos preciso enviar?',
 tipo: 'documentos',
 canalEnvio: 'email',
 status: 'enviada',
 dataCriacao: '27/10/2025'
 }
 ];

 const filtradas = status
 ? respostas.filter(r => r.status === status)
 : respostas;

 res.json(filtradas);
 } catch (error: any) {
 res.status(500).json({ error: error.message });
 }
});

// Obter resposta especifica
router.get('/:id', authMiddleware, async (req: AuthRequest, res: Response) => {
 try {
 const { id } = req.params;

 const resposta = {
 id,
 cliente: 'Joao Silva',
 pergunta: 'Como esta o andamento do meu processo?',
 resposta: 'Seu processo esta em fase de julgamento...',
 tipo: 'andamento',
 canalEnvio: 'whatsapp',
 status: 'enviada',
 dataCriacao: '28/10/2025'
 };

 res.json(resposta);
 } catch (error: any) {
 res.status(500).json({ error: error.message });
 }
});

// Atualizar resposta
router.put('/:id', authMiddleware, async (req: AuthRequest, res: Response) => {
 try {
 const { id } = req.params;
 const { resposta, status } = req.body;

 res.json({
 id,
 resposta,
 status,
 dataAtualizacao: new Date().toISOString()
 });
 } catch (error: any) {
 res.status(400).json({ error: error.message });
 }
});

// Deletar resposta
router.delete('/:id', authMiddleware, async (req: AuthRequest, res: Response) => {
 try {
 const { id } = req.params;

 res.json({ message: `Resposta ${id} deletada com sucesso` });
 } catch (error: any) {
 res.status(400).json({ error: error.message });
 }
});

export default router;

