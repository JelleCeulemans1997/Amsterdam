import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AssignmentService } from 'src/app/services/assignment.service';
import { Assignment } from 'src/app/models/assignment.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-assignmentdetail',
  templateUrl: './assignmentdetail.component.html',
  styleUrls: ['./assignmentdetail.component.scss']
})
export class AssignmentdetailComponent implements OnInit {

  id: string;
  assignment: Assignment;

  userId: string;
  role: any;

  allowed = false;

  constructor(
    private activated: ActivatedRoute,
    private assignmentService: AssignmentService,
    private router: Router,
    private userService: UserService) { }

  ngOnInit() {
    this.userId = this.userService.getUserId();
    this.id = this.activated.snapshot.paramMap.get('assignmentId');
    this.assignmentService.getAssignment(this.id).subscribe(result => {
      this.assignment = result.assignment;
      if (this.assignment.creator === this.userId) {
        this.allowed = true;
      }
    });
    this.userService.getUserbyId(this.userId).subscribe(res => {
      this.role = res.role;
    });
  }

  deleteAssignment(assignmentId: string) {
    this.assignmentService.deleteAssignment(assignmentId).subscribe(result => {
      console.log(result);
      this.router.navigate(['/assignments']);
    });
  }
}
