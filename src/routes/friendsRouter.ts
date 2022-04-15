import express, {Request, Response} from 'express';
import { getFriends, removeFriend } from '../controllers/friendsController';

const router = express.Router();

router.get('/:id', getFriends, (req: Request, res: Response) => {
  return res.json(res.locals.friends);
});

router.delete('/remove/', removeFriend, (req: Request, res: Response) => {
  return res.sendStatus(200);
});

export default router;