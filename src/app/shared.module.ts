import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatChipsModule, MatAutocompleteModule, MatPaginatorModule } from '@angular/material';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    MatGridListModule,
    MatChipsModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatPaginatorModule
  ],
  exports: [
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    MatGridListModule,
    MatChipsModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatPaginatorModule
  ]
})
export class SharedModule { }
