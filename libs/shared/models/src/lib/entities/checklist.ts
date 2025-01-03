import { CriteriaGroup } from './criteria-group';
import { User } from './user';

export interface Checklist {
  uuid?: string;
  title: string;
  description: string;
  ownerId: string;
  criteriaGroups: CriteriaGroup[];
  reviewers: User[];
}
