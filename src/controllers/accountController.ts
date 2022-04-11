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
    console.log(e);
  }
  return next();
}

export const wishIncrement = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {possession} = req.body;
    const {wishes} = await Possession.findById(possession);
    
    wishes.progress += 1;
    if(wishes.progress === 100) {
      wishes.amount += 1;
      wishes.progress = 0;
    }
    const {wishes: newWishes} = await Possession.findByIdAndUpdate(possession, {wishes: {...wishes}}, {new:true});
    res.locals.newWishes = newWishes;
    return next();
  } catch(e) {
    console.log(e);
  }
}