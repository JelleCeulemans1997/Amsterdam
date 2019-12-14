import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AssignmentService } from 'src/app/services/assignment.service';
import { Assignment } from 'src/app/models/assignment.model';

@Component({
  selector: 'app-assignmentdetail',
  templateUrl: './assignmentdetail.component.html',
  styleUrls: ['./assignmentdetail.component.scss']
})
export class AssignmentdetailComponent implements OnInit {

  id: string;
  assignment: Assignment;

  constructor(private activated: ActivatedRoute, private assignmentService: AssignmentService) { }

  ngOnInit() {
    this.id = this.activated.snapshot.paramMap.get('assignmentId');
    this.assignmentService.getAssignment(this.id).subscribe(result => {
      this.assignment = result.assignment;
      console.log(this.assignment);
      // this.getUser();
    });
  }

  deleteAssignment(assignmentId: string) {
    console.log(assignmentId);
  }
}
