const express = require('express');
const router = express.Router();

const characterControllers = require('../controllers/characterControllers.js');

router.post('/login', (req, res) => {
  const {username, password} = req.body;
  return res.json({username, password});
});

router.post('/signup', (req, res) => {
  const {username, password, gender} = req.body;
  return res.json({username, password, gender});
});

router.get('/character/:method', characterControllers.characters, (req, res) => {
  return res.json(res.locals.character);
});

module.exports = router;