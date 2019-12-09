import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthenticateService } from './services/authenticate.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Amsterdam';

  constructor(private _authService: AuthenticateService, private router: Router) {}

  loggedIn : boolean;
  loginSub: Subscription
  
  ngOnInit() {
    this._authService.isLoggedin.subscribe(result => {
      this.loggedIn = result;
    })
  }

  logOut(){
    this.loginSub = this._authService.isLoggedin.subscribe(result => {
      this.loggedIn = false;
      localStorage.removeItem("token");
    })
    
    this.router.navigateByUrl('');
  }

  ngOnDestroy(){
    this.loginSub.unsubscribe();
  }
}
