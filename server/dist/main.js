"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = require("http");
var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var config_1 = require("./configs/config");
var main_api_1 = require("./api/main.api");
var chat_api_1 = require("./api/chat/chat.api");
var PORT = process.env.PORT || config_1.Config.DEFAULT_PORT;
var app = express();
app.use(express.static(config_1.Config.INDEXHTML_PATH));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
mongoose.connect('mongodb://legend1:123456a@ds046677.mlab.com:46677/legendschat', { useNewUrlParser: true }, function (err) {
    console.log('errors during connecting to mongo:', err);
});
app.use(config_1.Config.ApiRoutes.MAIN_API, new main_api_1.MainApiRouter().getRouter());
app.get('*', function (req, res) {
    res.sendFile('index.html', { root: config_1.Config.INDEXHTML_PATH });
});
var server = http_1.createServer(app);
server = new chat_api_1.ChatServer(server).getServer();
server.listen(PORT, function () {
    console.log('Running server on port %s', PORT);
});
// let app = new ChatServer().getApp();
