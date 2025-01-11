import { CriterionStatus } from './criterion-status.enum';

export interface ReviewResult {
  criterionId?: string;
  reviewId?: string;
  status: CriterionStatus;
  comments: string;
}
