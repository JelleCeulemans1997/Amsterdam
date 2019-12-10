export class Company {
  companyname: string;
  street: string;
  nr: string;
  zipcode: string;
  town: string;
  bio: string;
  tags: string[];
  userId: string;

  constructor(companyname: string, street: string, nr: string, zipcode: string, town: string, bio: string, tags: string[], userId?: string){
    this.companyname = companyname;
    this.street = street;
    this.nr = nr;
    this.zipcode = zipcode;
    this.town = town;
    this.bio = bio;
    this.tags = tags;
    this.userId = userId;
  }

}
