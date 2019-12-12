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
  creator:any;

  constructor(private activated: ActivatedRoute, private assignmentService: AssignmentService) {

   }

  ngOnInit() {
    this.id = this.activated.snapshot.paramMap.get('assignmentId');
    this.assignmentService.getAssignment(this.id).subscribe(res => {
      this.assignment = res.assignment;
      console.log(this.assignment);
      this.getUser();
    });
  }


  getUser() {
    this.assignmentService.getUser(this.assignment.creator).subscribe(res => {
      if (res.user) {
        this.creator = res.user.email; // TODO connect with companyname
      }
    },
    err => {
      if(err){
        this.creator = 'User not found, creatorId = ' + this.assignment.creator;
      }
    });
  }



}
