import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './shared/authentication/authentication.service'; 
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'legendchat';
  username: string;

  constructor(private auth: AuthenticationService) {}

  ngOnInit() {
    if (this.auth.isAuthenticated()) {
      this.username = localStorage.getItem('username');
    }
    this.auth.isAuthenticatedEvent.subscribe( (evt: boolean) => {
      if (evt) {
        this.username = localStorage.getItem('username');
      } else {
        this.username = null;
      }
    });
  }

  public logout() {
    this.auth.logout();
  }
}


