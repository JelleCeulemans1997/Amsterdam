import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatAutocompleteSelectedEvent, MatAutocomplete } from '@angular/material/autocomplete';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Company } from 'src/app/models/company.model';
import { LocationDefining } from 'src/app/models/location.model';
import { TagService } from 'src/app/services/tag.service';
import { Tag } from 'src/app/models/tag.model';
import { CompanyService } from 'src/app/services/company.service';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-company-credentials',
  templateUrl: './company-credentials.component.html',
  styleUrls: ['./company-credentials.component.scss']
})

export class CompanyCredentialsComponent implements OnInit {

  company: Company;
  //  = new Company('', '', '', '', '', '', []);s
  companyForm: FormGroup;
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
  companyId: string;

  @ViewChild('tagInput', { static: false }) tagInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto', { static: false }) matAutocomplete: MatAutocomplete;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private companyService: CompanyService,
    private tagService: TagService,
  ) {
    this.filteredTags = this.tagCtrl.valueChanges.pipe(
      startWith(null),
      map((tag: string | null) => tag ? this._filter(tag) : this.allTags.slice()));
  }

  ngOnInit() {
    this.companyForm = new FormGroup({
      name: new FormControl(null, { validators: [Validators.required] }),
      firstname: new FormControl(null, { validators: [Validators.required] }),
      lastname: new FormControl(null, { validators: [Validators.required] }),
      email: new FormControl(null, { validators: [Validators.required, Validators.email] }),
      phone: new FormControl(null, { validators: [Validators.required] }),
      street: new FormControl(null, { validators: [Validators.required] }),
      nr: new FormControl(null, { validators: [Validators.required] }),
      zipcode: new FormControl(null, { validators: [Validators.required] }),
      city: new FormControl(null, { validators: [Validators.required] }),
      bio: new FormControl(null, { validators: [Validators.required] }),
    });


    // auto load
    this.userId = this.userService.getUserId();
    this.companyService.getCompanyByUserId(this.userId).subscribe(result => {
      if (result) {
        console.log(result);
        this.companyId = result.id;
        this.editMode = true;
        const { name, bio, tags, contact, location } = result;
        this.tags = tags;

        this.companyForm.setValue({
          name,
          bio,
          firstname: contact.firstname,
          lastname: contact.lastname,
          email: contact.email,
          phone: contact.phone,
          street: location.street,
          nr: location.nr,
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

  onSaveCompany() {
    const { name, firstname, lastname, email, phone, street, nr, zipcode, city, bio } = this.companyForm.value;
    const contact = { firstname, lastname, email, phone };
    const location: LocationDefining = { street, nr, zipcode, city };
    const userId = this.userService.getUserId();
    const company = new Company('', name, userId, contact, location, this.tags, bio, null, null);

    if (this.editMode) {
      company.id = this.companyId;
      this.companyService.updateCompany(company).subscribe(result => {
        console.log(result);
        this.ngOnInit();
      });
    } else {
      this.companyService.createCompany(company).subscribe(result => {
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
