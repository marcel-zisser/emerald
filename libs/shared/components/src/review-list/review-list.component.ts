import { ChangeDetectionStrategy, Component, inject, input, OnInit, signal } from '@angular/core';
import { CriteriaSummaryChartPipe, CriterionStatusPipe, ReviewResultService, ReviewService } from '@emerald/services';
import { first, Observable } from 'rxjs';
import { CriteriaSummary, CriterionStatus, Feature, FeatureRoutes, Review, ReviewResult } from '@emerald/models';
import { StatusBarComponent } from '../status-bar';
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
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

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
    MatRowDef,
    DatePipe,
    RouterLink,
    CriterionStatusPipe
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
    'assignedAt',
    'dueDate',
    'status',
    'summary',
    'actions'
  ];

  trackByReviewId(index: number, review: Review): string {
    return review.uuid;
  }

  ngOnInit() {
    const checklistId = this.checklistId();

    if (checklistId) {
      this.reviews$ = this.reviewService.getReviewsByChecklistId(checklistId);
      this.displayedColumns.unshift('reviewer');
    } else {
      this.reviews$ = this.reviewService.getReviews();
      this.displayedColumns.unshift('checklistTitle', 'checklistOwner');
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

  protected readonly FeatureRoutes = FeatureRoutes;
  protected readonly Feature = Feature;
  protected readonly CriterionStatus = CriterionStatus;
}
