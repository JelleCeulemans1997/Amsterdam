import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';
import { LocalStorageService } from './localStorage.service';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseURL = environment.baseURL;
  private emitName = new Subject<string>();
  sendName$ = this.emitName.asObservable();

  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService) { }

  createUser(user: User) {
    return this.http.post<User>(this.baseURL + '/user/create', user);
  }

  authenticate(user: User) {
    return this.http.post<User>(this.baseURL + '/user/login', user);
  }

  getUserbyId(userId: string) {
    return this.http.get<User>(this.baseURL + '/user/getById/' + userId);
  }

  getUserId() {
    const token = this.localStorageService.getToken();
    if (token) {
      const jwtData = this.localStorageService.getToken().split('.')[1];
      const decodedJwt = window.atob(jwtData);
      return JSON.parse(decodedJwt)._id;
    } else {
      return null;
    }

  }

  emitChangeName(name: string) {
    this.emitName.next(name);
  }

  deleteUser(userId: string) {
    return this.http.delete(this.baseURL + '/user/' + userId);
  }
}
