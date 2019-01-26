import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatComponent } from './chat.component';
import { MaterialModule } from '../shared/material/material.module';
import { MatDialogModule } from '@angular/material';
import { DialogUserComponent } from './dialog-user/dialog-user.component';

@NgModule({
  declarations: [ChatComponent, DialogUserComponent],
  imports: [
    CommonModule,
    MaterialModule,
    MatDialogModule
  ]
})
export class ChatModule { }
