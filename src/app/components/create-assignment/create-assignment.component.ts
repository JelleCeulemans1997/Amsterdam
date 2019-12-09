import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatChipInputEvent, MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material';
import { Observable } from 'rxjs';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {map, startWith} from 'rxjs/operators';
import { TagService } from 'src/app/services/tag.service';
import { mimeTypeImage } from './mime-type-image.validator';
import { AssignmentService } from 'src/app/services/assignment.service';
import { mimeTypePdf } from './mime-type-pdf.validator';

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

  @ViewChild('tagInput', {static: false}) tagInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto', {static: false}) matAutocomplete: MatAutocomplete;

  constructor(
    private tagService: TagService,
    private assignmentService: AssignmentService) {
    this.filteredTags = this.tagCtrl.valueChanges.pipe(
        startWith(null),
        map((fruit: string | null) => fruit ? this._filter(fruit) : this.allTags.slice()));
  }

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

  onSaveAssignment() {
    this.assignmentService.createAssignment(
      this.assignmentForm.value.title,
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
  //   this.assignmentForm.patchValue({ image: file });
  //   this.assignmentForm.get('image').updateValueAndValidity();
  //   const reader = new FileReader();
  //   reader.onload = () => {
  //     this.imagePreview = reader.result as string;
  //   };
  //   reader.readAsDataURL(file);
  // }

}
