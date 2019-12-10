import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Tag } from '../models/tag.model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class TagService {
  baseURL = environment.baseURL;

  //Make all the necessary services available
  constructor( private http: HttpClient) { }

  getAllDesc() {
    return this.http.get<{tags: any}>(this.baseURL + '/tag/allDesc').pipe(map(result => {
      return {
        tags: result.tags.map(tag => {
          return {
            id: tag._id,
            name: tag.name,
            usages: tag.usages
          };
        })
      };
    }));
  }


  createTag(tag: Tag) {
    this.http.post<Tag>(this.baseURL + '/tag/create', tag).subscribe(result => {
      console.log(result);
    });
  }

  updateTag(tag: Tag) {
    this.http.put<Tag>(this.baseURL + '/tag/update', tag).subscribe(result => {
      console.log(result);
    });
  }

  deleteTag(tagId: string) {
    return this.http.delete(this.baseURL + '/tag/delete/' + tagId).subscribe(result => {
      console.log(result);
    });
  }
}
