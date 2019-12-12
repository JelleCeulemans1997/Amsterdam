import { Action } from '@ngrx/store';

export const DEVELOPER = 'Developer';
export const COMPANY = 'Company';
export const ADMIN = 'Admin';
export const LOGOUT = 'Logout';


export class SetDeveloper implements Action {
  readonly type = DEVELOPER;
}

export class SetComapny implements Action {
  readonly type = COMPANY;
}

export class SetAdmin implements Action {
  readonly type = ADMIN;
}

export class SetLogout implements Action {
  readonly type = LOGOUT;
}

export type RoleActions = SetDeveloper | SetComapny | SetAdmin | SetLogout;
