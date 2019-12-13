import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { AssignmentService } from '../../services/assignment.service';
import { Assignment } from '../../models/assignment.model';
import { map, startWith, filter } from 'rxjs/operators';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { MatAutocompleteSelectedEvent, MatChipInputEvent, MatAutocomplete } from '@angular/material';

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
  filtered: boolean = false;

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  tagCtrl = new FormControl();
  filteredTags: Observable<string[]>;
  tags: string[] = [];
  allTags: string[] = ['JavaScript', 'node.js', 'C#', 'PHP', 'Java'];
  assignments: Assignment[];

  @ViewChild('tagInput', {static: false}) tagInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto', {static: false}) matAutocomplete: MatAutocomplete;

  constructor(
    private assingmentService: AssignmentService,
    private fb: FormBuilder,
    private assignmentService: AssignmentService, private router: Router) {
    this.filteredTags = this.tagCtrl.valueChanges.pipe(startWith(null),
      map((tag: string | null) => tag ? this._filter(tag) : this.allTags.slice()));
   }

  ngOnInit() {
    this.assingmentService.getAllAsignments().subscribe(result => {
      this.assignments = result.assignments;
      console.log(this.assignments);
    });

    this.categories = ['Location', 'Tags'];
    this.results = [];
    this.searchForm = this.fb.group({
      searchString: ['']
    });
    // this.getAllAssignments();
  }


  search() {
    this.results.splice(0, this.results.length);
    if (this.selection === 'Location') {
      this.assignments.forEach(assignment => {
        if ( assignment.location[0].zipcode === this.searchForm.get('searchString').value ) {
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

}
