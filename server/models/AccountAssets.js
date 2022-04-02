"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Chat = exports.Possession = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
mongoose_1.default.connect(process.env.MONGO_DB_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(() => console.log('MongoDB failed to connect'));
const possessionSchema = new mongoose_1.default.Schema({
    mora: {
        type: Number,
        default: 0,
    },
    wishes: {
        amount: {
            type: Number,
            default: 0
        },
        progress: {
            type: Number,
            default: 0
        }
    },
    main: String,
    characters_owned: [{
            name: {
                type: String,
                required: true
            }
        }]
});
exports.Possession = mongoose_1.default.model('possession', possessionSchema);
const chatSchema = new mongoose_1.default.Schema({
    history: [{
            room: {
                participants: [{
                        user_id: {
                            type: Number,
                            required: true
                        },
                        user_name: {
                            type: String,
                            required: true
                        },
                        main: String
                    }],
            },
            chat: [{
                    user_name: String,
                    main: String,
                    message: String
                }]
        }]
});
exports.Chat = mongoose_1.default.model('chat', chatSchema);
