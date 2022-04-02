import axios from 'axios';

const genshinCharacterUrl:string = 'https://api.genshin.dev/characters';

const characterCache:string[] = [];
const travelerCache:string[] = [];

axios.get(genshinCharacterUrl)
  .then(res => {
    res.data.forEach((el:string):void => {
      if(el.startsWith('traveler')) {
        travelerCache.push(el);
      } else {
        characterCache.push(el);
      }
    });
  });


export const characters = (req, res, next) => {
    const characters = req.params.method === 'login' ? characterCache : travelerCache;
    const randomIndex = Math.floor(Math.random() * characters.length);
    res.locals.character = characters[randomIndex];
    return next();
  }