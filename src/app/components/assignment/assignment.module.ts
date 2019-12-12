import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssignmentdetailComponent } from './assignmentdetail/assignmentdetail.component';
import { SharedModule } from 'src/app/shared.module';



@NgModule({
  declarations: [AssignmentdetailComponent],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class AssignmentModule { }
