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
    public pdf: string,
    public accepted: { accept: string; }[],
    public applies: { apply: string; }[],
    public denied: { deny: string; }[],
    public company?: Company
    ) { }
}
