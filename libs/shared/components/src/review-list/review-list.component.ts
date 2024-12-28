import { ChangeDetectionStrategy, Component, inject, input, OnInit, signal } from '@angular/core';
import { CriteriaSummaryChartPipe, ReviewService } from '@emerald/services';
import { first, Observable } from 'rxjs';
import { CriteriaSummary, Review, ReviewResult } from '@emerald/models';
import { StatusBarComponent } from '../status-bar';
import { ReviewResultService } from '../../../services/src/lib/review-result';

@Component({
  selector: 'em-review-list',
  imports: [
    StatusBarComponent,
    CriteriaSummaryChartPipe
  ],
  templateUrl: './review-list.component.html',
  styleUrl: './review-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true
})
export class ReviewListComponent implements OnInit {
  checklistId = input<string>();

  private reviewService = inject(ReviewService);
  private reviewResultService = inject(ReviewResultService);
  private reviews$: Observable<Review[]> | undefined;

  protected reviews = signal<Review[]>([]);

  ngOnInit() {
    const checklistId = this.checklistId();

    if (checklistId) {
      this.reviews$ = this.reviewService.getReviewsByChecklistId(checklistId);
    } else {
      this.reviews$ = this.reviewService.getReviews();
    }

    this.reviews$.pipe(
      first()
    ).subscribe(reviews => {
      this.reviews.set(reviews);
    });
  }

  getCriterionSummary(results: ReviewResult[]): CriteriaSummary {
    return this.reviewResultService.getCriterionSummary(results);
  }

}
