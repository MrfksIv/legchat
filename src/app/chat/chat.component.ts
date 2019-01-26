import { Component, OnInit, ViewChildren, 
  ViewChild, AfterViewInit, QueryList, ElementRef, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Action } from './shared/model/action';
import { Event } from './shared/model/event';
import { Message } from './shared/model/message';
import { User } from './shared/model/user';
import { SocketService } from './shared/services/socket.service';

import { DialogUserType } from './dialog-user/dialog-user-type';
import { MatList, MatListItem } from '@angular/material';



const AVATAR_URL = 'https://api.adorable.io/avatars/285';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, AfterViewInit, OnDestroy {

  action = Action;
  user: User;
  currentUsers = [];
  messages: Message[] = [];
  messageContent: string;
  ioConnection: any;
  mode = new FormControl('over');
  // dialogRef: MatDialogRef<DialogUserComponent> | null;
  defaultDialogUserParams: any = {
    disableClose: true,
    data: {
      title: 'Welcome',
      dialogType: DialogUserType.NEW
    }
  };

  // getting a reference to the overall list, which is the parent container of the list items
  @ViewChild(MatList, { read: ElementRef }) matList: ElementRef;

  // getting a reference to the items/messages within the list
  @ViewChildren(MatListItem, { read: ElementRef }) matListItems: QueryList<MatListItem>;

  constructor(private socketService: SocketService) { }

  ngOnInit() {
    this.initModel();
    this.initIoConnection();
    this.user.name = localStorage.getItem('username');
    // Using timeout due to https://github.com/angular/angular/issues/14748
    setTimeout(() => {
      this.openUserPopup(this.defaultDialogUserParams);
    }, 0);
  }

  ngAfterViewInit(): void {
    // subscribing to any changes in the list of items / messages
    this.matListItems.changes.subscribe(elements => {
      this.scrollToBottom();
    });
  }

  ngOnDestroy(): void {
    console.log("DEATH!!");
  }

  // auto-scroll fix: inspired by this stack overflow post
  // https://stackoverflow.com/questions/35232731/angular2-scroll-to-bottom-chat-style
  private scrollToBottom(): void {
    try {
      this.matList.nativeElement.scrollTop = this.matList.nativeElement.scrollHeight;
    } catch (err) {
    }
  }

  private initModel(): void {
    const randomId = this.getRandomId();
    this.user = {
      id: randomId,
      avatar: `${AVATAR_URL}/${randomId}.png`
    };
  }

  private initIoConnection(): void {
    this.socketService.initSocket();

    this.ioConnection = this.socketService.onMessage()
    .subscribe((message: Message) => {
      this.messages.push(message);
    });

    this.socketService.onEvent(Event.CONNECT)
    .subscribe(() => {
      console.log('connected...');
    });

    this.socketService.onUserJoined().subscribe((userinfo: any) => {
      this.currentUsers.push(JSON.parse(userinfo));
      // this.currentUsers = JSON.parse(JSON.stringify(this.currentUsers));
      console.log(this.currentUsers);
    });

    this.socketService.onEvent(Event.DISCONNECT)
    .subscribe(() => {
      console.log('disconnected...');
    });
  }

  public sendMessage(message: string): void {
    if (!message) {
      return;
    }
    this.socketService.send({
      from: this.user,
      content: message
    });
    this.messageContent = null;
  }

  public sendNotification(params: any, action: Action): void {
    let message: Message;

    if (action === Action.JOINED) {
      message = {
        from: this.user,
        action: action
      }
    } else if (action === Action.RENAMED) {
      message = {
        action: action,
        content: {
          username: this.user.name,
          previousUsername: params.previousUsername
        }
      };
    }
    this.socketService.send(message)
  }

  private getRandomId(): number {
    return Math.floor(Math.random() * (1000000)) + 1;
  }

  private openUserPopup(params): void {
  
  }

}
