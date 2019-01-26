import { createServer, Server } from 'http';
import * as express from 'express';
import * as mongoose from 'mongoose';
import * as bodyParser from 'body-parser';

import { Config } from './configs/config';
import { MainApiRouter } from './api/main.api';
import { ChatServer } from './api/chat/chat.api';
import * as path from 'path';

const PORT = process.env.PORT || Config.DEFAULT_PORT;

const app: express.Application = express();

app.use(express.static(Config.INDEXHTML_PATH));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

mongoose.connect('mongodb://legend1:123456a@ds046677.mlab.com:46677/legendschat',
                {useNewUrlParser: true}, (err) => {
    console.log('errors during connecting to mongo:', err);   
});

app.use(Config.ApiRoutes.MAIN_API, new MainApiRouter().getRouter());

app.get('*', (req: express.Request, res: express.Response) => {
  res.sendFile('index.html', {root: Config.INDEXHTML_PATH});  

});

let server: Server = createServer(app);
server = new ChatServer(server).getServer(); 

server.listen(PORT, () => {
    console.log('Running server on port %s', PORT);   
});


// let app = new ChatServer().getApp();

