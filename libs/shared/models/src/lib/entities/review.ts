import { ReviewStatus } from './reviewStatus.enum';

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
