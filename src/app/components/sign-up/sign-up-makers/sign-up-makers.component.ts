import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sign-up-makers',
  templateUrl: './sign-up-makers.component.html',
  styleUrls: ['./sign-up-makers.component.scss']
})
export class SignUpMakersComponent implements OnInit {
  skillsarray = ['skill'];
  socialarray = ['social'];
  skillcount = 'skill';
  socialcount = 'social';

  constructor() { }

  ngOnInit() {
  }

  onSubmit() {
    console.log("maker")
  }

  OnAddSkill() {
    if (this.skillsarray.length < 10) {
      this.skillsarray.push(this.skillcount);
    }
  }

  OnRemoveSkill(i: number) {
    if (this.skillsarray.length > 1) {
      this.skillsarray.splice(i, 1);
    }
  }

  OnAddSocial() {
    if (this.socialarray.length < 10) {
      this.socialarray.push(this.socialcount);
    }
  }

  OnRemoveSocial(i: number) {
    if (this.socialarray.length > 1) {
      this.socialarray.splice(i, 1);
    }
  }
}
