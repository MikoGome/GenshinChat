import express, {Request, Response} from 'express';
import { getFriends } from '../controllers/friendsController';

const router = express.Router();

router.get('/:id', getFriends, (req: Request, res: Response) => {
  return res.json(res.locals.friends);
});

export default router;