import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControlName, Validators, FormControl } from '@angular/forms';
import { MatSlideToggleChange, MatSnackBar } from '@angular/material';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  account: string;
  constructor(
    private userService: UserService,
    private router: Router,
    private snackbar: MatSnackBar) { }

  ngOnInit() {
    this.account = 'Developer';
    this.signupForm = new FormGroup({
      email: new FormControl(null, {validators: [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]}),
      password: new FormControl(null, {validators: [Validators.required]}),
      confirmPassword: new FormControl(null, {validators: [Validators.required]})
    });
  }

  changedAccount(event: MatSlideToggleChange) {
    this.account = event.checked ? 'Company' : 'Account';
  }

  onSubmit() {

    if (this.signupForm.value.password === this.signupForm.value.confirmPassword) {
      const user = new User('', this.signupForm.value.email, this.signupForm.value.password, this.account)
      this.userService.createUser(user).subscribe(result => {
        this.snackbar.open('Account created', 'Success', {
          duration: 3000
        });
        this.router.navigate(['/login']);
      });
    } else {
      this.snackbar.open('Passwords aren\'t identical', 'Error', {
        duration: 3000
      });
    }
  }
}
