import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Developer } from '../models/developer.model';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class DeveloperService {

  baseURL = environment.baseURL;

  constructor(private http: HttpClient) { }

  createDeveloper(developer: Developer) {
    return this.http.post<Developer>(this.baseURL + '/developer/create', developer);
  }

  getByUserId(userId: string) {
    return this.http.get<Developer>(this.baseURL + '/developer/' + userId);
  }

  updateDeveloper(developer: Developer) {
    return this.http.put<Developer>(this.baseURL + '/developer/update/' + developer.id, developer);
  }

  getAll() {
    return this.http.get<Developer[]>(this.baseURL + '/developer');
  }

  deleteDeveloperByUser(userId: string) {
    return this.http.delete(this.baseURL + '/developer/deletebyuser/' + userId);
  }
}
