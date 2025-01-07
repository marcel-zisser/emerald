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
import { ProjectTableComponent } from '@emerald/components';
import { RouterLink } from '@angular/router';
import { Feature, FeatureRoutes } from '@emerald/models';

@Component({
  selector: 'dashboard-project-overview',
  imports: [
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardContent,
    ProjectTableComponent,
    RouterLink
  ],
  templateUrl: './project-overview.component.html',
  styleUrl: './project-overview.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class ProjectOverviewComponent {
  private readonly authenticationService = inject(AuthenticationService);
  private readonly dashboardService = inject(DashboardService);

  private readonly token = this.authenticationService.getDecodedToken();

  protected checklists = this.dashboardService.checklists;
  protected readonly FeatureRoutes = FeatureRoutes;
  protected readonly Feature = Feature;
}
