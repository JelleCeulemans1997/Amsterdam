import { Component, OnInit } from '@angular/core';
import { AssignmentService } from 'src/app/services/assignment.service';
import { Assignment } from 'src/app/models/assignment.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-assignment-overview',
  templateUrl: './assignment-overview.component.html',
  styleUrls: ['./assignment-overview.component.scss']
})
export class AssignmentOverviewComponent implements OnInit {
  assignments: Assignment[];

  constructor(private assingmentService: AssignmentService) { }

  ngOnInit() {
    this.assingmentService.getAllAsignments().subscribe(result => {
      this.assignments = result.assignments;
      console.log(this.assignments);
    });
  }

}
