import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { AssignmentService } from '../../services/assignment.service';
import { Assignment } from '../../models/assignment.model';
import { map, startWith, filter } from 'rxjs/operators';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { MatAutocompleteSelectedEvent, MatChipInputEvent, MatAutocomplete } from '@angular/material';
import { UserService } from '../../services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RoleDefining } from 'src/app/models/role.model';
import { Store } from '@ngrx/store';

import * as fromRoot from '../../app.reducer';
import { DeveloperService } from '../../services/developer.service';

@Component({
  selector: 'app-assignment-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {
  searchForm: FormGroup;

  categories: string[];
  selection: string;
  results: any[];
  filtered = false;
  userId: string;
  canApply = false;
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  tagCtrl = new FormControl();
  filteredTags: Observable<string[]>;
  tags: string[] = [];
  allTags: string[] = [];
  assignments: Assignment[];

  roles$: Observable<RoleDefining>;

  @ViewChild('tagInput', { static: false }) tagInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto', { static: false }) matAutocomplete: MatAutocomplete;

  constructor(
    private snackBar: MatSnackBar,
    private userService: UserService,
    private assingmentService: AssignmentService,
    private developerService: DeveloperService,
    private fb: FormBuilder,
    private assignmentService: AssignmentService,
    private router: Router,
    private store: Store<fromRoot.State>) {
    this.filteredTags = this.tagCtrl.valueChanges.pipe(startWith(null),
      map((tag: string | null) => tag ? this._filter(tag) : this.allTags.slice()));
  }

  ngOnInit() {
    this.userId = this.userService.getUserId();
    this.developerService.getByUserId(this.userId).subscribe(result => {
      console.log(result);
      if (result) {
        this.canApply = true;
      }
    });

    this.assingmentService.getAllAsignments().subscribe(result => {
      this.assignments = result.assignments;
      console.log(this.assignments);
      this.roles$ = this.store.select(fromRoot.getWhichRole);
    });

    this.categories = ['Location', 'Tags', 'Company', 'Title'];
    this.results = [];
    this.searchForm = this.fb.group({
      searchString: ['']
    });
  }


  search() {
    this.results.splice(0, this.results.length);
    if (this.selection === 'Location') {
      this.assignments.forEach(assignment => {
        if (assignment.location.zipcode === this.searchForm.get('searchString').value) {
          this.results.push(assignment);
        }
      });
    } else if (this.selection === 'Tags') {
      this.assignments.forEach(assignment => {
        this.tags.forEach(tag => {
          if (assignment.tags.includes(tag)) {
            if (!this.results.includes(assignment)) {
              this.results.push(assignment);
            }
          }
        });
      });
    } else if (this.selection === 'Company') {
      this.assignments.forEach(assignment => {
        if (assignment.company.name.toLowerCase().includes(this.searchForm.get('searchString').value.toLowerCase())) {
          this.results.push(assignment);
        }
      });
    } else if (this.selection === 'Title') {
      this.assignments.forEach(assignment => {
        if (assignment.title.toLowerCase().includes(this.searchForm.get('searchString').value.toLowerCase())) {
          this.results.push(assignment);
        }
      });
    }
    return this.searchForm.get('searchString').value;

  }

  // getAllAssignments() {
  //   this.assignmentService.getAllAsignments().subscribe(result => {
  //     this.assignments = result.assignments;
  //     console.log(this.assignments);
  //   });
  // }

  onSelectionChange() {
    this.filtered = true;
  }

  add(event: MatChipInputEvent): void {
    if (!this.matAutocomplete.isOpen) {
      const input = event.input;
      const value = event.value;

      if ((value || '').trim()) {
        this.tags.push(value.trim());
      }

      if (input) {
        input.value = '';
      }

      this.tagCtrl.setValue(null);
    }
    this.search();
  }

  remove(tag: string): void {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.tags.push(event.option.viewValue);
    this.tagInput.nativeElement.value = '';
    this.tagCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allTags.filter(tag => tag.toLowerCase().indexOf(filterValue) === 0);
  }

  goToDetail(id: string) {
    console.log(id);
    this.router.navigateByUrl('/assignmentDetail/' + id);
  }

  showCompantDetails(creatorId: string) {
    console.log(creatorId);
    // go to company profile page
    this.router.navigate(['/companyProfile/' + creatorId]);
  }


  onApply(assignmentId) {
    this.roles$.subscribe(result => {
      if (result.Developer) {
        if (this.canApply) {
          const userId = this.userService.getUserId();
          this.assignmentService.checkAlreadyApplied(assignmentId, userId).subscribe(response => {
            const assignment = response.assignment;
            let applied = false;
            for (const check of assignment.applies) {
              if (check.apply === userId) {
                applied = true;
              }
            }
            for (const check of assignment.accepted) {
              if (check.accept === userId) {
                applied = true;
              }
            }
            for (const check of assignment.denied) {
              applied = check.deny === userId;
              if (check.deny === userId) {
                applied = true;
              }
            }
            if (applied === false) {
              this.assignmentService.sendApply(assignmentId, userId);

            } else {
              this.openSnackBar('You already applied', 'Failed');
            }
          });
        } else {
          this.openSnackBar('Complete Credentials First', 'Failed');
        }
      } else if (result.Company || result.Admin) {
        this.openSnackBar('Only for developers!', 'Error');
      } else {
        this.router.navigate(['/login']);
      }
    });
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }
}
