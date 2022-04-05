import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

import dotenv from 'dotenv';
dotenv.config();

const JWT_SECRET:string = <string>process.env.JWT_SECRET;

export const genSession = (req:Request, res:Response, next:NextFunction) => {
  const payload = {
    id: res.locals.user_id, 
    name: res.locals.username, 
    gender: res.locals.gender,
    possession: res.locals.possession
  };
  const expireTime = 6 * 60 * 60 * 1000; // 6 hours
  res.cookie('GCToken', jwt.sign(payload, JWT_SECRET, {expiresIn: '6h'}), {httpOnly: true, maxAge: expireTime});
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