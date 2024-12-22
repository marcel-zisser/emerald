import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatCard, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { MatError } from '@angular/material/form-field';
import { ProjectsOverviewComponent } from './projects-overview/projects-overview.component';
import { ReviewOverviewComponent } from './review-overview/review-overview.component';
import { Role } from '@emerald/models';
import { AuthenticationService } from '@emerald/authentication';

@Component({
  selector: 'em-dashboard',
  imports: [
    FormsModule,
    MatButton,
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatError,
    ProjectsOverviewComponent,
    ReviewOverviewComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class DashboardComponent {
  private readonly authenticationService = inject(AuthenticationService);

  protected readonly Role = Role;
  protected token;

  constructor() {
    this.token = this.authenticationService.getDecodedToken();
  }
}
