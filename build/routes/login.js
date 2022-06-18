"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginRoutes = void 0;
var express_1 = require("express");
var login_1 = require("../controllers/login");
var loginRoutes = (0, express_1.Router)();
exports.loginRoutes = loginRoutes;
loginRoutes.route('/login').get(login_1.getLogin).post(login_1.postLogin);
loginRoutes.route('/logout').get(login_1.logout);
