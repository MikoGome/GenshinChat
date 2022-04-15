import  express, {Request, Response} from 'express';
const router = express.Router();

import {wish, wishCheck, updateCharPool} from '../controllers/characterController';
import {login, signup, logout} from '../controllers/authController';
import {genSession, verifySession} from '../controllers/sessionController';

import accountRouter from './accountRouter';
import characterRouter from './characterRouter';
import friendsRouter from './friendsRouter';
import possessionRouter from './possessionRouter';

router.use('/account', accountRouter);
router.use('/character', characterRouter);
router.use('/friends', friendsRouter);
router.use('/possession', possessionRouter);

router.post('/login', login, genSession, (req:Request, res:Response) => {
  return res.json(res.locals.authenticated);
});

router.post('/signup', signup, (req:Request, res:Response) => {
  return res.json(res.locals.authenticated);
});

router.get('/logout', logout, (req, res) => {
  return res.json(true);
});

router.get('/authenticate', verifySession, (req:Request, res:Response) => {
  return res.json(res.locals);
});

router.patch('/wish', wishCheck, wish, updateCharPool, (req: Request, res: Response) => {
  return res.json(res.locals.updatedPossession);
});

export default router;