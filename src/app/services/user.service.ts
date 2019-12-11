import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseURL = environment.baseURL;

  constructor(private http: HttpClient) { }

  createUser(user: User) {
    this.http.post<User>(this.baseURL + '/user/create', user).subscribe(result => {
      console.log(result);
    });
  }
}
