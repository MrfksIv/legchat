import { Injectable, EventEmitter, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

import { User } from '../models/user';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  @Output() isAuthenticatedEvent: EventEmitter<boolean> = new EventEmitter();

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService, private router: Router) { }

  public signup(user: User): Observable<any> {
    return this.http.post(environment.USERS_SIGNUP_URL, user);
  }

  public signin(obj: {username: string, password: string}): Observable<any> {
    return this.http.post(environment.USERS_SIGNIN_URL, obj).pipe(map(obj=> {
      // console.log('OBJ:', obj);
      localStorage.setItem('jwt_token', obj['token']);
      localStorage.setItem('username', obj['user']['username']);
      localStorage.setItem('userinfo', JSON.stringify(obj['user']));
      this.isAuthenticatedEvent.emit(true);
      
      // console.log('TOKEN:', localStorage.getItem('jwt_token'));
      return obj;
    }));
  }

  public logout() {
    localStorage.clear();
    this.isAuthenticatedEvent.emit(false);
    this.router.navigate(['authenticate']);

  }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('jwt_token');
    // console.log('is token', token, 'expired:', this.jwtHelper.isTokenExpired(token));
    return !this.jwtHelper.isTokenExpired(token);
  
  }
}
