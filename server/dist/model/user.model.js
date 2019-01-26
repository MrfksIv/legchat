"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var bcrypt = require("bcrypt-nodejs");
var es6_promise_1 = require("es6-promise");
var SALT_WORK_FACTOR = 10;
var UserSchema = new mongoose_1.Schema({
    joinedAt: Date,
    email: { type: String, required: true, index: { unique: true } },
    username: { type: String, required: true, index: { unique: true } },
    password: { type: String, required: true },
    firstName: String,
    lastName: String,
    team: String
});
UserSchema.pre('save', function (next) {
    var user = this;
    if (!user['joinedAt']) {
        user['joinedAt'] = Date();
    }
    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
        if (err) {
            return next(err);
        }
        //hash the password along with the salt
        bcrypt.hash(user['password'], salt, null, function (err, hash) {
            if (err) {
                return next(err);
            }
            console.log('hash:', hash);
            user['password'] = hash;
            next();
        });
    });
});
UserSchema.methods.fullName = function () { return _this.firstName.trim() + " " + _this.lastName.trim(); };
UserSchema.methods.comparePassword = function (candidatePassword) {
    var _this = this;
    return new es6_promise_1.Promise(function (resolve, reject) {
        bcrypt.compare(candidatePassword, _this.password, function (err, isMatch) {
            if (err) {
                reject(err);
            }
            resolve(isMatch);
        });
    });
};
exports.User = mongoose_1.model('User', UserSchema);
