"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var user_api_1 = require("./user/user.api");
var express = require("express");
var config_1 = require("../configs/config");
var MainApiRouter = /** @class */ (function () {
    function MainApiRouter() {
        this.router = express.Router();
        this.setChildRoutes();
        this.router.get('/test', function (req, res) {
            console.log('reached test route!');
            res.send({ route: 'test' });
        });
    }
    MainApiRouter.prototype.setChildRoutes = function () {
        this.router.use(config_1.Config.ApiRoutes.USERS_API, new user_api_1.UserRouter().getRouter());
    };
    MainApiRouter.prototype.getRouter = function () {
        return this.router;
    };
    return MainApiRouter;
}());
exports.MainApiRouter = MainApiRouter;
