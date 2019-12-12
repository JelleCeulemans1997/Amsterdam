import {Component, OnInit} from '@angular/core';
import {Assignment} from '../../../models/assignment.model';
import {AssignmentService} from '../../../services/assignment.service';

@Component({
  selector: 'app-company-dashboard',
  templateUrl: './company-dashboard.component.html',
  styleUrls: ['./company-dashboard.component.scss']
})
export class CompanyDashboardComponent implements OnInit {
  assignments: Assignment[];

  constructor(private assingmentService: AssignmentService) {}

  ngOnInit() {
    this.assingmentService.getAllAsignments().subscribe(result => {
      this.assignments = result.assignments;
      console.log(this.assignments);
    });
  }

}
