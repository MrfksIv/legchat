"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var jwt = require("jsonwebtoken");
var user_model_1 = require("../../model/user.model");
var config_1 = require("../../configs/config");
var UserRouter = /** @class */ (function () {
    function UserRouter() {
        this.router = express.Router();
        this.setLoginRoute();
        this.setSignupRoute();
        this.router.get('/', function () {
            console.log('reached the user api...');
        });
    }
    ;
    UserRouter.prototype.getRouter = function () {
        return this.router;
    };
    UserRouter.prototype.setLoginRoute = function () {
        this.router.post('/signin', function (req, res) {
            console.log('you have reached the completed login route..');
            user_model_1.User.findOne({ username: req.body.username }).then(function (user) {
                user.comparePassword(req.body.password).then(function (isMatch) {
                    if (isMatch) {
                        user.password = null;
                        var token = jwt.sign(user.toJSON(), config_1.Config.SECRETJWTSIGN, { expiresIn: 3600 * 24 * 7 });
                        return res.status(200).send({ success: true, user: user, token: token });
                    }
                    else {
                        return res.status(403).send({ success: false, error: 'Unable to login' });
                    }
                }).catch(function (err) {
                    console.log(err);
                    res.status(500).send({ success: false, error: err });
                });
            }).catch(function (err) { return res.status(500).send({ success: false, error: err }); });
        });
    };
    UserRouter.prototype.setSignupRoute = function () {
        this.router.post('/signup', function (req, res) {
            console.log('you have reached the signup route.!.');
            var user = new user_model_1.User(req.body);
            console.log(user);
            user.save(undefined, function (err, user) {
                if (err) {
                    console.log('ERROR:', err);
                    return res.send({ success: false, error: err });
                }
                else {
                    console.log('User has been saved successfully:', user);
                    user.password = null;
                    return res.status(200).send({ success: true, user: user });
                }
            });
        });
    };
    return UserRouter;
}());
exports.UserRouter = UserRouter;
