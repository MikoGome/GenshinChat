"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
const path_1 = __importDefault(require("path"));
const apiRouter_js_1 = __importDefault(require("./routes/apiRouter.js"));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.static(__dirname + '/'));
app.use('/api', apiRouter_js_1.default);
app.get('/bundle.js', (req, res) => {
    return res.sendFile(path_1.default.join(__dirname, '../build', 'bundle.js'));
});
app.get('*', (req, res) => {
    return res.sendFile(path_1.default.join(__dirname, '../build', 'index.html'));
});
app.use((err, req, res, next) => {
    console.log(err);
});
app.listen(PORT, () => {
    console.log('server is listening to port ' + PORT);
});
