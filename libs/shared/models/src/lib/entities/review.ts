import { ReviewStatus } from './review-status.enum';

export class Review {
  userId: string;
  checklistId: string;
  status: ReviewStatus;

  constructor(userId: string, checklistId: string, status: ReviewStatus) {
    this.userId = userId;
    this.checklistId = checklistId;
    this.status = status;
  }
}
