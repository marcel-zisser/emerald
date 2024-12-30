import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { MatCard, MatCardContent, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { AuthenticationService } from '@emerald/authentication';
import { DashboardService } from '../dashboard.service';
import { DashboardChecklist } from '@emerald/models';
import { ReviewListComponent } from '@emerald/components';

@Component({
  selector: 'dashboard-review-overview',
  imports: [MatCard, MatCardHeader, MatCardTitle, MatCardContent, ReviewListComponent],
  templateUrl: './review-overview.component.html',
  styleUrl: './review-overview.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true
})
export class ReviewOverviewComponent {
  private readonly authenticationService = inject(AuthenticationService);
  private readonly dashboardService = inject(DashboardService);

  private readonly token = this.authenticationService.getDecodedToken();

  protected checklists = computed<DashboardChecklist[]>(() =>
    this.dashboardService
      .checklists()
      .filter((checklist) => checklist.ownerId === this.token?.sub)
  );
}
