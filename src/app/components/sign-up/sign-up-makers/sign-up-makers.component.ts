import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { MatChipInputEvent, MatAutocompleteModule, MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material';
import {map, startWith} from 'rxjs/operators';
import {Maker } from 'src/app/models/maker.model';

@Component({
  selector: 'app-sign-up-makers',
  templateUrl: './sign-up-makers.component.html',
  styleUrls: ['./sign-up-makers.component.scss']
})
export class SignUpMakersComponent implements OnInit {
  skillsarray = ['skill'];
  socialarray = ['social'];
  skillcount = 'skill';
  socialcount = 'social';

  maker: Maker = new Maker('', '', '', '', '', '', '', null, [], '', '', '', '');

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


  makerFormSignup: FormGroup;

  @ViewChild('tagInput', {static: false}) tagInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto', {static: false}) matAutocomplete: MatAutocomplete;

  constructor(private fb: FormBuilder) {
    this.filteredTags = this.tagCtrl.valueChanges.pipe(
        startWith(null),
        map((tag: string | null) => tag ? this._filter(tag) : this.allTags.slice()));
      }

  ngOnInit() {
    this.makerFormSignup = this.fb.group({
      nickname: ['', Validators.required],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', Validators.required],
      dob: ['', Validators.required],
      bio: ['', Validators.required],
      experience: ['', Validators.required],
      street: ['', Validators.required],
      number: ['', Validators.required],
      zipcode: ['', Validators.required],
      town: ['', Validators.required],
      linkedin: ['', Validators.required],
      github: ['', Validators.required],
    });
  }

  onSubmit() {
    this.maker.skills = this.tags;
    console.log(this.maker);

  }


  OnAddSocial() {
    if (this.socialarray.length < 10) {
      this.socialarray.push(this.socialcount);
    }
  }

  OnRemoveSocial(i: number) {
    if (this.socialarray.length > 1) {
      this.socialarray.splice(i, 1);
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
