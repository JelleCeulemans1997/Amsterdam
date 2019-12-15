import {Component, OnInit} from '@angular/core';
import {Assignment} from '../../../models/assignment.model';
import {AssignmentService} from '../../../services/assignment.service';
import {UserService} from '../../../services/user.service';

@Component({
  selector: 'app-company-dashboard',
  templateUrl: './company-dashboard.component.html',
  styleUrls: ['./company-dashboard.component.scss']
})
export class CompanyDashboardComponent implements OnInit {
  assignments: Assignment[];

  constructor(    private userService: UserService, private assingmentService: AssignmentService) {}

  ngOnInit() {
    console.log('in dashboard');
    const companyId = this.userService.getUserId();
    console.log(companyId);

    this.assingmentService.getAllByCompany(companyId).subscribe(result => {
      this.assignments = result.assignments;
      console.log(this.assignments);
    });
  }

  deleteAssignment(assignmentId: string) {
    this.assingmentService.deleteAssignment(assignmentId).subscribe(result => {
      this.ngOnInit();
    });
  }
}
