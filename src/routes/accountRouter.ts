import express, {Request, Response} from "express";
import { initialize, wishIncrement } from "../controllers/accountController";

const router = express.Router();

router.get('/initialize', initialize, (req: Request, res: Response) => {
  return res.json(res.locals.possession);
});

router.post('/wishing', wishIncrement, (req: Request, res: Response) => {
  return res.json(res.locals.newWishes);
});

export default router;