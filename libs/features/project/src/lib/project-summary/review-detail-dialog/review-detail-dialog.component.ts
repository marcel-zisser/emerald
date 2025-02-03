import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { Criterion, Review, ReviewResult } from '@emerald/models';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { DatePipe } from '@angular/common';

type ReviewDetailData = {
  review: Review;
  reviewResult: ReviewResult;
  criterion: Criterion;
};

@Component({
  selector: 'project-review-detail-dialog',
  imports: [
    MatFormField,
    MatInput,
    MatLabel,
    FormsModule,
    MatDialogTitle,
    MatDialogContent,
    MatButton,
    MatDialogActions,
    MatDialogClose,
    DatePipe,
  ],
  templateUrl: './review-detail-dialog.component.html',
  styleUrl: './review-detail-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class ReviewDetailDialogComponent {
  protected review: Review;
  protected reviewResult: ReviewResult;
  protected criterion: Criterion;

  constructor(@Inject(MAT_DIALOG_DATA) public data: ReviewDetailData) {
    this.review = data.review;
    this.reviewResult = data.reviewResult;
    this.criterion = data.criterion;
    console.log(this.reviewResult);
  }
}
