import { CriterionStatus } from './criterion-status.enum';

export interface ReviewResult {
  criterionId?: string;
  reviewId?: string;
  status: CriterionStatus;
  points?: number;
  comments: string;
  lastModified?: Date;
}
