import {
  ChangeDetectionStrategy,
  Component,
  inject,
} from '@angular/core';
import { ProjectOverviewComponent } from './project-overview/project-overview.component';
import { Role } from '@emerald/models';
import { AuthenticationService } from '@emerald/authentication';
import { DashboardService } from './dashboard.service';
import { ReviewOverviewComponent } from './review-overview/review-overview.component';

@Component({
  selector: 'dashboard-root',
  imports: [ProjectOverviewComponent, ReviewOverviewComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  providers: [DashboardService]
})
export class DashboardComponent {
  private readonly authenticationService = inject(AuthenticationService);

  protected readonly Role = Role;
  protected readonly token = this.authenticationService.getDecodedToken();
}
