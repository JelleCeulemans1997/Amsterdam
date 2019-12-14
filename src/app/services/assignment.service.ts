import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Assignment } from '../models/assignment.model';
import { LocationDefining } from '../models/location.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AssignmentService {
  baseURL = environment.baseURL;

  // Make all the necessary services available
  constructor(private http: HttpClient) { }

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
    return this.http.put<AssignmentService>(this.baseURL + '/assignment/' + assignment.id, assignment);
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

  getAssignment(assignmentId: string) {
    return this.http.get<{ message: string, assignment: any }>(this.baseURL + '/assignment/' + assignmentId);
  }

  deleteAssignment(assignmentId: string) {
    return this.http.delete(this.baseURL + '/assignment/' + assignmentId);
  }

  // getUser(userId: string) {
  //   return this.http.get<{ message: string, user: any }>(this.baseURL + '/user/' + userId);
  // }













  acceptApply(assignmentId: string, makerId: string) {
    const maker = {accepted: [{accept: makerId}]};
    const removemaker = {applies : {
        apply: makerId
      }};
    this.http.patch('http://localhost:3000/api/assignment/acceptappliedassignment/' + assignmentId, maker).subscribe(response => {
      console.log(response);
      console.log('added');
    });
    this.http.patch('http://localhost:3000/api/assignment/removeappliedassignment/' + assignmentId, removemaker).subscribe(response => {
    console.log(response);
    console.log('deleted');
    });
  }



  sendApply(assignmentId: string, makerId: string) {
    const maker = {applies: [{apply: makerId}]};
    this.http.patch('http://localhost:3000/api/assignment/applyassignment/' + assignmentId, maker).subscribe(response => {
      console.log(response);
      console.log('added');
    });
  }

  denyApply(assignmentId: string, makerId: string) {
    const maker = {denied: [{deny: makerId}]};
    const removemaker = {applies : {
        apply: makerId
      }};
    this.http.patch('http://localhost:3000/api/assignment/denyappliedassignment/' + assignmentId, maker).subscribe(response => {
      console.log(response);
      console.log('added');
    });
    this.http.patch('http://localhost:3000/api/assignment/removeappliedassignment/' + assignmentId, removemaker).subscribe(response => {
    console.log(response);
    console.log('deleted');
    });
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
