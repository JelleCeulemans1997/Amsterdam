import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Assignment } from '../models/assignment.model';
import { LocationDefining } from '../models/location.model';
import { map } from 'rxjs/operators';
import { User } from '../models/user.model';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AssignmentService {
  baseURL = environment.baseURL;

  // Make all the necessary services available
  constructor(private router: Router, private http: HttpClient) { }

  createAssignment(assignment: Assignment) {
    // const postData = new FormData();
    // postData.append('title', title);
    // postData.append('description', description);
    // postData.append('tags', JSON.stringify(tags));
    // postData.append('location', JSON.stringify(location));
    // postData.append('pdf', pdf, title);
    // console.log(postData);
    return this.http.post<{ message: string; assignment: Assignment }>(this.baseURL + '/assignment/create', assignment);
  }

  getAssignmentById(assingmentId: string) {
    return this.http.get<{ message: string; assignment: Assignment }>(this.baseURL + '/assignment/' + assingmentId);
  }

  updateAssignment(assignment: Assignment) {
    return this.http.put<Assignment>(this.baseURL + '/assignment/' + assignment.id, assignment);
  }

  // getAllDesc() {
  //   return this.http.get<{tags: any}>(this.baseURL + '/tag/allDesc').pipe(map(result => {
  //     return {
  //       tags: result.tags.map(tag => {
  //         return {
  //           id: tag._id,
  //           name: tag.name,
  //           usages: tag.usages
  //         };
  //       })
  //     };
  //   }));
  // }

  getAllAsignments() {
    return this.http.get<{ message: string, assignments: Assignment[] }>(this.baseURL + '/assignment');
  }

  getAllByCompany(userId: string) {
    return this.http.get<{ message: string, assignments: Assignment[] }>(this.baseURL + '/assignment/getByCompany/' + userId);
  }


  getAssignment(assignmentId: string) {
    return this.http.get<{ message: string, assignment: any }>(this.baseURL + '/assignment/' + assignmentId);
  }

  deleteAssignment(assignmentId: string) {
    return this.http.delete(this.baseURL + '/assignment/' + assignmentId);
  }
  deleteAllCompanyAssignments(companyId: string) {
    return this.http.delete(this.baseURL + '/assignment/deletebyuserid/' + companyId);
  }

  getApplied(developerId: string) {
    return this.http.get<{message: string, assignments: Assignment[]}>(this.baseURL + '/assignment/applies/' + developerId);
  }

  getAccepted(developerId: string) {
    return this.http.get<{message: string, assignments: Assignment[]}>(this.baseURL + '/assignment/accepted/' + developerId);
  }

  getDenied(developerId: string) {
    return this.http.get<{message: string, assignments: Assignment[]}>(this.baseURL + '/assignment/denied/' + developerId);
  }

  // getUser(userId: string) {
  //   return this.http.get<{ message: string, user: any }>(this.baseURL + '/user/' + userId);
  // }







  denyApply(assignmentId: string, developerId: string) {
    const developer = {denied: { deny: developerId }};
    return this.http.patch(this.baseURL + '/assignment/denyappliedassignment/' + assignmentId, developer);
  }

  acceptApply(assignmentId: string, developerId: string) {
    const developer = {accepted: { accept: developerId }};
    return this.http.patch(this.baseURL + '/assignment/acceptappliedassignment/' + assignmentId, developer);
  }

  removeApplied(assignmentId: string, developerId: string) {
    const removedev = {applies: { apply: developerId }};
    return this.http.patch(this.baseURL + '/assignment/removeappliedassignment/' + assignmentId, removedev);
  }

  deleteAppliedByUser(developerId: string) {
    const deleteDeveloper = {applies: { apply: developerId }};
    return this.http.patch(this.baseURL + '/assignment/deleteappliedbyuser', deleteDeveloper);
  }

  deleteAcceptedByUser(developerId: string) {
    const deleteDeveloper = {accepted: { accept: developerId }};
    return this.http.patch(this.baseURL + '/assignment/deleteacceptedbyuser', deleteDeveloper);
  }

  deleteDeniedByUser(developerId: string) {
    const deleteDeveloper = {denied: { deny: developerId }};
    return this.http.patch(this.baseURL + '/assignment/deletedeniedbyuser', deleteDeveloper);
  }



  sendApply(assignmentId: string, developerId: string) {
    const developer = {applies: { apply: developerId }};
    this.http.patch(this.baseURL + '/assignment/applyassignment/' + assignmentId, developer).subscribe(response => {
      console.log(response);
      console.log('added');
      this.router.navigate(['/developerDashboard']);
    });
  }

  checkAlreadyApplied(assignmentId: string, makerId: string) {
    // const maker = {applies: { apply: makerId }};
    return this.http.get<{ message: string, assignment: any }>(this.baseURL + '/assignment/' + assignmentId);
    // this.http.patch('http://localhost:3000/api/assignment/applyassignment/' + assignmentId, maker).subscribe(response => {
    //   console.log(response);
    //   console.log('added');
    // });
  }









  // createTag(tag: Tag) {
  //   this.http.post<Tag>(this.baseURL + '/tag/create', tag).subscribe(result => {
  //     console.log(result);
  //   });
  // }

  // updateTag(tag: Tag) {
  //   this.http.put<Tag>(this.baseURL + '/tag/update', tag).subscribe(result => {
  //     console.log(result);
  //   });
  // }

  // deleteTag(tagId: string) {
  //   return this.http.delete(this.baseURL + '/tag/delete/' + tagId).subscribe(result => {
  //     console.log(result);
  //   });
  // }
}
