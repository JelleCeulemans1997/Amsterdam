export class Maker {
  nickname:string;
  firstname:string;
  lastname:string;
  email:string;
  street:string;
  nr:string;
  zipcode:string;
  town:string;
  dob:Date;
  skills:string[];
  experience:string;
  github:string;
  linkedin:string;
  bio:string;
  userId: string;

  constructor(nickname:string, firstname:string, lastname:string, street:string, nr:string, zipcode:string,
     town:string, dob:Date, skills:string[], github:string, linkedin:string, email:string, bio:string, userId?: string){
    this.nickname = nickname;
    this.firstname = firstname;
    this.lastname = lastname;
    this.street = street;
    this.nr = nr;
    this.zipcode = zipcode;
    this.town = town;
    this.dob = dob;
    this.skills = skills;
    this.experience = this.experience;
    this.github = github;
    this.linkedin = linkedin;
    this.email = email;
    this.bio = bio;
    this.userId = userId;
  }
}
