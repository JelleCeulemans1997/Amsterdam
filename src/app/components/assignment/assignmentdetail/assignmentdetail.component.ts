import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AssignmentService } from 'src/app/services/assignment.service';

@Component({
  selector: 'app-assignmentdetail',
  templateUrl: './assignmentdetail.component.html',
  styleUrls: ['./assignmentdetail.component.scss']
})
export class AssignmentdetailComponent implements OnInit {

  id: string;
  assignment: any;

  constructor(private activated: ActivatedRoute, private assignmentService: AssignmentService) {

   }

  ngOnInit() {
    this.id = this.activated.snapshot.paramMap.get('assignmentId');
    if (this.id) {
      this.assignment = this.assignmentService.getAssignmentById(this.id);
      console.log(this.assignment);
    }
  }



}
