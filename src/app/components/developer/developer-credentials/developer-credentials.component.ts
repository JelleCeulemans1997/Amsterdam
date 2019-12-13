import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { Observable } from 'rxjs';
import { Developer } from 'src/app/models/developer.model';
import { Tag } from 'src/app/models/tag.model';
import { MatAutocomplete, MatChipInputEvent, MatAutocompleteSelectedEvent } from '@angular/material';
import { UserService } from 'src/app/services/user.service';
import { CompanyService } from 'src/app/services/company.service';
import { TagService } from 'src/app/services/tag.service';
import { startWith, map } from 'rxjs/operators';
import { LocationDefining } from 'src/app/models/location.model';
import { DeveloperService } from 'src/app/services/developer.service';

@Component({
  selector: 'app-developer-credentials',
  templateUrl: './developer-credentials.component.html',
  styleUrls: ['./developer-credentials.component.scss']
})
export class DeveloperCredentialsComponent implements OnInit {

  developer: Developer;
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

  @ViewChild('tagInput', { static: false }) tagInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto', { static: false }) matAutocomplete: MatAutocomplete;

  constructor(
    private userService: UserService,
    private developerService: DeveloperService,
    private tagService: TagService,
  ) {
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
      city: new FormControl(null, { validators: [Validators.required] })
    });


    // auto load
    this.userId = this.userService.getUserId();
    this.developerService.getByUserId(this.userId).subscribe(result => {
      if (result) {
        console.log(result);
        this.editMode = true;
        this.developerId = result.id;
        const { nickname, firstname, lastname, dob, linkedIn, bio, experience, email, phone, location } = result;
        this.tags = experience;

        this.developerForm.setValue({
          nickname,
          firstname,
          lastname,
          dob,
          linkedin: linkedIn,
          bio,
          email,
          phone,
          zipcode: location.zipcode,
          city: location.city,
        });
      } else {
        this.editMode = false;
      }
    });

    this.tagService.getAllDesc().subscribe(result => {
      result.tags.forEach(element => {
        this.allTags.push(element.name);
      });
    });
  }

  onSaveDeveloper() {
    const { nickname, firstname, lastname, email, phone, dob, zipcode, city, bio, linkedin } = this.developerForm.value;
    const location = { zipcode, city };
    const userId = this.userService.getUserId();
    const developer = new Developer('', nickname, userId, firstname, lastname, email, phone, dob, bio, linkedin, this.tags, location, null);

    this.developerService.createDeveloper(developer).subscribe(result => {
      console.log(result);
    });

    if (this.editMode) {
      this.developer.id = this.developerId;
      this.developerService.updateDeveloper(developer).subscribe(result => {
        console.log(result);
        this.ngOnInit();
      });
    } else {
      this.developerService.createDeveloper(developer).subscribe(result => {
        console.log(result);
        this.ngOnInit();
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
