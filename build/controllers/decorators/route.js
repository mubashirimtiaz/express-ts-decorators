"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.patch = exports.dlt = exports.post = exports.put = exports.get = void 0;
require("reflect-metadata");
var MetadataKeysEnum_1 = require("./MetadataKeysEnum");
var MethodsEnum_1 = require("./MethodsEnum");
function routerBinder(method) {
    return function (path) {
        if (path === void 0) { path = ''; }
        return function (target, key, desc) {
            Reflect.defineMetadata(MetadataKeysEnum_1.MetadataKey.path, path, target, key);
            Reflect.defineMetadata(MetadataKeysEnum_1.MetadataKey.method, method, target, key);
        };
    };
}
exports.get = routerBinder(MethodsEnum_1.Methods.get);
exports.put = routerBinder(MethodsEnum_1.Methods.put);
exports.post = routerBinder(MethodsEnum_1.Methods.post);
exports.dlt = routerBinder(MethodsEnum_1.Methods.delete);
exports.patch = routerBinder(MethodsEnum_1.Methods.patch);
