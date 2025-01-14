import { ReviewStatus } from './review-status.enum';
import { User } from './user';
import { ReviewResult } from './review-result';
import { Checklist } from './checklist';

export interface Review {
  uuid: string;
  status: ReviewStatus;
  assignedAt: Date;
  dueDate: Date;
  user?: User;
  checklist?: Checklist;
  results?: ReviewResult[];
}
