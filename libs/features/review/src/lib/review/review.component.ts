import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ReviewListComponent } from '@emerald/components';

@Component({
  selector: 'review-root',
  imports: [ReviewListComponent],
  templateUrl: './review.component.html',
  styleUrl: './review.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class ReviewComponent {}
