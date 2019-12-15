import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {


  constructor() { }

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  removeToken() {
    localStorage.removeItem('token');
  }


  setName(name: string) {
    localStorage.setItem('name', name);
  }

  getName() {
    return localStorage.getItem('name');
  }

  removeName() {
    localStorage.removeItem('name');
  }
}
