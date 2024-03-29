import axios from 'axios';
import { Possession } from '../models/AccountAssets';
import {Request, Response, NextFunction} from 'express';
const genshinCharacterUrl:string = 'https://genshin.jmp.blue/characters';

const characterCache:string[] = [];
const travelerCache:[string] = ['traveler-anemo'];
const allCache: string[] = ['traveler-anemo'];
let characterAmount = 1;
export const characterInfoCache:any = {};

axios.get(genshinCharacterUrl)
  .then(res => {
    res.data.forEach((el:string):void => {
      if(!el.startsWith('traveler')) {
        characterCache.push(el);
        allCache.push(el);
        characterAmount++;
      }
    });
  })
  .then(() => {
    allCache.forEach(el => {
      axios.get(genshinCharacterUrl + '/' + el)
        .then(res => characterInfoCache[el] = res.data);
    });
  })


export const characters = (req:Request, res:Response, next:NextFunction) => {
  const characters = req.params.method === 'login' ? characterCache : travelerCache;
  const randomIndex = Math.floor(Math.random() * characters.length);
  res.locals.character = characters[randomIndex];
  return next();
}

export const wish = (req: Request, res:Response, next:NextFunction) => {
  const ownedChars = req.body.characters_owned;
  let fresh = false;
  while(!fresh && ownedChars.length < characterCache.length + 1) {
    fresh = true;
    const randomIndex = Math.floor(Math.random() * characterCache.length);
    const prize = characterCache[randomIndex];
    res.locals.prize = prize;
    if(ownedChars.some((el:string) => el === prize)) fresh = false;
    else ownedChars.push(prize);
  }
  res.locals.charPool = ownedChars
    .sort((a:string,b:string) => { //alphabetized
      if(a.startsWith('traveler')) return -1;
      else if(b.startsWith('traveler')) return 1;
      else if(a < b) return -1;
      else if(b < a) return 1;
      else return 0;
    });
  return next();
}

export const updateCharPool = async (req: Request, res: Response, next: NextFunction) => {
  const {possession} = req.body;
  const {characters_owned, wishes} = 
    await Possession.findByIdAndUpdate(
      possession, 
      {characters_owned: res.locals.charPool, 
      wishes: {amount: res.locals.updatedWishAmount, progress: res.locals.progress}}, 
      {new: true}
    );
  res.locals.updatedPossession = {characters_owned, wishes};
  return next();
}

export const wishCheck = (req: Request, res: Response, next: NextFunction) => {
  const {wishes} = req.body;
  if(wishes.amount - 1 >= 0) {
    res.locals.updatedWishAmount = wishes.amount - 1;
    res.locals.progress = wishes.progress;
    return next();
  }
  return res.json('Not Enough Mora');
}

export const characterInfo = (req: Request, res: Response, next: NextFunction) => {
  res.locals.characterInfo = {info: characterInfoCache, amount: characterAmount};
  return next();
}

export const allCharacters = (req: Request , res: Response, next: NextFunction) => {
  res.locals.allCharacters = allCache;
  return next();
}
