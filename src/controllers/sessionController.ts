import jwt from 'jsonwebtoken';

import dotenv from 'dotenv';
dotenv.config();

const JWT_SECRET:string = <string>process.env.JWT_SECRET;

export const genSession = (req, res, next) => {
  res.cookie('GCToken', jwt.sign({id: res.locals.user_id, username: res.locals.username}, JWT_SECRET), {httpOnly: true});
  return next();
}

export const verifySession = async (req, res, next) => {
  let authenticated = false;
  try {
    await jwt.verify(req.cookies.GCToken, JWT_SECRET);
    authenticated = true;
  } catch(e) {
    
  }
  res.locals.authenticated = authenticated;
  return next();
}