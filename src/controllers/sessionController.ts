import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import query from '../models/Users';
dotenv.config();

const JWT_SECRET:string = <string>process.env.JWT_SECRET;

export let activeSessions: {[name: string]: boolean} = {};

export const genSession = (req:Request, res:Response, next:NextFunction) => {
  const payload = {
    id: res.locals.user_id, 
    name: res.locals.username, 
    gender: res.locals.gender,
    possession: res.locals.possession
  };
  const expireTime:number = 6 * 60 * 60 * 1000; // 6 hours
  if(res.locals.authenticated) {
    res.cookie('GCToken', jwt.sign(payload, JWT_SECRET, {expiresIn: '6h'}), {httpOnly: true, maxAge: expireTime});
  }
  return next();
}

export const verifySession = async (req:Request, res:Response, next:NextFunction) => {
  let authenticated:boolean|string = false;
  try {
    res.locals.account = await jwt.verify(req.cookies.GCToken, JWT_SECRET);
    const name:string = res.locals.account.name;
    if(name in activeSessions) {
      try {
        const queryEntry:string = `
          SELECT username
          FROM users
          WHERE online = true
        `
        const result = await query(queryEntry);
        const exists = Boolean(result.rows.find((el:{username:string}) => el.username === name));
        if(exists) authenticated = 'exists';
        else {
          authenticated = true;
          activeSessions = result.rows.reduce((acc:{[name:string]:boolean}, curr:{username:string}) => {
            acc[curr.username] = true;
            return acc;
          }, {})
        }
      } catch(e) {
        console.log('e', e);
      }
    } else {
      activeSessions[name] = true;
      authenticated = true;
    }
  } catch(e) {
    console.log(e);
  }
  res.locals.authenticated = authenticated;
  return next();
}