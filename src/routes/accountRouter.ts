import express, {Request, Response} from "express";
import { initialize, wishIncrement, updateMain } from "../controllers/accountController";

const router = express.Router();

router.get('/initialize', initialize, (req: Request, res: Response) => {
  return res.json(res.locals.possession);
});

router.patch('/wishing', wishIncrement, (req: Request, res: Response) => {
  return res.json(res.locals.newWishes);
});

router.patch('/main', updateMain, (req: Request, res: Response) => {
  return res.json(res.locals.main);
});

export default router;