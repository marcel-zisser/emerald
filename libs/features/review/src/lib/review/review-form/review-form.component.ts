import { ChangeDetectionStrategy, Component, inject, Signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReviewService } from '../review.service';
import { Review } from '@emerald/models';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  MatAccordion,
  MatExpansionPanel,
  MatExpansionPanelHeader,
  MatExpansionPanelTitle
} from '@angular/material/expansion';
import { MatButton } from '@angular/material/button';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCard, MatCardContent } from '@angular/material/card';

@Component({
  selector: 'review-review-form',
  imports: [
    MatAccordion,
    MatButton,
    MatExpansionPanel,
    MatExpansionPanelHeader,
    MatExpansionPanelTitle,
    MatFormField,
    MatInput,
    MatLabel,
    ReactiveFormsModule,
    MatCard,
    MatCardContent
  ],
  templateUrl: './review-form.component.html',
  styleUrl: './review-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true
})
export class ReviewFormComponent {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly reviewService = inject(ReviewService);

  private readonly reviewId = this.activatedRoute.snapshot.params['reviewId'];

  protected review: Signal<Review | undefined>;

  constructor() {
    this.review = toSignal(this.reviewService.getReview(this.reviewId));
  }
}

