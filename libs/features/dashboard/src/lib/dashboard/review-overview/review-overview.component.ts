import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatCard, MatCardContent, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { ReviewListComponent } from '@emerald/components';
import { Feature, FeatureRoutes } from '@emerald/models';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'dashboard-review-overview',
  imports: [MatCard, MatCardHeader, MatCardTitle, MatCardContent, ReviewListComponent, RouterLink],
  templateUrl: './review-overview.component.html',
  styleUrl: './review-overview.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true
})
export class ReviewOverviewComponent {
  protected readonly FeatureRoutes = FeatureRoutes;
  protected readonly Feature = Feature;
}
