import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatChipInputEvent, MatAutocomplete, MatAutocompleteSelectedEvent, MatSnackBar } from '@angular/material';
import { Observable } from 'rxjs';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { map, startWith } from 'rxjs/operators';
import { TagService } from 'src/app/services/tag.service';
import { mimeTypeImage } from '../../../../file-validators/mime-type-image.validator';
import { AssignmentService } from 'src/app/services/assignment.service';
import { mimeTypePdf } from '../../../../file-validators/mime-type-pdf.validator';
import { LocationDefining } from '../../../../models/location.model';
import { Assignment } from 'src/app/models/assignment.model';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Tag } from 'src/app/models/tag.model';
import * as firebase from 'firebase/app';
import { LocalStorageService } from 'src/app/services/localStorage.service';
import { UserService } from 'src/app/services/user.service';
import { CompanyService } from 'src/app/services/company.service';

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
  token = '';
  editMode = false;
  assignmentId: string;
  tagObjects: Tag[];
  pdf: string;
  showAssessment = false;
  accepted: any;
  applies: any;
  denied: any;


  @ViewChild('tagInput', { static: false }) tagInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto', { static: false }) matAutocomplete: MatAutocomplete;

  constructor(
    private tagService: TagService,
    private assignmentService: AssignmentService,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private companyService: CompanyService,
    private snackbar: MatSnackBar) {
    this.filteredTags = this.tagCtrl.valueChanges.pipe(
      startWith(null),
      map((fruit: string | null) => fruit ? this._filter(fruit) : this.allTags.slice()));
  }

  ngOnInit() {
    this.companyService.getCompanyByUserId(this.userService.getUserId()).subscribe(result => {
      this.showAssessment = result ? true : false;
    });

    this.tagService.getAllDesc().subscribe(result => {
      this.tagObjects = result.tags;
      result.tags.forEach(element => {
        this.allTags.push(element.name);
      });
    });


    this.assignmentForm = new FormGroup({
      title: new FormControl(null, { validators: [Validators.required] }),
      description: new FormControl(null, { validators: [Validators.required] }),
      // image: new FormControl(null, {validators: [Validators.required], asyncValidators: [mimeTypeImage]}),
      // pdf: new FormControl(null, {validators: [Validators.required], asyncValidators: [mimeTypePdf]}),
      street: new FormControl(null, { validators: [Validators.required] }),
      nr: new FormControl(null, { validators: [Validators.required] }),
      zipcode: new FormControl(null, { validators: [Validators.required] }),
      city: new FormControl(null, { validators: [Validators.required] }),
    });

    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('assignmentId')) {
        this.editMode = true;
        this.assignmentId = paramMap.get('assignmentId');
        this.assignmentService.getAssignmentById(this.assignmentId).subscribe(result => {
          console.log(result);
          this.applies = result.assignment.applies;
          this.accepted = result.assignment.accepted;
          this.denied = result.assignment.denied;
          this.pdf = result.assignment.pdf;
          const assignment = result.assignment;
          this.tags = assignment.tags;
          this.assignmentForm.setValue({
            title: assignment.title,
            description: assignment.description,
            street: assignment.location.street,
            nr: assignment.location.nr,
            zipcode: assignment.location.zipcode,
            city: assignment.location.city
          });
        });
      } else {
        this.editMode = false;
        this.assignmentId = null;
      }
    });
    this.token = localStorage.getItem('token');
  }

  onSaveAssignment() {

    // Add or update tags in database
    this.tags.forEach(element => {
      if (!this.allTags.includes(element)) {
        this.tagService.createTag(new Tag('', element, 1)).subscribe();
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
      this.userService.getUserId(),
      this.pdf,
      [],
      [],
      []);
    if (!this.editMode) {
      this.assignmentService.createAssignment(assignment).subscribe(result => {
        this.router.navigate(['/company']);
      });
    } else {
      assignment.denied = this.denied;
      assignment.accepted = this.accepted;
      assignment.applies = this.applies;
      assignment.id = this.assignmentId;
      console.log(assignment);
      this.assignmentService.updateAssignment(assignment).subscribe(result => {
        this.router.navigate(['/company']);
      });
    }
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


  onPdfPicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    console.log(file);
    if (file.type === 'application/pdf') {
      const path = `pdf/${new Date().getTime()}_${file.name}`;
      const customMetadata = { contentType: file.type, app: 'DEV-COM connect' };
      const storageRef: firebase.storage.Reference = firebase.storage().ref(path);
      storageRef.put(file, customMetadata).then(() => {
        storageRef.getDownloadURL().then(result => {
          this.snackbar.open('PDF uploaded', 'Success', {
            duration: 3000
          });
          this.pdf = result;
        });
      });
    } else {
      this.snackbar.open('only pdf allowed!', 'Error', {
        duration: 3000
      });
    }

  }
}
