import { Component, OnInit } from '@angular/core';
import { AssignmentService } from 'src/app/services/assignment.service';
import { Assignment } from 'src/app/models/assignment.model';

@Component({
  selector: 'app-admin-assignments',
  templateUrl: './admin-assignments.component.html',
  styleUrls: ['./admin-assignments.component.scss']
})
export class AdminAssignmentsComponent implements OnInit {
  assignments: Assignment[];

  constructor(private assignmentService: AssignmentService) { }

  ngOnInit() {
    this.assignmentService.getAllAsignments().subscribe(result => {
      this.assignments = result.assignments;
      console.log(result);
    });
  }

}
