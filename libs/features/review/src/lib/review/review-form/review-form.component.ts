import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  signal,
} from '@angular/core';
import { Criterion, CriterionStatus } from '@emerald/models';
import {
  MatAccordion,
  MatExpansionPanel,
  MatExpansionPanelHeader,
  MatExpansionPanelTitle,
} from '@angular/material/expansion';
import { MatFabButton } from '@angular/material/button';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatCard, MatCardContent, MatCardHeader } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { ReviewFormService } from './review-form.service';

@Component({
  selector: 'review-review-form',
  imports: [
    MatAccordion,
    MatExpansionPanel,
    MatExpansionPanelHeader,
    MatExpansionPanelTitle,
    MatFormField,
    MatInput,
    MatLabel,
    ReactiveFormsModule,
    MatCard,
    MatCardContent,
    MatCardHeader,
    MatIcon,
    MatFabButton,
  ],
  providers: [ReviewFormService],
  templateUrl: './review-form.component.html',
  styleUrl: './review-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class ReviewFormComponent {
  private readonly reviewFormService = inject(ReviewFormService);
  private readonly fb = inject(FormBuilder);

  protected review = this.reviewFormService.getReview();
  protected selectedCriterion = signal<Criterion | undefined>(undefined);

  protected criterionForm: FormGroup;

  constructor() {
    this.criterionForm = this.fb.group({
      status: [],
      comments: [],
    });

    effect(() => {
      const selectedCriterion = this.selectedCriterion();
      const review = this.review();
      if (selectedCriterion && review) {
        this.criterionForm
          .get('status')
          ?.patchValue(
            review.results?.find(
              (result) => result.criterionId === selectedCriterion.uuid
            )?.status
          );
        this.criterionForm
          .get('comments')
          ?.patchValue(
            review.results?.find(
              (result) => result.criterionId === selectedCriterion.uuid
            )?.comments
          );
      }
    });
  }

  selectCriterion(criterion: Criterion | undefined) {
    this.selectedCriterion.set(criterion);
  }

  protected readonly CriterionStatus = CriterionStatus;

  setStatus(status: CriterionStatus) {
    this.criterionForm.get('status')?.patchValue(status);

    this.reviewFormService.reviewCriterion({
      reviewId: this.review()?.uuid,
      criterionId: this.selectedCriterion()?.uuid,
      ...this.criterionForm.value,
    });
  }
}
