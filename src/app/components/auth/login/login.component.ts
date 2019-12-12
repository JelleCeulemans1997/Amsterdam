import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { Store } from '@ngrx/store';
import * as fromAuth from '../auth.reducer';
import * as Auth from '../auth.actions';
import * as fromRole from '../role.reducer';
import * as Role from '../role.actions';
import { LocalStorageService } from 'src/app/services/localStorage.service';
import * as fromRoot from '../../../app.reducer';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  // model = new UserLogin('', '');

  // isCorrect = false;
  // isRegister = true;
  // submitted = false;

  constructor(
    private userService: UserService,
    private localStorageService: LocalStorageService,
    private store: Store<{ ui: fromAuth.State, us: fromRole.State }>,
    private router: Router
    ) { }

  loginForm = new FormGroup({
    email: new FormControl('info@jelleceulemans.be', { validators: [Validators.required] }),
    password: new FormControl('azertyuiop', { validators: [Validators.required] })
  });


  ngOnInit() {
  }

  login() {
    const user = new User(null, this.loginForm.value.email, this.loginForm.value.password, null);
    this.userService.authenticate(user).subscribe(result => {
      this.store.dispatch(new Auth.SetAuthenticated());
      this.localStorageService.setToken(result.token);
      let navigateTo;
      if (result.role === 'Developer') {
        navigateTo = '/developerDashboard';
        this.store.dispatch(new Role.SetDeveloper());
      } else {
        navigateTo = '/company';
        this.store.dispatch(new Role.SetComapny());
      }
      console.log(navigateTo);
      this.router.navigate([navigateTo]);
    }, error => {
      console.log(error);
    });
  }
}
