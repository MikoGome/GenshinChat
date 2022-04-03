"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const router = express.Router();
const characterController_js_1 = require("../controllers/characterController.js");
const authController_js_1 = require("../controllers/authController.js");
const sessionController_1 = require("../controllers/sessionController");
router.post('/login', authController_js_1.login, sessionController_1.genSession, (req, res) => {
    return res.json(res.locals.authenticated);
});
router.post('/signup', authController_js_1.signup, (req, res) => {
    return res.json(res.locals.authenticated);
});
router.get('/character/:method', characterController_js_1.characters, (req, res) => {
    return res.json(res.locals.character);
});
router.get('/authenticate', sessionController_1.verifySession, (req, res) => {
    return res.json(res.locals.authenticated);
});
exports.default = router;
