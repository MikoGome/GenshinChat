import query from '../models/Users';
import {Possession, Chat}from '../models/AccountAssets';
import bcrypt from 'bcrypt';

import {Request, Response, NextFunction} from 'express';

function hash(pass:string):Promise<string> {
  const workFactor = 10;
  return bcrypt.hash(pass, workFactor);
}

export const signup = async (req:Request, res:Response, next:NextFunction) => {
  const {username, gender} = req.body;
  const password = await hash(req.body.password);
  const starterChar:string = gender === 'male'? 'aether' : 'lumine';
  const possession = await Possession.create({
    characters_owned: [{
      name: starterChar
    }]
  });
  const chat = await Chat.create({
    history: [],
  });
  const queryEntry:string = `
    INSERT INTO users(username, password, gender, possession, chat_history)
    VALUES($1, $2, $3, $4, $5)
  `
  let authenticated:boolean = false;
  try {
    await query(queryEntry, [username, password, gender, possession.id, chat.id]);
    authenticated = true;
  } catch(e) {
    await Promise.all([Possession.findByIdAndDelete(possession.id), Chat.findByIdAndDelete(chat.id)]);
  }
  res.locals.authenticated = authenticated;
  return next();
}

export const login = async (req:Request, res:Response, next:NextFunction) => {
  const {username, password} = req.body;
  const queryEntry:string = `
    SELECT * FROM users
    WHERE username = $1
  `

  try {
    const record:any = await query(queryEntry, [username]);
    const account = record.rows[0];
    let authenticated = false;
    console.log('account', account);
    if(account) {
      authenticated = await bcrypt.compare(password, account.password);
      if(authenticated) {
        res.locals.user_id = account.id;
        res.locals.username = account.username;
        res.locals.gender = account.gender;
        res.locals.possession = account.possession;
      }
    }
    res.locals.authenticated = authenticated;
    return next();
  } catch(e) {
    return next(e);
  }
}

export const logout = (req: Request, res: Response, next: NextFunction) => {
  res.cookie('GCToken', '', {maxAge: 0});
  return next();
}
  