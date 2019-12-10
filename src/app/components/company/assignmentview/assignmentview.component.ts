import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {AssignmentService} from '../../../services/assignment.service';

@Component({
  selector: 'app-assignmentview',
  templateUrl: './assignmentview.component.html',
  styleUrls: ['./assignmentview.component.scss']
})
export class AssignmentviewComponent implements OnInit {

  assignmentId = '';
  assignment;

  constructor(public route: ActivatedRoute, private assignmentService: AssignmentService) { }

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('assignmentId')) {
        this.assignmentId = paramMap.get('assignmentId');
        this.assignmentService.getAssignment(this.assignmentId).subscribe(assignmentData => {
          this.assignment = assignmentData;
          console.log('assignment:');
          console.log(this.assignment);
        });
      } else {
        this.assignmentId = null;
      }
    });
  }

}
