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
    return this.http.post(this.baseURL + '/company/create', company);
  }

  getCompanyByUserId(userId: string) {
    return this.http.get<Company>(this.baseURL + '/company/getByUserId/' + userId);
  }

  updateCompany(company: Company) {
    console.log(company);
    return this.http.put(this.baseURL + '/company/update/' + company.id, company);
  }

  getAllCompanies() {
    return this.http.get<Company[]>(this.baseURL + '/company');
  }

  deleteCompany(companyId: string) {
    return this.http.delete(this.baseURL + '/company/' + companyId);
  }

  deleteCompanyByUser(companyId: string) {
    return this.http.delete(this.baseURL + '/company/deletebyuser/' + companyId);
  }
}
