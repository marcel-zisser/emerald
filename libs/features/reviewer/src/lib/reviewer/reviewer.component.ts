import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'review-root',
  imports: [
    RouterOutlet
  ],
  templateUrl: './reviewer.component.html',
  styleUrl: './reviewer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReviewerComponent {}
