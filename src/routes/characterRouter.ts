import express, {Request, Response} from 'express';
const router = express.Router();

import {characterInfo, characters} from '../controllers/characterController';

router.get('/info', characterInfo, (req: Request, res: Response) => {
  return res.json(res.locals.characterInfo);
});

router.get('/:method', characters, (req:Request, res:Response) => {
  return res.json(res.locals.character);
});

export default router;
