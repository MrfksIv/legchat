import { Server } from 'http';
import * as socketio from 'socket.io';
import * as loki from 'lokijs';
import { Config } from '../../configs/config';
import { Message } from '../../model/message.model';

export class ChatServer {
    private server: Server;
    private io: SocketIO.Server;

    constructor(server: Server) {
        this.server = server;
        this.sockets();
        this.defineSocketEvents();
    }

    private sockets(): void {
        this.io = socketio(this.server);
    }

    private defineSocketEvents(): void {

        this.io.on(Config.ChatEvents.CONNECT, (socket: any) => {
            console.log('Connected client on port');
            const db = new loki('chat-db.json');
            const users = db.addCollection('currentUsers');
            global['currentUsers'] = [];

            socket.on(Config.ChatEvents.USERINFO, (userinfo: any) => {
                console.log('[Server] user info received...');
                // console.log(userinfo);
                userinfo = JSON.parse(userinfo);
                const obj = {};
                obj['channel'] = 'general';
                obj['username'] = userinfo['username'];
                obj['firstName'] = userinfo['firstName'];
                obj['lastName'] = userinfo['lastName'];
                obj['team'] = userinfo['team'];
                console.log(obj);
                // users.add(obj);
                global['currentUsers'].push(obj);
                this.io.emit(Config.ChatEvents.USERJOINED, JSON.stringify(global['currentUsers'])); 

                // console.log(JSON.stringify(users.find({'channel': 'general'})));
            });

            socket.on(Config.ChatEvents.MESSAGE, (m: Message) => {
                console.log('[Server](message): %s', JSON.stringify(m));
                this.io.emit(Config.ChatEvents.MESSAGE, m);
            });

            socket.on(Config.ChatEvents.DISCONNECT, () => {
                console.log('Client disconnected...');
            });
        });
    }

    public getServer(): Server {
        return this.server;
    }

    
}