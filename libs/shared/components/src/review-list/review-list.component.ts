import { ChangeDetectionStrategy, Component, inject, input, OnInit, signal } from '@angular/core';
import { CriteriaSummaryChartPipe, ReviewService } from '@emerald/services';
import { first, Observable } from 'rxjs';
import { CriteriaSummary, Review, ReviewResult } from '@emerald/models';
import { StatusBarComponent } from '../status-bar';
import { ReviewResultService } from '@emerald/services';
import {
  MatCell, MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef,
  MatRow, MatRowDef,
  MatTable,
  MatTableDataSource
} from '@angular/material/table';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';

@Component({
  selector: 'em-review-list',
  imports: [
    StatusBarComponent,
    CriteriaSummaryChartPipe,
    MatCell,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderRow,
    MatIcon,
    MatIconButton,
    MatRow,
    MatTable,
    MatHeaderCellDef,
    MatCellDef,
    MatHeaderRowDef,
    MatRowDef
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
  protected dataSource = new MatTableDataSource<Review>([]);

  protected displayedColumns: string[] = [
    'reviewer',
    'status',
    'summary',
    'actions',
  ];

  trackByReviewId(index: number, review: Review): string {
    return review.uuid;
  }

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
      this.dataSource.data = reviews;
    });
  }

  getCriterionSummary(results: ReviewResult[]): CriteriaSummary {
    return this.reviewResultService.getCriterionSummary(results);
  }

}
