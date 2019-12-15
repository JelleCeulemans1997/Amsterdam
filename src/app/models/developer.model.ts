import { LocationDefining } from './location.model';
import { Review } from './review.model';

export class Developer {


  constructor(
    public id: string,
    public nickname: string,
    public userId: string,
    public firstname: string,
    public lastname: string,
    public email: string,
    public phone: string,
    public dob: Date,
    public bio: string,
    public linkedIn: string,
    public experience: string[],
    public location: {
      zipcode: string,
      city: string
    },
    public reviews: Review[],
    public image: string,
    public cv: string
    ) { }
}
