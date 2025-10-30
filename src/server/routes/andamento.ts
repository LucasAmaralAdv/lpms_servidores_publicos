import express, { Router, Request, Response } from 'express';
import { buscarProcessoTJDFT, buscarProcessosPorCPF, gerarResumoAndamento } from '../services/tjdftService';

const router = Router();

// Consultar processo por numerorouter.get('/processo/:numeroProcesso', async (req: Request, res: Response) => {
 try {
 const { numeroProcesso } = req.params;

 if (!numeroProcesso) {
 return res.status(400).json({ error: 'Numero do processo e obrigatorio' });
 }

 const processo = await buscarProcessoTJDFT(numeroProcesso);

 if (!processo) {
 return res.status(404).json({ error: 'Processo nao encontrado' });
 }

 // Gerar resumo humanizado
 const resumo = await gerarResumoAndamento(processo);

 res.json({
 ...processo,
 resumoIA: resumo
 });
 } catch (error: any) {
 res.status(500).json({ error: error.message });
 }
});

// Consultar processos por CPFrouter.get('/cpf/:cpf', async (req: Request, res: Response) => {
 try {
 const { cpf } = req.params;

 if (!cpf) {
 return res.status(400).json({ error: 'CPF e obrigatorio' });
 }

 const processos = await buscarProcessosPorCPF(cpf);

 if (processos.length === 0) {
 return res.status(404).json({ error: 'Nenhum processo encontrado para este CPF' });
 }

 // Gerar resumos para cada processo
 const processosComResumo = await Promise.all(
 processos.map(async (processo) => ({
 ...processo,
 resumoIA: await gerarResumoAndamento(processo)
 }))
 );

 res.json(processosComResumo);
 } catch (error: any) {
 res.status(500).json({ error: error.message });
 }
});

export default router;
