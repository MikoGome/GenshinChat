import query from '../models/Users';
import {Possession}from '../models/AccountAssets';
import bcrypt from 'bcrypt';

import {Request, Response, NextFunction} from 'express';

function hash(pass:string):Promise<string> {
  const workFactor = 10;
  return bcrypt.hash(pass, workFactor);
}

export const signup = async (req:Request, res:Response, next:NextFunction) => {
  const {username, gender} = req.body;
  const password = await hash(req.body.password);
  const starterChar:string = 'traveler-anemo';
  const possession = await Possession.create({
    characters_owned: [starterChar]
  });
  const queryEntry:string = `
    INSERT INTO users(username, password, gender, possession)
    VALUES($1, $2, $3, $4)
  `
  let authenticated:boolean = false;
  try {
    await query(queryEntry, [username, password, gender, possession.id]);
    authenticated = true;
  } catch(e:any) {
    await Possession.findByIdAndDelete(possession.id);
    if(e.constraint === 'users_username_key') {
      return res.json({message: 'Adventurer Already Exists'});
    } else {
      return res.json({message: 'An Error Has Occured'});
    }
  }
  res.locals.authenticated = 'signedUp';
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
    if(account) {
      authenticated = await bcrypt.compare(password, account.password);
      if(!authenticated) return res.json({message: 'Password Is Incorrect'});
      else if(account.online) return res.json({message: 'Adventurer Is Already Signed In'});
      res.locals.user_id = account.id;
      res.locals.username = account.username;
      res.locals.gender = account.gender;
      res.locals.possession = account.possession;
    } else {
      return res.json({message: 'Adventurer Not Found'});
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
  