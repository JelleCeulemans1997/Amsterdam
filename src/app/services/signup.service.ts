import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Company } from '../models/company.model';
import { environment } from 'src/environments/environment';
import { LocationDefining } from '../models/location.model';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  baseURL = environment.baseURL;

  constructor(private http: HttpClient) { }



  addMaker(nickname: string, firstname: string, lastname: string, email: string, dateofbirth: Date,
    experience: string, location: LocationDefining[], bio: string , tags: string[], github: string, linkedin: string, userId: string){
    this.http.post(this.baseURL + '/signup/createMaker/', { bio, tags, location, firstname, lastname, nickname,
       dateofbirth, experience, email, linkedin, github, userId}).subscribe(result => {
      console.log(result);
    });
  }
}
