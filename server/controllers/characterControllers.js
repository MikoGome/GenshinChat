const axios = require('axios');

const genshinCharacterUrl = 'https://api.genshin.dev/characters';

let characterCache = axios.get(genshinCharacterUrl)
  .then(res => characterCache = res.data);

module.exports = {
  characters(req, res, next) {
    const randomIndex = Math.floor(Math.random() * characterCache.length);
    res.locals.character = characterCache[randomIndex];
    next();
  }
}