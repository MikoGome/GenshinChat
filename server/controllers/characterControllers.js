"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.characters = void 0;
const axios_1 = __importDefault(require("axios"));
const genshinCharacterUrl = 'https://api.genshin.dev/characters';
const characterCache = [];
const travelerCache = [];
axios_1.default.get(genshinCharacterUrl)
    .then(res => {
    res.data.forEach((el) => {
        if (el.startsWith('traveler')) {
            travelerCache.push(el);
        }
        else {
            characterCache.push(el);
        }
    });
});
const characters = (req, res, next) => {
    const characters = req.params.method === 'login' ? characterCache : travelerCache;
    const randomIndex = Math.floor(Math.random() * characters.length);
    res.locals.character = characters[randomIndex];
    next();
};
exports.characters = characters;
