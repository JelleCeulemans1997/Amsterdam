
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/user.model';
import { Observable, BehaviorSubject } from 'rxjs';
import { UserLogin } from '../models/user-login.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {
  baseURL = environment.baseURL;

  // isLoggedin = new BehaviorSubject(localStorage.getItem('token') ? true : false);
  // role = new BehaviorSubject('');

  constructor(private http: HttpClient) { }
  // authenticate(user: User) {
  //   console.log(user);
  //   return this.http.post<User>(this.baseURL + '/user/login', user);
  // }

  register(userLogin: UserLogin): Observable<User> {
    return this.http.post<User>( this.baseURL + '/register', userLogin);
  }

  loggedIn() {
    return !!localStorage.getItem('token');
  }
}
