import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatCard, MatCardHeader, MatCardTitle } from '@angular/material/card';

@Component({
  selector: 'em-review-overview',
  imports: [MatCard, MatCardHeader, MatCardTitle],
  templateUrl: './review-overview.component.html',
  styleUrl: './review-overview.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class ReviewOverviewComponent {}
