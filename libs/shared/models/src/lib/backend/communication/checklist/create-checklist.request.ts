import { CriteriaGroup } from '../../../entities';

export interface CreateChecklistRequest {
  uuid?: string;
  title: string;
  description: string;
  criteriaGroups: CriteriaGroup[];
  reviewerIds: string[];
}
