import {Request, Response, NextFunction} from 'express';
import query from '../models/Users';

export const getFriends = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;
  const queryString = `
  SELECT id, username, gender, possession FROM users
  INNER JOIN friendship
  ON friend_a = users.id OR friend_b = users.id
  WHERE NOT users.id = $1 AND (friend_a = $1 OR friend_b = $1)
  `
  const result:any = await query(queryString, [id]);
  res.locals.friends = result.rows;
  return next();
};

export const removeFriend = async (req: Request, res: Response, next: NextFunction) => {
  const {remove, account} = req.query;
  const queryString = `
  DELETE FROM friendship
  WHERE (friend_a=$1 AND friend_b=$2) OR (friend_a=$2 AND friend_b=$1)
  `
  await query(queryString, [remove, account])
  return next();
};