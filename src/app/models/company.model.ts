import { LocationDefining } from './location.model';
import { Review } from './review.model';

export class Company {
  constructor(
    public id: string,
    public name: string,
    public userId: string,
    public contact: {
      firstname: string,
      lastname: string,
      email: string
      phone: string
    },
    public location: LocationDefining,
    public tags: string[],
    public bio: string,
    public reviews: Review[],
    public image: string) { }
}
