import query from '../models/Users.js';
import {Possession, Chat}from '../models/AccountAssets.js';
import bcrypt from 'bcrypt';

function hash(pass:string):Promise<string> {
  const workFactor = 10;
  return bcrypt.hash(pass, workFactor);
}

export const signup = async (req, res, next) => {
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
    INSERT INTO users(username, password, gender, posession, chat_history)
    VALUES($1, $2, $3, $4, $5)
  `
  let authenticated = false;
  try {
    await query(queryEntry, [username, password, gender, possession.id, chat.id]);
    authenticated = true;
  } catch(e) {
    await Promise.all([Possession.findByIdAndDelete(possession.id), Chat.findByIdAndDelete(chat.id)]);
  }
  res.locals.authenticated = authenticated;
  return next();
}

export const login = async (req, res, next) => {
  const {username, password} = req.body;
  const queryEntry:string = `
    SELECT * FROM users
    WHERE username = $1
  `

  try {
    const account = (await query(queryEntry, [username])).rows[0];
    let authenticated = false;
    if(account) {
      authenticated = await bcrypt.compare(password, account.password);
    }
    res.locals.authenticated = authenticated;
    return next();
  } catch(e) {
    return next(e);
  }
}
  