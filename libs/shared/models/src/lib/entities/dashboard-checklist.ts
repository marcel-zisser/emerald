import { CriteriaSummary } from './criteria-summary';
import { ReviewSummary } from './review-summary';

export interface DashboardChecklist {
  uuid: string;
  title: string;
  description: string;
  ownerId: string;
  criteriaSummary: CriteriaSummary;
  reviewSummary: ReviewSummary;
}
