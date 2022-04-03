const express = require('express');
const router = express.Router();

import {characters} from '../controllers/characterController.js';
import {login, signup} from '../controllers/authController.js';
import {genSession, verifySession} from '../controllers/sessionController';

router.post('/login', login, genSession, (req, res) => {
  return res.json(res.locals.authenticated);
});

router.post('/signup', signup, (req, res) => {
  return res.json(res.locals.authenticated);
});

router.get('/character/:method', characters, (req, res) => {
  return res.json(res.locals.character);
});

router.get('/authenticate', verifySession, (req, res) => {
  return res.json(res.locals.authenticated);
});

export default router;