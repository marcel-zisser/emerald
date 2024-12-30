import {
  ChangeDetectionStrategy,
  Component,
  inject,
} from '@angular/core';
import { ChecklistOverviewComponent } from './checklist-overview/checklist-overview.component';
import { ReviewOverviewComponent } from './review-overview/review-overview.component';
import { Role } from '@emerald/models';
import { AuthenticationService } from '@emerald/authentication';
import { DashboardService } from './dashboard.service';

@Component({
  selector: 'dashboard-root',
  imports: [ChecklistOverviewComponent, ReviewOverviewComponent],
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
