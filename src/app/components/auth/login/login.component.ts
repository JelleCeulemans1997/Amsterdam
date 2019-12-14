import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { Store } from '@ngrx/store';
import * as fromAuth from '../auth.reducer';
import * as Auth from '../auth.actions';
import * as fromRole from '../role.reducer';
import * as RoleActions from '../role.actions';
import { LocalStorageService } from 'src/app/services/localStorage.service';
import * as fromRoot from '../../../app.reducer';
import { Router } from '@angular/router';
import { Role } from 'src/app/models/role.enum';

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
    email: new FormControl('admin@admin.com', { validators: [Validators.required] }),
    password: new FormControl('admin', { validators: [Validators.required] })
  });


  ngOnInit() {
  }

  login() {
    const user = new User(null, this.loginForm.value.email, this.loginForm.value.password, null);
    this.userService.authenticate(user).subscribe(result => {
      this.store.dispatch(new Auth.SetAuthenticated());
      this.localStorageService.setToken(result.token);
      let navigateTo;
      if (result.role === Role.Developer) {
        navigateTo = '/developerDashboard';
        this.store.dispatch(new RoleActions.SetDeveloper());
      } else  if (result.role === Role.Company) {
        navigateTo = '/company';
        this.store.dispatch(new RoleActions.SetComapny());
      } else if (result.role === Role.Admin) {
        navigateTo = '';
        this.store.dispatch(new RoleActions.SetAdmin());
      }
      console.log(navigateTo);
      this.router.navigate([navigateTo]);
    }, error => {
      console.log(error);
    });
  }
}
