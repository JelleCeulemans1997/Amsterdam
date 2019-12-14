import { Developer } from './developer.model';
import { Company } from './company.model';

export interface Review {
  userId: string;
  score: number;
  text: string;
  developer?: Developer;
  company?: Company;
}

