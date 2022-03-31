const express = require('express');
const router = express.Router();

const characterControllers = require('../controllers/characterControllers.js');

router.post('/login', (req, res) => {
  const {username, password} = req.body;
  console.log(username, password)
  return res.json({username, password});
});

router.post('/signup', (req, res) => {
  console.log('signup');
});

router.get('/character', characterControllers.characters, (req, res) => {
  return res.json(res.locals.character);
});

module.exports = router;