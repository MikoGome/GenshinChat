"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = __importDefault(require("pg"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const pool = new pg_1.default.Pool({
    connectionString: process.env.PG_URI
});
pool.connect()
    .then(() => console.log('PostgreSQL database connected'))
    .catch(() => console.log('PostgreSQL database failed to connect'));
function default_1(text, params, callback) {
    return pool.query(text, params, callback);
}
exports.default = default_1;
;
