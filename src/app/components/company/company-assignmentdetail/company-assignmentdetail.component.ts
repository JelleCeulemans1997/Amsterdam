import { Component, OnInit } from '@angular/core';
import {Assignment} from '../../../models/assignment.model';
import {AssignmentService} from '../../../services/assignment.service';
import {ActivatedRoute, ParamMap} from '@angular/router';
import { MatAutocompleteSelectedEvent, MatChipInputEvent, MatAutocomplete } from '@angular/material';


@Component({
  selector: 'app-company-assignmentdetail',
  templateUrl: './company-assignmentdetail.component.html',
  styleUrls: ['./company-assignmentdetail.component.scss']
})
export class CompanyAssignmentdetailComponent implements OnInit {
isLoading = false;
  assignmentId = '';
  assignment = null;

  constructor(public route: ActivatedRoute, private assignmentService: AssignmentService) { }

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('assignmentId')) {
        this.assignmentId = paramMap.get('assignmentId');
        this.assignmentService.getAssignment(this.assignmentId).subscribe(assignmentData => {
          this.assignment = assignmentData.assignment;
          console.log(this.assignment);
        });
      } else {
        this.assignmentId = null;
      }
    });
  }



  onAcceptApply(assignmentId, makerId) {
    console.log('click assId: ' + assignmentId + ' - makerId: ' + makerId);

    this.assignmentService.acceptApply(assignmentId, makerId);
  }
  onDenyApply(assignmentId, makerId) {
    console.log('click assId: ' + assignmentId + ' - makerId: ' + makerId);

    this.assignmentService.denyApply(assignmentId, makerId);
  }


}



