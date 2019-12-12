import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthenticateService } from './services/authenticate.service';
import { Router } from '@angular/router';

import * as fromRoot from './app.reducer';
import { Store, State } from '@ngrx/store';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { RoleDefining } from './models/role.model';

import * as fromAuth from './components/auth/auth.reducer';
import * as Auth from './components/auth/auth.actions';
import * as fromRole from './components/auth/role.reducer';
import * as RoleAction from './components/auth/role.actions';
import { LocalStorageService } from './services/localStorage.service';
import { UserService } from './services/user.service';
import { Role } from './models/role';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Amsterdam';
  isAuthenticated$: Observable<boolean>;
  roles$: Observable<RoleDefining>;

  constructor(
    private store: Store<fromRoot.State>,
    private router: Router,
    private localStorageService: LocalStorageService,
    private userService: UserService) { }

  ngOnInit() {
    this.autoLogin();
    this.isAuthenticated$ = this.store.select(fromRoot.getIsAuth);
    this.roles$ = this.store.select(fromRoot.getWhichRole);
  }

  autoLogin() {
    const token = this.localStorageService.getToken();
    if (this.localStorageService.getToken()) {
      // FIX THE NAVIGATE TO LOGIN!!
      const path = window.location.pathname;

      const jwtData = this.localStorageService.getToken().split('.')[1];
      const decodedJwt = window.atob(jwtData);
      const userId = JSON.parse(decodedJwt)._id;

      this.store.dispatch(new Auth.SetAuthenticated());
      this.userService.getUserbyId(userId).subscribe(result => {
        if (result.role === Role.Developer) {
          this.store.dispatch(new RoleAction.SetDeveloper());
        } else {
          this.store.dispatch(new RoleAction.SetComapny());
        }
        this.router.navigate([path]);
      });
    }
  }

  logout() {
    this.store.dispatch(new Auth.SetUnauthenticated());
    this.store.dispatch(new RoleAction.SetLogout());
    this.localStorageService.removeToken();
    this.router.navigate(['/login']);
  }
}
