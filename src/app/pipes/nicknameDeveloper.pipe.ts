import { Pipe, PipeTransform } from '@angular/core';
import { DeveloperService } from '../services/developer.service';

// This pipe transforms an array of votes to a summary of all the user that voted.
@Pipe({ name: 'nicknameDeveloper' })
export class NicknameDeveloperPipe implements PipeTransform {
  constructor(private developerService: DeveloperService) { }
  transform(userId: string): string {

    const nicknamePromise = new Promise((resolve, reject) => {
      this.developerService.getByUserId(userId).subscribe(result => {
        resolve(result.nickname);
      }, error => {
        resolve('Cannot found the reviewers nickname!')
      });
    });

    nicknamePromise.then(nickname => {
      console.log(nickname);
      return nickname;
    });
    return null;
  }
}
