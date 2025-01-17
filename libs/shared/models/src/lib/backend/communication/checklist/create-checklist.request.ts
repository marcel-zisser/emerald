import { CriteriaGroup } from '../../../entities';

export interface CreateChecklistRequest {
  uuid?: string;
  title: string;
  description: string;
  dueDate: Date;
  criteriaGroups: CriteriaGroup[];
  reviewerIds: string[];
}
