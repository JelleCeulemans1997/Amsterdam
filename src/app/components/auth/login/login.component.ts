import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticateService } from '../../../services/authenticate.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserLogin } from '../../../models/user-login.model';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  model = new UserLogin('', '');

  isCorrect = false;
  isRegister = true;
  submitted = false;

  constructor(
    private authenticateService: AuthenticateService,
    private fb: FormBuilder,
    private router: Router) {
    // redirect to home if already logged in
    this.authenticateService.isLoggedin.subscribe(result => {
      if (result) {
        this.router.navigate(['/']);
      }
    });

  }

  loginForm = new FormGroup({
    email: new FormControl('jelle.ceulemans@hotmail.com', { validators: [Validators.required] }),
    password: new FormControl('azertyuiop', { validators: [Validators.required] })
  });


  ngOnInit() {
  }

  login() {
    const user = new User('', this.loginForm.value.email, this.loginForm.value.password, null);
    this.authenticateService.authenticate(user).subscribe(result => {
      console.log(result);
      // this.submitted = true;
      // localStorage.setItem('token', result.token);
      // this.authenticateService.isLoggedin.next(result.token ? true : false);
      // this.authenticateService.role.next(result.role);
      // console.log('User is logged in!');
      // this.router.navigateByUrl('/signUp');
      // },
      // (error: HttpErrorResponse) => {
      //     const errorPayload = JSON.parse(error.message);
      //     // ToDo: apply your handling logic e.g.:
      //     // console.log(errorPayload[0].description
      //     // this.isCorrect = true;
      //     this.submitted = false;
      //     console.log(error.error);
    });
  }
}
