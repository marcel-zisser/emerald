import { ReviewResult } from './review-result';
import { CriterionType } from './criterion-type.enum';

export interface Criterion {
  uuid?: string;
  description: string;
  status?: string;
  comments?: string;
  criterionType?: CriterionType;
  maxPoints?: number;
  groupId?: string;
  reviewResults?: ReviewResult[];
}
