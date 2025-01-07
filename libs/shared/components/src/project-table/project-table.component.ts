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
  selector: 'em-project-table',
  imports: [
    MatAccordion,
    MatExpansionPanel,
    MatExpansionPanelTitle,
    MatExpansionPanelDescription,
    MatExpansionPanelHeader,
    MatExpansionPanelContent,
    ReviewListComponent
  ],
  templateUrl: './project-table.component.html',
  styleUrl: './project-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true
})
export class ProjectTableComponent {
  checklists = input.required<Checklist[]>()
}
