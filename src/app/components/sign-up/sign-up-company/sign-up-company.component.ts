import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material';


@Component({
  selector: 'app-sign-up-company',
  templateUrl: './sign-up-company.component.html',
  styleUrls: ['./sign-up-company.component.scss']
})
export class SignUpCompanyComponent implements OnInit {

  companyFormSignup: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.companyFormSignup = this.fb.group({
      companyName: ['', Validators.required],
      street: ['', Validators.required],
      number: ['', Validators.required],
      zipcode: ['', Validators.required],
      town: ['', Validators.required],
      biography: ['', Validators.required]
    });
  }
}
