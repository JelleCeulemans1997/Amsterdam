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
import { LocationDefining } from '../../../models/location.model';
import { Assignment } from 'src/app/models/assignment.model';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Tag } from 'src/app/models/tag.model';

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
  editMode = false;
  assignmentId: string;
  tagObjects: Tag[];

  @ViewChild('tagInput', {static: false}) tagInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto', {static: false}) matAutocomplete: MatAutocomplete;

  constructor(
    private tagService: TagService,
    private assignmentService: AssignmentService,
    private route: ActivatedRoute) {
    this.filteredTags = this.tagCtrl.valueChanges.pipe(
        startWith(null),
        map((fruit: string | null) => fruit ? this._filter(fruit) : this.allTags.slice()));
  }

  ngOnInit() {
    this.tagService.getAllDesc().pipe(map(result => {
      return {
        tags: result.tags.map(tag => {
          return {
            id: tag._id,
            name: tag.name,
            usages: tag.usages
          };
        })
      };
    })).subscribe(result => {
      this.tagObjects = Object.assign([], result.tags);
      result.tags.forEach(element => {
        this.allTags.push(element.name);
      });
    });


    this.assignmentForm = new FormGroup({
      title: new FormControl(null, { validators: [Validators.required] }),
      description: new FormControl(null, { validators: [Validators.required]}),
      // image: new FormControl(null, {validators: [Validators.required], asyncValidators: [mimeTypeImage]}),
      // pdf: new FormControl(null, {validators: [Validators.required], asyncValidators: [mimeTypePdf]}),
      street: new FormControl(null, {validators: [Validators.required]}),
      nr: new FormControl(null, {validators: [Validators.required]}),
      zipcode: new FormControl(null, {validators: [Validators.required]}),
      city: new FormControl(null, {validators: [Validators.required]}),
    });

    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('assignmentId')) {
        this.editMode = true;
        this.assignmentId = paramMap.get('assignmentId');
        this.assignmentService.getAssignmentById(this.assignmentId).subscribe(result => {
          this.tags = result.tags;
          this.assignmentForm.setValue({
            title: result.title,
            description: result.description,
            street: result.location[0].street,
            nr: result.location[0].nr,
            zipcode: result.location[0].zipcode,
            city: result.location[0].city
          });
        });


        // this.postSService.getPost(this.postId).subscribe(postData => {
        //   this.post = {
        //     id: postData._id,
        //     title: postData.title,
        //     content: postData.content,
        //     imagePath: postData.imagePath,
        //     creator: postData.creator};
        //   this.assignmentForm.setValue({
        //     title: this.post.title,
        //     content: this.post.content,
        //     image: this.post.imagePath
        //   });
        // });

      } else {
        this.editMode = false;
        this.assignmentId = null;
      }
    });
    this.token = localStorage.getItem('token');
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
    // Add or update tags in database
    this.tags.forEach(element => {
      if (!this.allTags.includes(element)) {
        // this.tagService.createTag(new Tag('', element, 1));
      } else if (!this.editMode) {
        const tag = this.tagObjects.find(t => t.name === element);
        tag.usages++;
        this.tagService.updateTag(tag);
      }
    });
    const location: LocationDefining = {
      street: this.assignmentForm.value.street,
      nr: this.assignmentForm.value.nr,
      zipcode: this.assignmentForm.value.zipcode,
      city: this.assignmentForm.value.city,
    };
    const assignment = new Assignment(
      '',
      this.assignmentForm.value.title,
      this.assignmentForm.value.description,
      this.tags,
      location,
      localStorage.getItem('token'));
    if (!this.editMode) {
      this.assignmentService.createAssignment(assignment);
    } else {
      assignment.id = this.assignmentId;
      this.assignmentService.updateAssignment(assignment);
    }
  }
  // onPdfPicked(event: Event) {
  //   const file = (event.target as HTMLInputElement).files[0];
  //   console.log(file);
  //   this.filename = file.name;
  //   this.assignmentForm.patchValue({ pdf: file });
  //   this.assignmentForm.get('pdf').updateValueAndValidity();
  // }

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