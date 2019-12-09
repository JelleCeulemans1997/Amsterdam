import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

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
}
