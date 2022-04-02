const axios = require('axios');

const genshinCharacterUrl = 'https://api.genshin.dev/characters';

const characterCache = [];
const travelerCache = [];

axios.get(genshinCharacterUrl)
  .then(res => {
    res.data.forEach((el) => {
      if(el.startsWith('traveler')) {
        travelerCache.push(el);
      } else {
        characterCache.push(el);
      }
    });
  });

module.exports = {
  characters(req, res, next) {
    const characters = req.params.method === 'login' ? characterCache : travelerCache;
    const randomIndex = Math.floor(Math.random() * characters.length);
    res.locals.character = characters[randomIndex];
    next();
  }
}