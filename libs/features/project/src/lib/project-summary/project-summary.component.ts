import { Component, effect, inject, signal, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable,
  MatTableDataSource,
} from '@angular/material/table';
import {
  Checklist,
  CriteriaGroup,
  Criterion,
  CriterionStatus,
  CriterionType,
  Review,
  ReviewResult,
} from '@emerald/models';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { ProjectService } from '../project/project.service';
import { StatusIconPipe } from '@emerald/services';
import { MatIcon } from '@angular/material/icon';
import { MatFabButton } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { ReviewerSelectionDialogComponent } from './reviewer-selection-dialog/reviewer-selection-dialog.component';
import { first } from 'rxjs';
import { ReviewDetailDialogComponent } from './review-detail-dialog/review-detail-dialog.component';

export interface GroupRow {
  name: string;
  group: boolean;
}

@Component({
  selector: 'project-project-summary',
  imports: [
    CommonModule,
    MatTable,
    MatHeaderRow,
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    MatRow,
    MatRowDef,
    MatCellDef,
    MatHeaderCellDef,
    MatHeaderRowDef,
    MatIcon,
    StatusIconPipe,
    MatFabButton,
  ],
  templateUrl: './project-summary.component.html',
  styleUrl: './project-summary.component.scss',
  standalone: true,
})
export class ProjectSummaryComponent {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly projectService = inject(ProjectService);
  private readonly dialog = inject(MatDialog);

  private readonly checklistId =
    this.activatedRoute.snapshot.params['projectId'];

  protected checklist!: Signal<Checklist | undefined>;
  protected reviews!: Signal<Review[] | undefined>;
  protected selectedReviewers = signal<string[]>([]);
  protected readonly CriterionType = CriterionType;

  displayedColumns: string[] = ['description'];
  dataSource = new MatTableDataSource<Criterion | GroupRow>([]);

  isGroup = (index: number, row: any): boolean => row.group;
  isData = (index: number, row: any): boolean => !row.group;

  constructor() {
    this.getChecklist();
    this.getReviews();
  }

  groupData(
    criteriaGroups: CriteriaGroup[],
    reviews: Review[],
  ): ((Criterion & { [key: string]: CriterionStatus }) | GroupRow)[] {
    const groups: (
      | (Criterion & { [key: string]: CriterionStatus })
      | GroupRow
    )[] = [];

    criteriaGroups.forEach((criteriaGroup) => {
      groups.push({
        name: criteriaGroup.title,
        group: true,
      } satisfies GroupRow);

      if (criteriaGroup.criteria) {
        const criteria = criteriaGroup.criteria.map((criterion) => {
          let criterionRow: Criterion & {
            [key: string]: any;
          } = criterion;

          reviews.forEach((review) => {
            const result = review.results?.find(
              (result) => result.criterionId === criterion.uuid,
            );

            criterionRow = {
              ...criterionRow,
              [review.uuid]: {
                status: result?.status,
                points: result?.points,
              },
            };
          });

          return criterionRow;
        });
        groups.push(...criteria);
      }
    });

    return groups;
  }

  /**
   * Sets up the retrieval of the checklist
   * @private
   */
  private getChecklist() {
    this.checklist = toSignal(
      this.projectService.getChecklist(this.checklistId),
      {
        initialValue: undefined,
      },
    );

    effect(() => {
      const checklist = this.checklist();
      const reviews = this.reviews()?.filter((review) =>
        this.selectedReviewers().includes(review?.user?.uuid ?? ''),
      );
      if (checklist && checklist.criteriaGroups && reviews) {
        this.dataSource.data = this.groupData(
          checklist.criteriaGroups,
          reviews,
        );
        this.displayedColumns = [
          'description',
          ...reviews.map((review) => review.uuid),
        ];
      }
    });
  }

  /**
   * Sets up the retrieval of the reviews
   * @private
   */
  private getReviews() {
    this.reviews = toSignal(this.projectService.getReviews(this.checklistId), {
      initialValue: undefined,
    });
  }

  protected readonly CriterionStatus = CriterionStatus;

  openReviewerSelection() {
    const dialogRef = this.dialog.open(ReviewerSelectionDialogComponent, {
      data: {
        reviewers: this.reviews()?.map((review) => review.user),
        selectedReviewers: this.selectedReviewers(),
      },
      width: '50%',
      height: '50%',
    });

    dialogRef
      .afterClosed()
      .pipe(first())
      .subscribe((selectedReviewerUuids: string[]) => {
        if (selectedReviewerUuids) {
          this.selectedReviewers.set(selectedReviewerUuids);
        }
      });
  }

  /**
   * Opens a dialog for the result details
   * @param review the relevant review
   * @param criterionId the ID of the criterion
   */
  openReviewDetails(review: Review, criterionId: string) {
    const result = review.results?.find(
      (result) => result.criterionId === criterionId,
    );
    const criterion = this.checklist()
      ?.criteriaGroups?.map((group) => group.criteria)
      .flat()
      .find((criterion) => criterion?.uuid === criterionId);

    this.dialog.open(ReviewDetailDialogComponent, {
      data: {
        review: review,
        reviewResult: result,
        criterion: criterion,
      },
      width: '50%',
    });
  }
}
