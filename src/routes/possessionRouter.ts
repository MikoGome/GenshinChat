import express, {Request, Response} from 'express';
import { getPossession } from '../controllers/possessionController';

const router = express.Router();

router.get('/:id', getPossession, (req: Request, res: Response) => {
  return res.json(res.locals.possession);
});

export default router;