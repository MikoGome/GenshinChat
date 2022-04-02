"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.signup = void 0;
const Users_js_1 = __importDefault(require("../models/Users.js"));
const AccountAssets_js_1 = require("../models/AccountAssets.js");
const bcrypt_1 = __importDefault(require("bcrypt"));
function hash(pass) {
    const workFactor = 10;
    return bcrypt_1.default.hash(pass, workFactor);
}
const signup = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, gender } = req.body;
    const password = yield hash(req.body.password);
    const starterChar = gender === 'male' ? 'aether' : 'lumine';
    const possession = yield AccountAssets_js_1.Possession.create({
        characters_owned: [{
                name: starterChar
            }]
    });
    const chat = yield AccountAssets_js_1.Chat.create({
        history: [],
    });
    const queryEntry = `
    INSERT INTO users(username, password, gender, posession, chat_history)
    VALUES($1, $2, $3, $4, $5)
  `;
    try {
        yield (0, Users_js_1.default)(queryEntry, [username, password, gender, possession.id, chat.id]);
    }
    catch (e) {
        yield Promise.all([AccountAssets_js_1.Possession.findByIdAndDelete(possession.id), AccountAssets_js_1.Chat.findByIdAndDelete(chat.id)]);
    }
    return next();
});
exports.signup = signup;
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    const queryEntry = `
    SELECT * FROM users
    WHERE username = $1
  `;
    try {
        const account = (yield (0, Users_js_1.default)(queryEntry, [username])).rows[0];
        let authenticated = false;
        if (account) {
            authenticated = yield bcrypt_1.default.compare(password, account.password);
        }
        res.locals.authenticated = authenticated;
        return next();
    }
    catch (e) {
        return next(e);
    }
});
exports.login = login;
