import { Developer } from './developer.model';

export interface Review {
  userId: string;
  score: number;
  text: string;
  developer?: Developer;
}

