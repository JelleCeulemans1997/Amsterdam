import { LocationDefining } from '../models/location.model';

export class Assignment {
  constructor(
    public id: string,
    public title: string,
    public description: string,
    public tags: string[],
    public location: LocationDefining,
    public creator: string
    // ,
    // public pdf: string
    ) { }
}
