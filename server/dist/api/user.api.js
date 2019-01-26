"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var UserRouter = /** @class */ (function () {
    function UserRouter() {
        this.router = express.Router();
        this.setLoginRoute();
        this.setSignupRoute();
    }
    ;
    UserRouter.prototype.getRouter = function () {
        return this.router;
    };
    UserRouter.prototype.setLoginRoute = function () {
        this.router.get('/login', function (req, res) {
            console.log('you have reached the login route..');
        });
    };
    UserRouter.prototype.setSignupRoute = function () {
        this.router.post('/signup', function (req, res) {
            console.log('you have reached the signup route..');
        });
    };
    return UserRouter;
}());
exports.UserRouter = UserRouter;
