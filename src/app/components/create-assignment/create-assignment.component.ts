import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Observable} from 'rxjs';
import {COMMA, ENTER} from '@angular/cdk/keycodes';

@Component({
  selector: 'app-create-assignment',
  templateUrl: './create-assignment.component.html',
  styleUrls: ['./create-assignment.component.scss']
})
export class CreateAssignmentComponent implements OnInit {
  assignmentForm: FormGroup;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  tagCtrl = new FormControl();
  filteredTags: Observable<string[]>;
  tags: string[] = [];
  allTags: string[] = [];
  imagePreview: string;
  filename = '';
  token = '';

  constructor() { }

  ngOnInit() {
    this.tagService.getAllDesc().subscribe(result => {
      result.tags.forEach(tag => {
        console.log(tag.name);
        this.allTags.push(tag.name);
      });
    });
    this.assignmentForm = new FormGroup({
      title: new FormControl(null, { validators: [Validators.required] }),
      description: new FormControl(null, { validators: [Validators.required]}),
      //image: new FormControl(null, {validators: [Validators.required], asyncValidators: [mimeTypeImage]}),
      pdf: new FormControl(null, {validators: [Validators.required], asyncValidators: [mimeTypePdf]})
    });
    this.token = localStorage.getItem('token');
  }

  add(event: MatChipInputEvent): void {
    console.log(event);
    // Add fruit only when MatAutocomplete is not open
    // To make sure this does not conflict with OptionSelected Event
    if (!this.matAutocomplete.isOpen) {
      const input = event.input;
      const value = event.value;
      // Add our fruit
      if ((value || '').trim()) {
        this.tags.push(value.trim());
      }
      // Reset the input value
      if (input) {
        input.value = '';
      }
      this.tagCtrl.setValue(null);
    }
  }

  remove(fruit: string): void {
    const index = this.tags.indexOf(fruit);
    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    console.log('selected', event.option.viewValue);
    const tag = event.option.viewValue;
    if (!this.tags.includes(tag)) {
      this.tags.push(tag);
    } else {
      console.log('duplicate, show error isntead!');
    }
    console.log(this.tags);
    this.tagInput.nativeElement.value = '';
    this.tagCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allTags.filter(fruit => fruit.toLowerCase().indexOf(filterValue) === 0);
  }
//TODO: creator opvullen met id (werkt nu niet)
  onSaveAssignment() {
    this.assignmentService.createAssignment(
      this.assignmentForm.value.title,
      this.token,
      this.assignmentForm.value.description,
      this.tags,
      null,
      this.assignmentForm.value.pdf);
  }
  onPdfPicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    console.log(file);
    this.filename = file.name;
    this.assignmentForm.patchValue({ pdf: file });
    this.assignmentForm.get('pdf').updateValueAndValidity();
    console.log(this.assignmentForm.value);
    // const reader = new FileReader();
    // reader.onload = () => {
    //   this.imagePreview = reader.result as string;
    // };
    // reader.readAsDataURL(file);
  }

  // onImagePicked(event: Event) {
  //   const file = (event.target as HTMLInputElement).files[0];
  //   this.form.patchValue({ image: file });
  //   this.form.get('image').updateValueAndValidity();
  //   const reader = new FileReader();
  //   reader.onload = () => {
  //     this.imagePreview = reader.result as string;
  //   };
  //   reader.readAsDataURL(file);
  // }

}
