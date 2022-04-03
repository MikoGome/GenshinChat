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
exports.verifySession = exports.genSession = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const JWT_SECRET = process.env.JWT_SECRET;
const genSession = (req, res, next) => {
    res.cookie('GCToken', jsonwebtoken_1.default.sign({ id: res.locals.user_id, username: res.locals.username }, JWT_SECRET), { httpOnly: true });
    return next();
};
exports.genSession = genSession;
const verifySession = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let authenticated = false;
    try {
        yield jsonwebtoken_1.default.verify(req.cookies.GCToken, JWT_SECRET);
        authenticated = true;
    }
    catch (e) {
    }
    res.locals.authenticated = authenticated;
    return next();
});
exports.verifySession = verifySession;
