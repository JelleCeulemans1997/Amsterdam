import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Company } from '../models/company.model';


@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  baseURL = environment.baseURL;

  constructor(
    private http: HttpClient) { }

  createCompany(company: Company) {
    this.http.post(this.baseURL + '/company/create', company).subscribe(result => {
      console.log(result);
    });
  }
}
