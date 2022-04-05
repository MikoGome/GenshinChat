import express from "express";
import { initialize } from "../controllers/accountController";

const router = express.Router();

router.get('/initialize', initialize, (req, res) => {
  return res.json(res.locals.possession);
});

export default router;