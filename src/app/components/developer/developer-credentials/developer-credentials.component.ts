import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { Observable } from 'rxjs';
import { Developer } from 'src/app/models/developer.model';
import { Tag } from 'src/app/models/tag.model';
import { MatAutocomplete, MatChipInputEvent, MatAutocompleteSelectedEvent, MatSnackBar } from '@angular/material';
import { UserService } from 'src/app/services/user.service';
import { TagService } from 'src/app/services/tag.service';
import { startWith, map } from 'rxjs/operators';
import { LocationDefining } from 'src/app/models/location.model';
import { DeveloperService } from 'src/app/services/developer.service';
import { mimeTypeImage } from 'src/app/file-validators/mime-type-image.validator';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-developer-credentials',
  templateUrl: './developer-credentials.component.html',
  styleUrls: ['./developer-credentials.component.scss']
})
export class DeveloperCredentialsComponent implements OnInit {

  developerForm: FormGroup;
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  tagCtrl = new FormControl();
  filteredTags: Observable<string[]>;
  tags: string[] = [];
  allTags: string[] = [];
  tagObjects: Tag[];
  editMode = false;
  userId: string;
  developerId: string;
  imagePreview: string;
  dev: any;
  downloadImage: string;
  cv: string;

  @ViewChild('tagInput', { static: false }) tagInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto', { static: false }) matAutocomplete: MatAutocomplete;

  constructor(
    private userService: UserService,
    private developerService: DeveloperService,
    private tagService: TagService,
    private snackbar: MatSnackBar,
    private datePipe: DatePipe,
    private router: Router) {

    this.filteredTags = this.tagCtrl.valueChanges.pipe(
      startWith(null),
      map((tag: string | null) => tag ? this._filter(tag) : this.allTags.slice()));
  }

  ngOnInit() {
    this.developerForm = new FormGroup({
      nickname: new FormControl(null, { validators: [Validators.required] }),
      firstname: new FormControl(null, { validators: [Validators.required] }),
      lastname: new FormControl(null, { validators: [Validators.required] }),
      dob: new FormControl(null, { validators: [Validators.required] }),
      linkedin: new FormControl(null, { validators: [Validators.required] }),
      bio: new FormControl(null, { validators: [Validators.required] }),
      email: new FormControl(null, { validators: [Validators.required, Validators.email] }),
      phone: new FormControl(null, { validators: [Validators.required] }),
      zipcode: new FormControl(null, { validators: [Validators.required] }),
      city: new FormControl(null, { validators: [Validators.required] }),
      // image: new FormControl(null, { validators: [], asyncValidators: [mimeTypeImage] }),
    });


    // auto load
    this.userId = this.userService.getUserId();
    this.developerService.getByUserId(this.userId).subscribe(result => {
      if (result) {
        console.log(result);
        this.editMode = true;
        this.developerId = result.id;
        const { nickname, firstname, lastname, dob, linkedIn, bio, experience, email, phone, location, image, cv } = result;
        this.tags = experience;
        this.downloadImage = image;
        this.cv = cv;

        let dateString = dob.toString();
        dateString = dateString.substring(0, 10);
        this.developerForm.setValue({
          nickname,
          firstname,
          lastname,
          dob: dateString,
          linkedin: linkedIn,
          bio,
          email,
          phone,
          zipcode: location.zipcode,
          city: location.city,
          // image: null
        });
      } else {
        this.editMode = false;
      }
    });

    // this.tagService.getAllDesc().subscribe(result => {
    //   result.tags.forEach(element => {
    //     this.allTags.push(element.name);
    //   });
    // });
    this.tagService.getAllDesc().subscribe(result => {
      this.tagObjects = result.tags;
      result.tags.forEach(element => {
        this.allTags.push(element.name);
      });
    });
    console.log(this.allTags);

  }
  // transformDate(date) {
  //   this.datePipe.transform(date, 'dd-mm-yyyy'); // whatever format you need.
  // }
  goToProfile() {
    const userId = this.userService.getUserId();
    this.developerService.getByUserId(userId).subscribe(result => {
      console.log(result);
      if (result) {
        this.router.navigate(['/developerProfile/' + userId]);
      } else {
        this.snackbar.open('First fill in your credentials', 'Error', {
          duration: 3000
        });
      }
    });
  }

  onSaveDeveloper() {
    const { nickname, firstname, lastname, email, phone, dob, zipcode, city, bio, linkedin } = this.developerForm.value;
    const location = { zipcode, city };
    const userId = this.userService.getUserId();
    this.dev = this.userService.getUserbyId(userId);
    const developer = new Developer(
      '',
      nickname,
      userId,
      firstname,
      lastname,
      email,
      phone,
      dob,
      bio,
      linkedin,
      this.tags,
      location,
      this.dev.reviews,
      this.downloadImage,
      this.cv);

    console.log('test1');
    // Add or update tags in database
    this.tags.forEach(element => {
      console.log('test: ' + element);
      if (!this.allTags.includes(element)) {
        console.log('nieuw element: ' + element);
        this.tagService.createTag(new Tag('', element, 1)).subscribe();
      } else if (!this.editMode) {
        console.log('here');
        const tag = this.tagObjects.find(t => t.name === element);
        tag.usages++;
        this.tagService.updateTag(tag);
      }
    });



    if (this.editMode) {
      developer.id = this.developerId;
      this.developerService.updateDeveloper(developer).subscribe(result => {
        this.ngOnInit();
      });
    } else {
      this.developerService.createDeveloper(developer).subscribe(result => {
        this.ngOnInit();
      });
    }
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
          console.log(result);
          this.snackbar.open('CV uploaded', 'Success', {
            duration: 3000
          });
          this.cv = result;
        });
      });
    } else {
      this.snackbar.open('only pdf allowed!', 'Error', {
        duration: 3000
      });
    }
  }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    if (file.type.includes('image/')) {
      const path = `images/${new Date().getTime()}_${file.name}`;
      const customMetadata = { contentType: file.type, app: 'DEV-COM connect' };
      const storageRef: firebase.storage.Reference = firebase.storage().ref(path);
      storageRef.put(file, customMetadata).then(() => {
        storageRef.getDownloadURL().then(result => {
          console.log(result);
          this.downloadImage = result;
        });
      });
    } else {
      this.snackbar.open('only images allowed!', 'Error', {
        duration: 3000
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
}
