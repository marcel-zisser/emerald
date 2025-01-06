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
import { DashboardService } from '../dashboard.service';
import { ChecklistTableComponent } from '@emerald/components';
import { RouterLink } from '@angular/router';
import { Feature, FeatureRoutes } from '@emerald/models';

@Component({
  selector: 'dashboard-checklist-overview',
  imports: [
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardContent,
    ChecklistTableComponent,
    RouterLink
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

  protected checklists = this.dashboardService.checklists;
  protected readonly FeatureRoutes = FeatureRoutes;
  protected readonly Feature = Feature;
}
