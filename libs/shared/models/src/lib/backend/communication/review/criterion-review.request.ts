import { CriterionStatus } from '../../../entities';

export interface CriterionReviewRequest {
  reviewId: string;
  criterionId: string;
  status: CriterionStatus;
  points?: number;
  comments?: string;
}
