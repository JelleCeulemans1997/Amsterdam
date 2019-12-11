import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssignmentdetailComponent } from './assignmentdetail/assignmentdetail.component';
import { MaterialModule } from 'src/app/material.module';



@NgModule({
  declarations: [AssignmentdetailComponent],
  imports: [
    CommonModule,
    MaterialModule
  ]
})
export class AssignmentModule { }
