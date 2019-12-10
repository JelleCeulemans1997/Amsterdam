import { Component, OnInit, ViewChild } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { SignUpCompanyComponent } from '../sign-up-company/sign-up-company.component';
import { SignUpMakersComponent } from '../sign-up-makers/sign-up-makers.component';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  @ViewChild(SignUpCompanyComponent, null) companyCmp: SignUpCompanyComponent;
  @ViewChild(SignUpMakersComponent, null) makerCmp: SignUpCompanyComponent;

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;

  userType: string;

  constructor(private fb: FormBuilder) { }

  setMaker() {
    this.userType = 'm';
  }

  setCompany() {
    this.userType = 'c';
  }

  ngOnInit() {
    this.firstFormGroup = this.fb.group({
      makerBtn:  new FormControl(),
      companyBtn: new FormControl()
    });
    this.secondFormGroup = this.fb.group({
      secondCtrl: ''
    });
    this.thirdFormGroup = this.fb.group({
      thirdCtrl: ''
    });
  }

  onSubmit() {
    if (this.userType == 'c'){
      this.companyCmp.onSubmit();
    } else {
      this.makerCmp.onSubmit();
    }
  }
}
