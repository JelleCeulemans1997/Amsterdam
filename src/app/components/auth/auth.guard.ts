import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../app.reducer';
import { take } from 'rxjs/operators';

@Injectable()
export class AuthGuard implements CanActivate {
    // isAuth: boolean;
    hasRightRole: boolean;

    constructor(
      private store: Store<fromRoot.State>,
      private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        // this.store.select(fromRoot.getIsAuth).pipe(take(1)).subscribe(value => {
        //     this.isAuth = value;
        // });
        this.store.select(fromRoot.getWhichRole).pipe(take(1)).subscribe(result => {
          this.hasRightRole = result[route.data.role];
        });
        // check
        if  (this.hasRightRole) {
            return true;
        } else {
          this.router.navigate(['/login']);
        }
    }
}
