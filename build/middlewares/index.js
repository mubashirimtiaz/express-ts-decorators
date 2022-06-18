"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAuth = void 0;
var requireAuth = function (req, res, next) {
    if (req.session && req.session.loggedIn) {
        return next();
    }
    else {
        res.status(403).send('Not permitted');
    }
};
exports.requireAuth = requireAuth;
