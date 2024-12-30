import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import {
  MatCard,
  MatCardContent,
  MatCardHeader,
  MatCardTitle,
} from '@angular/material/card';
import { AuthenticationService } from '@emerald/authentication';
import { DashboardChecklist } from '@emerald/models';
import { DashboardService } from '../dashboard.service';
import {
  MatExpansionPanel, MatExpansionPanelContent,
  MatExpansionPanelDescription,
  MatExpansionPanelHeader,
  MatExpansionPanelTitle
} from '@angular/material/expansion';
import { ReviewListComponent } from '@emerald/components';

@Component({
  selector: 'dashboard-checklist-overview',
  imports: [
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardContent,
    MatExpansionPanel,
    MatExpansionPanelTitle,
    MatExpansionPanelHeader,
    MatExpansionPanelDescription,
    MatExpansionPanelContent,
    ReviewListComponent
  ],
  templateUrl: './checklist-overview.component.html',
  styleUrl: './checklist-overview.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class ChecklistOverviewComponent {
  private readonly authenticationService = inject(AuthenticationService);
  private readonly dashboardService = inject(DashboardService);

  private readonly token = this.authenticationService.getDecodedToken();

  protected checklists = computed<DashboardChecklist[]>(() =>
    this.dashboardService
      .checklists()
      .filter((checklist) => checklist.ownerId === this.token?.sub)
  );
}
