import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Tag } from '../models/tag.model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class TagService {
  baseURL = environment.baseURL;

  // Make all the necessary services available
  constructor( private http: HttpClient) { }

  getAllDesc() {
    return this.http.get<{ tags: Tag[] }>(this.baseURL + '/tag/allDesc');
  }


  createTag(tag: Tag) {
    return this.http.post<Tag>(this.baseURL + '/tag/create', tag);
  }

  updateTag(tag: Tag) {
    this.http.put<Tag>(this.baseURL + '/tag/update/' + tag.id, tag).subscribe(result => {
      console.log(result);
    });
  }

  deleteTag(tagId: string) {
    return this.http.delete(this.baseURL + '/tag/delete/' + tagId);
  }
}
