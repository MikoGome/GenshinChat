import  express, {Request, Response} from 'express';
const router = express.Router();

import {characters} from '../controllers/characterController';
import {login, signup} from '../controllers/authController';
import {genSession, verifySession} from '../controllers/sessionController';

router.post('/login', login, genSession, (req:Request, res:Response) => {
  return res.json(res.locals.authenticated);
});

router.post('/signup', signup, (req:Request, res:Response) => {
  return res.json(res.locals.authenticated);
});

router.get('/character/:method', characters, (req:Request, res:Response) => {
  return res.json(res.locals.character);
});

router.get('/authenticate', verifySession, (req:Request, res:Response) => {
  return res.json(res.locals);
});

export default router;