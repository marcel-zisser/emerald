import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Signal,
} from '@angular/core';
import { ChecklistOverviewComponent } from './checklist-overview/checklist-overview.component';
import { ReviewOverviewComponent } from './review-overview/review-overview.component';
import { Checklist, JwtTokenInformation, Role } from '@emerald/models';
import { AuthenticationService } from '@emerald/authentication';
import { ChecklistService } from '@emerald/services';

@Component({
  selector: 'em-dashboard',
  imports: [ChecklistOverviewComponent, ReviewOverviewComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class DashboardComponent {
  private readonly authenticationService = inject(AuthenticationService);

  protected readonly Role = Role;
  protected readonly token = this.authenticationService.getDecodedToken();
}
