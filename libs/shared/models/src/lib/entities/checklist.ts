import { CriteriaGroup } from './criteria-group';
import { User } from './user';
import { CriteriaSummary } from './criteria-summary';
import { ReviewSummary } from './review-summary';

export interface Checklist {
  uuid?: string;
  title: string;
  description: string;
  owner?: User;
  criteriaGroups?: CriteriaGroup[];
  reviewers?: User[];
  criteriaSummary?: CriteriaSummary;
  reviewSummary?: ReviewSummary;
}
