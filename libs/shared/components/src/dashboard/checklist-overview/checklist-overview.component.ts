import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
} from '@angular/core';
import {
  MatCard,
  MatCardContent,
  MatCardHeader,
  MatCardTitle,
} from '@angular/material/card';
import { AuthenticationService } from '@emerald/authentication';
import { Checklist, DashboardChecklist } from '@emerald/models';
import { ChecklistService } from '@emerald/services';
import { DashboardService } from '../dashboard.service';

@Component({
  selector: 'em-checklist-overview',
  imports: [MatCard, MatCardHeader, MatCardTitle, MatCardContent],
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
