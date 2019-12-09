import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { AuthenticateService } from 'src/app/services/authenticate.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserLogin } from 'src/app/models/user-login.model';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  model = new UserLogin('','');

  isCorrect: boolean = false;
  isRegister: boolean = true;
  submitted : boolean = false;

  constructor(private _authenticateService : AuthenticateService, private fb: FormBuilder,  private router: Router) { 
    // redirect to home if already logged in
    this._authenticateService.isLoggedin.subscribe(result => {
      if (result == true) { 
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
    this._authenticateService.authenticate(this.loginForm.value).subscribe(result => {
      this.submitted = true;
      localStorage.setItem("token",result.token);
      this._authenticateService.isLoggedin.next(result.token ? true : false);
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
