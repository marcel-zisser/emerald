import { ReviewStatus } from './review-status.enum';
import { User } from './user';
import { ReviewResult } from './review-result';

export interface Review {
  uuid: string;
  status: ReviewStatus;
  user: User;
  results: ReviewResult[];
}
