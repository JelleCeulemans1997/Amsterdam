import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AssignmentService } from 'src/app/services/assignment.service';

@Component({
  selector: 'app-search-assignment',
  templateUrl: './search-assignment.component.html',
  styleUrls: ['./search-assignment.component.scss']
})
export class SearchAssignmentComponent implements OnInit {

  searchForm: FormGroup;

  constructor(private fb: FormBuilder, private assignmentService: AssignmentService) { }

  ngOnInit() {
    this.searchForm = this.fb.group({
      searchString: ['']
    });
    this.getAllAssignments();
  }

  search() {
    return this.searchForm.get('searchString').value;
  }

  getAllAssignments(){
    console.log(this.assignmentService.getAllDesc());
  }

}
