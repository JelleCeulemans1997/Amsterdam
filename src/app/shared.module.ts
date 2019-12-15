import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatChipsModule, MatAutocompleteModule, MatPaginatorModule, MatTooltipModule, MatDialogModule } from '@angular/material';



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
    MatPaginatorModule,
    MatTooltipModule,
    MatDialogModule
  ],
  exports: [
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    MatGridListModule,
    MatChipsModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    MatTooltipModule,
    MatDialogModule
  ]
})
export class SharedModule { }
