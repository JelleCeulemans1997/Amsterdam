import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';
import { LocalStorageService } from './localStorage.service';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseURL = environment.baseURL;

  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService) { }

  createUser(user: User) {
    this.http.post<User>(this.baseURL + '/user/create', user).subscribe();
  }

  authenticate(user: User) {
    return this.http.post<User>(this.baseURL + '/user/login', user);
  }

  getUserbyId(userId: string) {
    return this.http.get<User>(this.baseURL + '/user/getById/' + userId);
  }
}
