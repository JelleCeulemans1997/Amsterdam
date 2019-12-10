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
    this.http.post<{ message: string; assignment: Assignment }>(this.baseURL + '/assignment/create', assignment)
    .subscribe(responseData => {
        console.log(responseData);
      });
  }

  getAssignmentById(assingmentId: string) {
    return this.http.get<{ message: string; assignment: any }>(this.baseURL + '/assignment/' + assingmentId)
    .pipe(map(result => {
      return {
        ...result.assignment,
        id: result.assignment._id
      };
    }));
  }

  updateAssignment(assignment: Assignment) {
    this.http.put<AssignmentService>(this.baseURL + '/assignment/' + assignment.id, assignment).subscribe(result => {
      console.log(result);
    });
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
    return this.http.get<{ message: string, assignments: any }>(this.baseURL + '</assignment');

  }

  getAssignment(assignmentId: string) {
    return this.http.get(this.baseURL + '/assignment/' + assignmentId);
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
