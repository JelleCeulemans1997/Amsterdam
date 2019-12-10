import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { AuthenticateService } from './../../../services/authenticate.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserLogin } from '../../../models/user-login.model';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  model = new UserLogin('', '');

  isCorrect = false;
  isRegister = true;
  submitted = false;

  constructor(private authenticateService : AuthenticateService, private fb: FormBuilder,  private router: Router) {
    // redirect to home if already logged in
    this.authenticateService.isLoggedin.subscribe(result => {
      if (result) {
        this.router.navigate(['/']);
    }
    })

  }

  loginForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
    });


  ngOnInit() {
  }

  login(){
    this.authenticateService.authenticate(this.loginForm.value).subscribe(result => {
      this.submitted = true;
      localStorage.setItem("token",result.token);
      this.authenticateService.isLoggedin.next(result.token ? true : false);
      this.authenticateService.role.next(result.role);
      console.log("User is logged in!");
      this.router.navigateByUrl('/signUp');
      },
      (error:HttpErrorResponse) => {
          let errorPayload = JSON.parse(error.message);
          //ToDo: apply your handling logic e.g.:
          //console.log(errorPayload[0].description
          // this.isCorrect = true;
          this.submitted = false;
          console.log(error.error);
      });
  }

}
