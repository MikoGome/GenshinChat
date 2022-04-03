import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

import dotenv from 'dotenv';
dotenv.config();

const JWT_SECRET:string = <string>process.env.JWT_SECRET;

export const genSession = (req:Request, res:Response, next:NextFunction) => {
  res.cookie('GCToken', jwt.sign({id: res.locals.user_id, name: res.locals.username}, JWT_SECRET), {httpOnly: true});
  return next();
}

export const verifySession = async (req:Request, res:Response, next:NextFunction) => {
  let authenticated = false;
  try {
    res.locals.account = await jwt.verify(req.cookies.GCToken, JWT_SECRET);
    authenticated = true;
  } catch(e) {
    
  }
  res.locals.authenticated = authenticated;
  return next();
}