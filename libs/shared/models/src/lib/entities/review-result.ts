import { CriterionStatus } from './criterion-status.enum';

export interface ReviewResult {
  status: CriterionStatus;
  comments: string;
}
