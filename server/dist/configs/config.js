"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Config = /** @class */ (function () {
    function Config() {
    }
    Config.ChatEvents = {
        CONNECT: 'connect',
        MESSAGE: 'message',
        USERINFO: 'userinfo',
        DISCONNECT: 'disconnect',
        USERJOINED: 'userjoined'
    };
    Config.ApiRoutes = {
        MAIN_API: '/api',
        USERS_API: '/users'
    };
    Config.DEFAULT_PORT = 80;
    Config.SECRETJWTSIGN = "askgjlasgjdlasdgsdg[pweoiwe0";
    Config.INDEXHTML_PATH = 'D:/morf/SportsLegends/legendchat/dist/legendchat';
    return Config;
}());
exports.Config = Config;
