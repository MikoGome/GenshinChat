const express = require('express');
const router = express.Router();

import * as characterController from '../controllers/characterController.js';
import * as authController from '../controllers/authController.js';

router.post('/login', authController.login, (req, res) => {
  return res.json(res.locals.authenticated ? 'success' : 'failed');
});

router.post('/signup', authController.signup, (req, res) => {
  return res.json(res.locals.authenticated ? 'success' : 'failed');
});

router.get('/character/:method', characterController.characters, (req, res) => {
  return res.json(res.locals.character);
});

export default router;