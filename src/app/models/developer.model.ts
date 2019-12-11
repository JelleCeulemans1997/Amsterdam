import { LocationDefining } from './location.model';
import { Review } from './review.model';

export class Developer {


  constructor(
    public nickname: string,
    public userId: string,
    public firstname: string,
    public lastname: string,
    public email: string,
    public dob: Date,
    public bio: string,
    public linkedIn: string,
    public experience: string[],
    public location: LocationDefining,
    public reviews: Review[]
    ) { }
}
