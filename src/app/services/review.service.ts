import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Developer } from '../models/developer.model';
import { environment } from 'src/environments/environment';
import { Company } from '../models/company.model';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  baseURL = environment.baseURL;

  constructor(private http: HttpClient) { }

  // getDeveloperByUserId(userId: string) {
  //   return this.http.get<Developer>(this.baseURL + '/developer/getByUserId/' + userId);
  // }

  getCompanyByUserId(userId: string) {
    return this.http.get<Company>(this.baseURL + '/company/getByUserId/' + userId);
  }
}
