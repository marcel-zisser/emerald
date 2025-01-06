import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import {
  MatAccordion,
  MatExpansionPanel, MatExpansionPanelContent,
  MatExpansionPanelDescription, MatExpansionPanelHeader,
  MatExpansionPanelTitle
} from '@angular/material/expansion';
import { ReviewListComponent } from '../review-list';
import { Checklist } from '@emerald/models';

@Component({
  selector: 'em-checklist-table',
  imports: [
    MatAccordion,
    MatExpansionPanel,
    MatExpansionPanelTitle,
    MatExpansionPanelDescription,
    MatExpansionPanelHeader,
    MatExpansionPanelContent,
    ReviewListComponent
  ],
  templateUrl: './checklist-table.component.html',
  styleUrl: './checklist-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true
})
export class ChecklistTableComponent {
  checklists = input.required<Checklist[]>()
}
