import { LocationDefining } from '../models/location.model';
import { User } from './user.model';
import { Company } from './company.model';

export class Assignment {
  constructor(
    public id: string,
    public title: string,
    public description: string,
    public tags: string[],
    public location: LocationDefining,
    public creator: string,
    public applies: User[],
    public company?: Company
    // ,
    // public pdf: string
    ) { }
}
