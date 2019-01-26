import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthenticationComponent } from './shared/authentication/authentication.component';
import { ChatComponent } from './chat/chat.component';
import { AuthGuardService as AuthGuard } from './shared/authentication/authentication-guard.service';
const routes: Routes = [
  { path: 'authenticate', component: AuthenticationComponent },
  { path: 'chatplatform', component: ChatComponent, canActivate:[AuthGuard] },
  { path: '', redirectTo: '/chatplatform', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
