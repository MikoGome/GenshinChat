import {Request, Response, NextFunction} from 'express';
import jwt from 'jsonwebtoken';
import { Possession } from '../models/AccountAssets';

interface tokenShape {
  id: string,
  name: string,
  gender: string,
  possession: string,
  iat: number
}

export const initialize = async (req:Request, res:Response, next:NextFunction) => {
  try {
    const account: tokenShape | null = <tokenShape|null>jwt.decode(req.cookies.GCToken);
    if(account) {
      const possession = await Possession.findById(account.possession);
      res.locals.possession = possession;
    }
  } catch (e){

  }
  return next();
}