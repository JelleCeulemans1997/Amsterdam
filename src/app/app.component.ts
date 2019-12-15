import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import * as fromRoot from './app.reducer';
import { Store, State } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { RoleDefining } from './models/role.model';

import * as fromAuth from './components/auth/auth.reducer';
import * as Auth from './components/auth/auth.actions';
import * as fromRole from './components/auth/role.reducer';
import * as RoleAction from './components/auth/role.actions';
import { LocalStorageService } from './services/localStorage.service';
import { UserService } from './services/user.service';
import { Role } from './models/role.enum';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Amsterdam';
  isAuthenticated$: Observable<boolean>;
  roles$: Observable<RoleDefining>;
  name: string;

  nameSub: Subscription;

  constructor(
    private store: Store<fromRoot.State>,
    private router: Router,
    private localStorageService: LocalStorageService,
    private userService: UserService) { }

  ngOnInit() {
    this.autoLogin();
    this.isAuthenticated$ = this.store.select(fromRoot.getIsAuth);
    this.roles$ = this.store.select(fromRoot.getWhichRole);

    this.nameSub = this.userService.sendName$.subscribe(result => {
      console.log(result);
      this.name = result;
    });
  }

  autoLogin() {
    const userId = this.userService.getUserId();
    if (userId) {
      // FIX THE NAVIGATE TO LOGIN!!
      const path = window.location.pathname;
      this.store.dispatch(new Auth.SetAuthenticated());
      this.userService.getUserbyId(userId).subscribe(result => {
        if (result.role === Role.Developer) {
          this.store.dispatch(new RoleAction.SetDeveloper());
        } else if (result.role === Role.Company) {
          this.store.dispatch(new RoleAction.SetComapny());
        } else if (result.role === Role.Admin) {
          this.store.dispatch(new RoleAction.SetAdmin());
        }
        const name =  this.localStorageService.getName();
        if (name) {
          this.userService.emitChangeName(name);
        }
        this.router.navigate([path]);
      });
    }
  }

  logout() {
    this.store.dispatch(new Auth.SetUnauthenticated());
    this.store.dispatch(new RoleAction.SetLogout());
    this.localStorageService.removeToken();
    this.localStorageService.removeName();
    this.router.navigate(['/login']);
  }

  ngOnDestroy() {
    this.nameSub.unsubscribe();
  }
}
