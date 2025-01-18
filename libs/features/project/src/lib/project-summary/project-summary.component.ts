import {
  Component,
  inject,
  input,
  Signal,
  signal,
  ViewEncapsulation,
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
  MatTable,
} from '@angular/material/table';
import { Checklist, CriteriaGroup, Criterion } from '@emerald/models';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { ProjectService } from '../project/project.service';

export interface Product {
  category: string;
  name: string;
  price: number;
  test: string;
}

export const PRODUCTS: Product[] = [
  { category: 'Fruits', name: 'Apple', price: 1.2, test: 'true' },
  { category: 'Fruits', name: 'Banana', price: 0.8, test: 'false' },
  { category: 'Vegetables', name: 'Carrot', price: 1.5, test: 'true' },
  { category: 'Vegetables', name: 'Lettuce', price: 2.0, test: 'false' },
];

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

  protected checklist: Signal<Checklist | undefined>;

  displayedColumns: string[] = ['name', 'price'];
  groupedData: (Criterion | GroupRow)[] = [];

  constructor() {
    this.checklist = toSignal(
      this.projectService.getChecklist(this.checklistId),
      {
        initialValue: undefined,
      }
    );

    this.groupData(PRODUCTS);
  }

  groupData(criteriaGroups: CriteriaGroup[]) {
    criteriaGroups.forEach((criteriaGroup) => {
      this.groupedData.push({
        name: criteriaGroup.title,
        group: true,
      } satisfies GroupRow);

      this.groupedData.push(...[criteriaGroup.criteria]);
    });

    const grouped = data.reduce((acc, current) => {
      const group = acc.find((g) => g.groupName === current.category);
      if (!group) {
        acc.push({ name: current.category, group: true } satisfies GroupRow);
        return acc;
      }
      acc.push(current);
      return acc;
    }, []);
    console.log(grouped);
    this.groupedData = grouped;
  }

  isGroup = (index: number, row: any): boolean => row.group;
  isData = (index: number, row: any): boolean => !row.group;

  addColumn() {
    this.displayedColumns.push('test');
  }
}
