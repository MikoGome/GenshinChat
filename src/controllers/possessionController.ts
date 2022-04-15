import {Request, Response, NextFunction} from 'express';
import { Possession } from '../models/AccountAssets';

export const getPossession = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;
  const possession = await Possession.findById(id);
  res.locals.possession = possession;
  return next();
};