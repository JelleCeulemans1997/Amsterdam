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
import { DeveloperService } from 'src/app/services/developer.service';
import { CompanyService } from 'src/app/services/company.service';
import { MatSnackBar } from '@angular/material';

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
    private router: Router,
    private developerService: DeveloperService,
    private companyService: CompanyService,
    private snackbar: MatSnackBar
    ) { }

  loginForm = new FormGroup({
    email: new FormControl(null, { validators: [Validators.required] }),
    password: new FormControl(null, { validators: [Validators.required] })
  });


  ngOnInit() {
  }

  login() {
    const user = new User(null, this.loginForm.value.email, this.loginForm.value.password, null);
    this.userService.authenticate(user).subscribe(result => {
      console.log(result);
      this.store.dispatch(new Auth.SetAuthenticated());
      this.localStorageService.setToken(result.token);
      let navigateTo;
      if (result.role === Role.Developer) {
        this.developerService.getByUserId(this.userService.getUserId()).subscribe(developer => {
          this.userService.emitChangeName(developer.nickname);
          this.localStorageService.setName(developer.nickname);
        });
        navigateTo = '/developerDashboard';
        this.store.dispatch(new RoleActions.SetDeveloper());
      } else  if (result.role === Role.Company) {
        this.companyService.getCompanyByUserId(this.userService.getUserId()).subscribe(company => {
          this.userService.emitChangeName(company.name);
          this.localStorageService.setName(company.name);
          console.log(company);
        });
        navigateTo = '/company';
        this.store.dispatch(new RoleActions.SetComapny());
      } else if (result.role === Role.Admin) {
        this.userService.emitChangeName('Administrator');
        this.localStorageService.setName('Administrator');
        navigateTo = '';
        this.store.dispatch(new RoleActions.SetAdmin());
      }
      console.log(navigateTo);
      this.router.navigate([navigateTo]);
    }, error => {
      this.snackbar.open('Login failed', 'Error', {
        duration: 3000
      });
    });
  }
}
