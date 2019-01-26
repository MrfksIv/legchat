import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatButtonModule, MatCheckboxModule, MatCardModule, MatFormFieldModule,
  MatGridListModule, MatInputModule, MatIconModule, MatTabsModule, 
  MatProgressBarModule, MatListModule, MatDialogModule,
  MatToolbarModule, MatSnackBarModule, MatSidenavModule,
  MatDividerModule, MatExpansionModule } from '@angular/material';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ReactiveFormsModule, FormsModule,
    MatButtonModule, MatCheckboxModule, MatTabsModule,
    MatGridListModule, MatInputModule, MatIconModule,
    MatCardModule, MatFormFieldModule, MatProgressBarModule,
    MatListModule, MatDialogModule, MatToolbarModule,
    MatSnackBarModule, MatSidenavModule, MatDividerModule,
    MatExpansionModule
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule, FormsModule,
    MatButtonModule, MatCheckboxModule, MatTabsModule,
    MatGridListModule, MatInputModule, MatIconModule,
    MatCardModule, MatFormFieldModule, MatProgressBarModule,
    MatListModule, MatDialogModule, MatToolbarModule,
    MatSnackBarModule, MatSidenavModule, MatDividerModule,
    MatExpansionModule
  ]

})
export class MaterialModule { }
