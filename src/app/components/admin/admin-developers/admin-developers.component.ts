import { Component, OnInit } from '@angular/core';
import { DeveloperService } from 'src/app/services/developer.service';
import { Developer } from 'src/app/models/developer.model';

@Component({
  selector: 'app-admin-developers',
  templateUrl: './admin-developers.component.html',
  styleUrls: ['./admin-developers.component.scss']
})
export class AdminDevelopersComponent implements OnInit {
  developers: Developer[];

  constructor(private developerService: DeveloperService) { }

  ngOnInit() {
    this.developerService.getAll().subscribe(result => {
      this.developers = result;
      console.log(result);
    });
  }

}
