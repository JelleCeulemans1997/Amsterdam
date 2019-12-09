import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthenticateService } from './services/authenticate.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Role } from './models/role';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Amsterdam';
  loggedIn : boolean;
  loginSub: Subscription;
  roleSub: Subscription;
  role: String;

  constructor(private _authService: AuthenticateService, private router: Router) {
    this._authService.role.subscribe(result => {
      console.log(result);
      this.role = result;
    })
  }

  
  
  ngOnInit() {
    this._authService.isLoggedin.subscribe(result => {
      this.loggedIn = result;
    })
  }

  get isAdmin(){
    return this.role && this.role === Role.Admin;
  }

  get isMaker(){
    return this.role && this.role === Role.Maker;
  }

  get isCompany(){
    return this.role && this.role === Role.Company;
  }

  logOut(){
    this.loginSub = this._authService.isLoggedin.subscribe(result => {
      this.loggedIn = false;
      localStorage.removeItem("token");
      this.roleSub = this._authService.role.subscribe(result => {
        this.role = "";
      })
    })  
    this.router.navigateByUrl('');
  }

  ngOnDestroy(){
    this.loginSub.unsubscribe();
    this.roleSub.unsubscribe();
  }
}
