import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Assignment } from '../models/assignment.model';

@Injectable({
  providedIn: 'root'
})
export class AssignmentService {
  baseURL = environment.baseURL;

  //Make all the necessary services available
  constructor(private http: HttpClient) { }

  createAssignment(
    title: string,
    description: string,
    tags: string[],
    location: [
      {
        street: string;
        nr: string;
        city: string;
        zipcode: string;
      }
    ],
    pdf: File
  ) {
    console.log('Create post');
    const postData = new FormData();
    postData.append('title', title);
    postData.append('description', description);
    postData.append('tags', JSON.stringify(tags));
    postData.append('location', JSON.stringify(location));
    postData.append('pdf', pdf, title);
    this.http
      .post<{ message: string; assignment: Assignment }>(
        this.baseURL + '/assignment/create',
        postData
      )
      .subscribe(responseData => {
        console.log(responseData);
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
