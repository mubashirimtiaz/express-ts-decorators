"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.controller = void 0;
var AppRouter_1 = require("../../AppRouter");
var MetadataKeysEnum_1 = require("./MetadataKeysEnum");
var bodyValidatorMW = function (keys) {
    return function (req, res, next) {
        if (!req.body) {
            res.status(402).send('Invalid request, No body');
            return;
        }
        for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
            var key = keys_1[_i];
            if (!req.body[key]) {
                res.status(402).send("Invalid request, ".concat(key, " is missing"));
                return;
            }
        }
        next();
    };
};
function controller(routePrefix) {
    if (routePrefix === void 0) { routePrefix = ''; }
    return function (target) {
        var _a;
        var router = AppRouter_1.AppRouter.getInstance();
        for (var key in target.prototype) {
            var routeHandler = (_a = target.prototype) === null || _a === void 0 ? void 0 : _a[key];
            var path = Reflect.getMetadata(MetadataKeysEnum_1.MetadataKey.path, target.prototype, key);
            var method = Reflect.getMetadata(MetadataKeysEnum_1.MetadataKey.method, target.prototype, key);
            var middlewares = Reflect.getMetadata(MetadataKeysEnum_1.MetadataKey.middleware, target.prototype, key) ||
                [];
            var requiredBodyProps = Reflect.getMetadata(MetadataKeysEnum_1.MetadataKey.validator, target.prototype, key) || [];
            var validator = bodyValidatorMW(requiredBodyProps);
            if (path && method) {
                router[method].apply(router, __spreadArray(__spreadArray(["".concat(routePrefix).concat(path)], middlewares, false), [validator,
                    routeHandler], false));
            }
        }
    };
}
exports.controller = controller;
