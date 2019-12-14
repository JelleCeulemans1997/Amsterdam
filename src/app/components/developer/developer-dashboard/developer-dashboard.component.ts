import { Component, OnInit } from '@angular/core';
import { AssignmentdetailComponent } from '../../company/assignment/assignmentdetail/assignmentdetail.component';
import { AssignmentService } from 'src/app/services/assignment.service';
import { UserService } from 'src/app/services/user.service';
import { Assignment } from 'src/app/models/assignment.model';

@Component({
  selector: 'app-developer-dashboard',
  templateUrl: './developer-dashboard.component.html',
  styleUrls: ['./developer-dashboard.component.scss']
})
export class DeveloperDashboardComponent implements OnInit {
  applies: Assignment[];
  accepted: Assignment[];
  denied: Assignment[];

  constructor(
    private assignmetService: AssignmentService,
    private userService: UserService) { }

  ngOnInit() {
    const userId = this.userService.getUserId();
    this.assignmetService.getApplied(userId).subscribe(result => {
      this.applies = result.assignments;
    });

    this.assignmetService.getAccepted(userId).subscribe(result => {
      this.accepted = result.assignments;
    });

    this.assignmetService.getDenied(userId).subscribe(result => {
      this.denied = result.assignments;
    });
  }
}
