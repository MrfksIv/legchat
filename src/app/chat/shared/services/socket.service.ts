import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import * as socketio from 'socket.io-client';

import { Message } from '../model/message';
import { Event } from '../model/event';
import { Config } from '../../../../../server/src/configs/config';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  private socket;

  public initSocket(): void {
    this.socket = socketio(environment.SERVER_URL);
    setTimeout( () => {
      console.log('sending user info...')
      this.sendUserInfo();
    }, 2000)
    

  }

  private sendUserInfo() {
    const stringifiedUserInfo = localStorage.getItem(Config.ChatEvents.USERINFO);
    console.log(stringifiedUserInfo);
    this.socket.emit(Config.ChatEvents.USERINFO, stringifiedUserInfo);
  }

  public send(message: Message) {
    this.socket.emit(Config.ChatEvents.MESSAGE, message);
  }

  public onMessage(): Observable<Message> {
    return new Observable<Message>(observer => {
      this.socket.on(Config.ChatEvents.MESSAGE, (data: Message) => {
        observer.next(data);
      });
    });
  }

  public onUserJoined(): Observable<any> {
    return new Observable<any>(observer => {
      this.socket.on(Config.ChatEvents.USERJOINED, (data: Message) => {
        observer.next(data);
      });
    });
  }

  public onEvent(event: Event): Observable<any> {
    return new Observable<Event>(observer => {
      this.socket.on(event, () => observer.next());
    });
  }
}

