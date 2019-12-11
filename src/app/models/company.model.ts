import { LocationDefining } from './location.model';

export class Company {
  constructor(
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
    public reviews: {
      name: string,
      text: string,
      score: string
    }[],
    public website: string[]) { }
}
