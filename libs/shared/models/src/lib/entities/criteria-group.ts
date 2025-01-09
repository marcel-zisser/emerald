import { Criterion } from './criterion';

export interface CriteriaGroup {
  uuid?: string;
  description: string;
  checklistId?: string;
  criteria?: Criterion[];
}
