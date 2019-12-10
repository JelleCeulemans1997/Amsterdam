import { Component, OnInit, ViewChild } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { SignUpCompanyComponent } from '../sign-up-company/sign-up-company.component';
import { SignUpMakersComponent } from '../sign-up-makers/sign-up-makers.component';
import { UserLogin } from 'src/app/models/user-login.model';
import { User } from 'src/app/models/user.model';
import { AuthenticateService } from 'src/app/services/authenticate.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

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
  user: UserLogin = new UserLogin('', '', '', '');
  userId : string;

  userType: string;

  constructor(private fb: FormBuilder, private authService: AuthenticateService, private router: Router) { }

  setMaker() {
    this.userType = 'm';
  }

  setCompany() {
    this.userType = 'c';
  }

  ngOnInit() {
    this.firstFormGroup = this.fb.group({
      name: new FormControl(),
      email: new FormControl(),
      password: new FormControl(),
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
    if(this.userType == 'c'){
      this.user.role = "Company";
       this.authService.register(this.user).subscribe(result => {
        this.userId = result._id;
        this.companyCmp.onSubmit(this.userId);
      });
    }else{
      this.user.role = "Maker";
      this.authService.register(this.user).subscribe(result => {
        this.userId = result._id;
        this.makerCmp.onSubmit(this.userId);
      });
    }
    this.router.navigateByUrl('/signIn');
  }
}
