import { Component, OnInit } from '@angular/core';
import {Assignment} from '../../../models/assignment.model';
import {AssignmentService} from '../../../services/assignment.service';
import {ActivatedRoute, ParamMap} from '@angular/router';
import { MatAutocompleteSelectedEvent, MatChipInputEvent, MatAutocomplete } from '@angular/material';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-company-assignmentdetail',
  templateUrl: './company-assignmentdetail.component.html',
  styleUrls: ['./company-assignmentdetail.component.scss']
})
export class CompanyAssignmentdetailComponent implements OnInit {
isLoading = false;
  assignmentId = '';
  assignment = null;

  constructor(private snackBar: MatSnackBar, public route: ActivatedRoute, private assignmentService: AssignmentService) { }

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

  onAcceptApply(assignmentId, developerId) {
    this.assignmentService.acceptApply(assignmentId, developerId).subscribe(result => {
      this.assignmentService.removeApplied(assignmentId, developerId).subscribe(res => {
        this.ngOnInit();
        this.openSnackBar('apply accepted', 'succes!');
      });
    });
  }
  onDenyApply(assignmentId, developerId) {
    this.assignmentService.denyApply(assignmentId, developerId).subscribe(result => {
      this.assignmentService.removeApplied(assignmentId, developerId).subscribe(res => {
        this.ngOnInit();
        this.openSnackBar('apply denied', 'succes!');
      });
    });
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
}



