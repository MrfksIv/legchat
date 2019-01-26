import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { first } from 'rxjs/operators';
import { AuthenticationService } from './authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {

  hide = true;
  waitingServerResponse = false;
  successfulLogin = true;
  options: FormGroup;

  signinForm: FormGroup;
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, 
              private authService: AuthenticationService,
              private router: Router,
              public snackBar: MatSnackBar) { 
    this.options = this.fb.group({
      hideRequired: false,
      floatLabel: 'auto'
    });
  }

  ngOnInit() {
    this.setupRegisterForm();
    this.setupSigninFrom();
  }

  private setupRegisterForm(): void {
    this.registerForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      team: new FormControl(''),
    });
  }

  private setupSigninFrom(): void {
    this.signinForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]) 
    });
  }

  public onSubmitRegisterForm(): void {
    this.waitingServerResponse = true;
    this.authService.signup(this.registerForm.value).pipe(first())
    .subscribe(
      data => {
        this.waitingServerResponse = false;
        this.snackBar.open('Your registration has been successful. You will now be redirected to login', null,
         {duration: 1500});
        this.router.navigate(['/authenticate']);
      },
      error => {
        this.waitingServerResponse = false;
        this.snackBar.open('Something went wrong with your registration');
      }
    );
  }

  public onSubmitSigninForm(): void {
    this.waitingServerResponse = true;
    this.authService.signin(this.signinForm.value).pipe(first())
    .subscribe(
      data => {
        console.log('router', data);
        this.waitingServerResponse = false;
        this.successfulLogin = true;
        this.router.navigate(['chatplatform']);
      },
      error => {
        this.waitingServerResponse = false;
        this.successfulLogin = true;
        console.log('error', error);
    });
  }
}
