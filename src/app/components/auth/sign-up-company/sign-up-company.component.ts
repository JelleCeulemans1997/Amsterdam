import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatAutocompleteSelectedEvent, MatAutocomplete} from '@angular/material/autocomplete';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { SignupService } from 'src/app/services/signup.service';
import {Company} from 'src/app/models/company.model';
import { LocationDefining } from 'src/app/models/location.model';


@Component({
  selector: 'app-sign-up-company',
  templateUrl: './sign-up-company.component.html',
  styleUrls: ['./sign-up-company.component.scss']
})

export class SignUpCompanyComponent implements OnInit {

  company: Company;
  //  = new Company('', '', '', '', '', '', []);
  companyFormSignup: FormGroup;
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

  constructor(private fb: FormBuilder, private signupService: SignupService) {
    this.filteredTags = this.tagCtrl.valueChanges.pipe(
        startWith(null),
        map((tag: string | null) => tag ? this._filter(tag) : this.allTags.slice()));
       }

  // onSubmit(userId: string) {
  //   const tags = this.tags;
  //   const location: LocationDefining = {
  //     street: this.company.street,
  //     nr: this.company.nr,
  //     zipcode: this.company.zipcode,
  //     city:  this.company.town
  //   }
  //   console.log(this.company);
  //   console.log(location)
  //   this.signupService.addCompany(this.company.companyname, [location], this.company.bio, tags, userId);
  // }

  ngOnInit() {
    this.companyFormSignup = this.fb.group({
      name: ['', Validators.required],
      street: [''],
      nr: [''],
      zipcode: ['', Validators.required],
      city: ['', Validators.required],
      bio: ['', Validators.required]
    });
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
