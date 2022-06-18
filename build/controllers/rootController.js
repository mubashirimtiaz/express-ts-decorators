"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var middlewares_1 = require("../middlewares");
var decorators_1 = require("./decorators");
var rootController = /** @class */ (function () {
    function rootController() {
    }
    rootController.prototype.getHome = function (req, res) {
        if (req.session && req.session.loggedIn) {
            res.send("\n          <div>\n            <div>\n              You are logged In\n            </div>\n            <a href=\"/logout\">logout</a>\n          </div>\n        ");
        }
        else {
            res.send("\n        <div>\n          <div>\n            You aren't logged In\n          </div>\n          <a href=\"/login\">login</a>\n        </div>\n      ");
        }
    };
    rootController.prototype.getProtected = function (req, res) {
        if (req.session && req.session.loggedIn) {
            res.send("\n          <div>\n            <div>\n             Protected Route\n            </div>\n          </div>\n        ");
        }
    };
    __decorate([
        (0, decorators_1.get)('/'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], rootController.prototype, "getHome", null);
    __decorate([
        (0, decorators_1.get)('/protected'),
        (0, decorators_1.use)(middlewares_1.requireAuth),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], rootController.prototype, "getProtected", null);
    rootController = __decorate([
        (0, decorators_1.controller)()
    ], rootController);
    return rootController;
}());
