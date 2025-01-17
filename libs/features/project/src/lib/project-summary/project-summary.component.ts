import { Component, input, ViewEncapsulation } from '@angular/core';
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
import { group } from '@angular/animations';
import { Checklist } from '@emerald/models';

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
  displayedColumns: string[] = ['name', 'price'];
  groupedData: any[] = [];

  constructor() {
    this.groupData(PRODUCTS);
  }

  groupData(data: any[]) {
    const grouped = data.reduce((acc, current) => {
      const group = acc.find((g: any) => g.groupName === current.category);
      if (!group) {
        acc.push({ groupName: current.category, group: true });
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
