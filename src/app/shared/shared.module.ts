import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material/material.module';
import { AuthenticationComponent } from './authentication/authentication.component';
import { AuthenticationService } from './authentication/authentication.service';
import { AuthGuardService } from './authentication/authentication-guard.service';



@NgModule({
  declarations: [AuthenticationComponent],
  imports: [
    CommonModule,
    MaterialModule
  ],
  providers: [
    AuthenticationService, AuthGuardService
  ]
})
export class SharedModule { }
