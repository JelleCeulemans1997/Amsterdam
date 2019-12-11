import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatToolbarModule,
  MatIconModule,
  MatSidenavModule,
  MatListModule,
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatStepperModule,
  MatChipsModule,
  MatAutocompleteModule,
  MatTableModule,
  MatSelectModule,
  MatExpansionModule,
  MatSlideToggleModule} from '@angular/material';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatStepperModule,
    MatAutocompleteModule,
    MatTableModule,
    MatSelectModule,
    MatExpansionModule,
    MatSlideToggleModule
  ],
  exports: [
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatStepperModule,
    MatChipsModule,
    MatAutocompleteModule,
    MatTableModule,
    MatSelectModule,
    MatExpansionModule,
    MatSlideToggleModule
  ]
})
export class MaterialModule { }
