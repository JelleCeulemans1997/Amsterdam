import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { AssignmentService } from 'src/app/services/assignment.service';
import { MatChipInputEvent } from '@angular/material';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatAutocompleteSelectedEvent, MatAutocomplete} from '@angular/material/autocomplete';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { Assignment } from 'src/app/models/assignment.model';
import { Router } from '@angular/router';


@Component({
  selector: 'app-search-assignment',
  templateUrl: './search-assignment.component.html',
  styleUrls: ['./search-assignment.component.scss']
})
export class SearchAssignmentComponent implements OnInit {

  searchForm: FormGroup;

  categories: string[];
  selection: string;
  assignments: any[];
  results: any[];
  filtered:boolean = false;

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  tagCtrl = new FormControl();
  filteredTags: Observable<string[]>;
  tags: string[] = [];
  allTags: string[] = ['JavaScript', 'node.js', 'C#', 'PHP', 'Java'];

  @ViewChild('tagInput', {static: false}) tagInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto', {static: false}) matAutocomplete: MatAutocomplete;

  constructor(private fb: FormBuilder, private assignmentService: AssignmentService, private router: Router) {
    this.filteredTags = this.tagCtrl.valueChanges.pipe(
      startWith(null),
      map((tag: string | null) => tag ? this._filter(tag) : this.allTags.slice()));
   }

  ngOnInit() {
    this.categories = ['Location', 'Tags'];
    this.results = [];
    this.searchForm = this.fb.group({
      searchString: ['']
    });
    this.getAllAssignments();
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
          if ( assignment.tags.includes(tag)) {
            if (!this.results.includes(assignment)) {
              this.results.push(assignment);
            }
          }
        });
      });
    }
    return this.searchForm.get('searchString').value;

  }

  getAllAssignments() {
    this.assignmentService.getAllAsignments().subscribe(res => {
      this.assignments = res.assignments;
      console.log(this.assignments);
    });
  }

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

  goToDetail(id:string){
    console.log(id);
    this.router.navigateByUrl('/assignmentDetail/' + id);
  }

}
