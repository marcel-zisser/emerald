import { Criterion } from './criterion';

export interface CriteriaGroup {
  uuid?: string;
  title: string;
  description: string;
  checklistId?: string;
  criteria?: Criterion[];
}
