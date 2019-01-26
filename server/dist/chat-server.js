"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = require("http");
var express = require("express");
var socketio = require("socket.io");
var config_1 = require("./configs/config");
var ChatServer = /** @class */ (function () {
    function ChatServer() {
        this.createApp();
        this.config();
        this.createServer();
        this.sockets();
        this.listen();
    }
    ChatServer.prototype.createApp = function () {
        this.app = express();
    };
    ChatServer.prototype.createServer = function () {
        this.server = http_1.createServer();
    };
    ChatServer.prototype.config = function () {
        this.port = process.env.port || ChatServer.PORT;
    };
    ChatServer.prototype.sockets = function () {
        this.io = socketio(this.server);
    };
    ChatServer.prototype.listen = function () {
        var _this = this;
        this.server.listen(this.port, function () {
            console.log('Running server on port %s', _this.port);
        });
        this.io.on(config_1.Config.ChatEvents.CONNECT, function (socket) {
            console.log('Connected client on port %s.', _this.port);
            socket.on(config_1.Config.ChatEvents.MESSAGE, function (m) {
                console.log('[Server](message): %s', JSON.stringify(m));
                _this.io.emit(config_1.Config.ChatEvents.MESSAGE, m);
            });
            socket.on(config_1.Config.ChatEvents.DISCONNECT, function () {
                console.log('Client disconnected...');
            });
        });
    };
    ChatServer.prototype.getApp = function () {
        return this.app;
    };
    ChatServer.PORT = 8080;
    return ChatServer;
}());
exports.ChatServer = ChatServer;
