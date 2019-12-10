import { Component, OnInit } from '@angular/core';
import {AssignmentService} from '../../../services/assignment.service';

@Component({
  selector: 'app-assignmentlist',
  templateUrl: './assignmentlist.component.html',
  styleUrls: ['./assignmentlist.component.scss']
})
export class AssignmentlistComponent implements OnInit {
assignments: [];

  constructor(private assignmentService: AssignmentService) { }

  ngOnInit() {

    this.assignmentService.getAllAsignments().subscribe(asignmentsData => {
      this.assignments = asignmentsData.assignments;
      console.log(this.assignments);
    });

  }




}
