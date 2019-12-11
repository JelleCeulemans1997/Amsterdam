import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControlName, Validators, FormControl } from '@angular/forms';
import { MatSlideToggleChange } from '@angular/material';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  account: string;
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.account = 'Developer';
    this.signupForm = new FormGroup({
      email: new FormControl(null, {validators: [Validators.required, Validators.email]}),
      password: new FormControl(null, {validators: [Validators.required]}),
      confimPassword: new FormControl(null, {validators: [Validators.required]})
    });
  }

  changedAccount(event: MatSlideToggleChange) {
    this.account = event.checked ? 'Company' : 'Account';
  }

  onSubmit() {
    console.log(this.signupForm.value);
    console.log(this.account);
    this.userService.createUser(new User('', this.signupForm.value.email, this.signupForm.value.password, this.account));
  }
}
