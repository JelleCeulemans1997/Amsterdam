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
    this.id = this.activated.snapshot.paramMap.get("assignmentId");
    this.assignmentService.getAssignment(this.id).subscribe(res => {
      this.assignment = res.assignment;
      console.log(this.assignment)
    });
  }


  getUser(){
    this.assignmentService.getUser(this.assignment.creator).subscribe(res => {
      console.log(res)
    })
  }



}
