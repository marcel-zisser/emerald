import { ReviewResult } from './review-result';

export interface Criterion {
  uuid?: string;
  description: string;
  status?: string;
  comments?: string;
  type?: string;
  maxPoints?: number;
  groupId?: string;
  reviewResults?: ReviewResult[];
}
