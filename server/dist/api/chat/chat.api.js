"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var socketio = require("socket.io");
var loki = require("lokijs");
var config_1 = require("../../configs/config");
var ChatServer = /** @class */ (function () {
    function ChatServer(server) {
        this.server = server;
        this.sockets();
        this.defineSocketEvents();
    }
    ChatServer.prototype.sockets = function () {
        this.io = socketio(this.server);
    };
    ChatServer.prototype.defineSocketEvents = function () {
        var _this = this;
        this.io.on(config_1.Config.ChatEvents.CONNECT, function (socket) {
            console.log('Connected client on port');
            var db = new loki('chat-db.json');
            var users = db.addCollection('currentUsers');
            global['currentUsers'] = [];
            socket.on(config_1.Config.ChatEvents.USERINFO, function (userinfo) {
                console.log('[Server] user info received...');
                // console.log(userinfo);
                userinfo = JSON.parse(userinfo);
                var obj = {};
                obj['channel'] = 'general';
                obj['username'] = userinfo['username'];
                obj['firstName'] = userinfo['firstName'];
                obj['lastName'] = userinfo['lastName'];
                obj['team'] = userinfo['team'];
                console.log(obj);
                // users.add(obj);
                global['currentUsers'].push(obj);
                _this.io.emit(config_1.Config.ChatEvents.USERJOINED, JSON.stringify(global['currentUsers']));
                // console.log(JSON.stringify(users.find({'channel': 'general'})));
            });
            socket.on(config_1.Config.ChatEvents.MESSAGE, function (m) {
                console.log('[Server](message): %s', JSON.stringify(m));
                _this.io.emit(config_1.Config.ChatEvents.MESSAGE, m);
            });
            socket.on(config_1.Config.ChatEvents.DISCONNECT, function () {
                console.log('Client disconnected...');
            });
        });
    };
    ChatServer.prototype.getServer = function () {
        return this.server;
    };
    return ChatServer;
}());
exports.ChatServer = ChatServer;
