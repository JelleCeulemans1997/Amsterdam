
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

  isLoggedin = new BehaviorSubject(localStorage.getItem('token')? true : false);
  role = new BehaviorSubject('');

  constructor(private httpClient: HttpClient) { }
  authenticate(userLogin: UserLogin): Observable<User> {
    return this.httpClient.post<User>(this.baseURL + '/user/login', userLogin);
  }

  register(userLogin: UserLogin): Observable<User> {
    return this.httpClient.post<User>( this.baseURL + '/register', userLogin);
  }

  loggedIn() {
    return !!localStorage.getItem('token');
  }
}
