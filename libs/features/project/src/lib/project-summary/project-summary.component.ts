import {
  Component, effect,
  inject,
  Signal,
} from '@angular/core';
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
  MatTable, MatTableDataSource
} from '@angular/material/table';
import { Checklist, CriteriaGroup, Criterion, CriterionStatus, Review } from '@emerald/models';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { ProjectService } from '../project/project.service';
import { StatusIconPipe } from '@emerald/services';
import { MatIcon } from '@angular/material/icon';

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
  ],
  templateUrl: './project-summary.component.html',
  styleUrl: './project-summary.component.scss',
  standalone: true,
})
export class ProjectSummaryComponent {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly projectService = inject(ProjectService);

  private readonly checklistId =
    this.activatedRoute.snapshot.params['projectId'];

  protected checklist!: Signal<Checklist | undefined>;
  protected reviews!: Signal<Review[] | undefined>;

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
    reviews: Review[]
  ): ((Criterion & { [key: string]: CriterionStatus;})| GroupRow)[] {
    const groups: ((Criterion & {[key: string]: CriterionStatus;})| GroupRow)[] = [];

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
            criterionRow = {
              ...criterionRow,
              [review.uuid]: review.results?.find(
                (result) => result.criterionId === criterion.uuid
              )?.status,
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
      }
    );

    effect(() => {
      const checklist = this.checklist();
      const reviews = this.reviews();
      if (checklist && checklist.criteriaGroups && reviews) {
        this.dataSource.data = this.groupData(
          checklist.criteriaGroups,
          reviews
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
}
