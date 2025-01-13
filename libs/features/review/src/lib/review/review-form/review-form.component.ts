import { ChangeDetectionStrategy, Component, computed, effect, inject, signal } from '@angular/core';
import { Criterion, CriterionStatus, CriterionType, ReviewResult } from '@emerald/models';
import {
  MatAccordion,
  MatExpansionPanel,
  MatExpansionPanelHeader,
  MatExpansionPanelTitle
} from '@angular/material/expansion';
import { MatButton, MatFabButton } from '@angular/material/button';
import { MatError, MatFormField, MatLabel, MatSuffix } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { NonNullableFormBuilder, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { MatCard, MatCardContent, MatCardHeader } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { ReviewFormService } from './review-form.service';
import { ReviewForm } from './review.form';

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
    MatSuffix,
    MatError,
    MatButton
  ],
  providers: [ReviewFormService],
  templateUrl: './review-form.component.html',
  styleUrl: './review-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true
})
export class ReviewFormComponent {
  private readonly reviewFormService = inject(ReviewFormService);
  private readonly fb = inject(NonNullableFormBuilder);

  protected review = this.reviewFormService.getReview();
  protected results = this.reviewFormService.getResults();
  protected selectedCriterion = signal<Criterion | undefined>(undefined);

  protected criterionForm: ReviewForm;
  protected readonly CriterionType = CriterionType;
  protected readonly CriterionStatus = CriterionStatus;

  private maxPointsValidator: ValidatorFn | undefined;

  constructor() {
    this.criterionForm = this.fb.group({
      status: this.fb.control<CriterionStatus | undefined>(undefined),
      points: this.fb.control<number | undefined>(undefined, [
        Validators.min(0)
      ]),
      comments: this.fb.control<string | undefined>(undefined)
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

        if (this.maxPointsValidator) {
          this.criterionForm
            .get('points')
            ?.removeValidators(this.maxPointsValidator);
        }

        this.maxPointsValidator = Validators.max(
          selectedCriterion.maxPoints ?? 0
        );
        this.criterionForm
          .get('points')
          ?.addValidators(this.maxPointsValidator);
      }
    });
  }

  selectCriterion(criterion: Criterion | undefined) {
    this.selectedCriterion.set(criterion);
  }

  setStatus(status: CriterionStatus) {
    this.criterionForm.get('status')?.patchValue(status);
  }

  submitResult() {
    const reviewId = this.review()?.uuid;
    const criterionId = this.selectedCriterion()?.uuid;

    if (reviewId && criterionId && this.criterionForm.valid) {
      this.reviewFormService.reviewCriterion({
        reviewId: reviewId,
        criterionId: criterionId,
        status: this.criterionForm.value.status ?? CriterionStatus.TBD,
        ...this.criterionForm.value
      });
    }
  }

  /**
   * Selects the previous criterion from the list
   */
  selectPreviousCriterion() {
    // TODO: Implement logic to go to previous criterion
  }

  /**
   * Selects the next criterion in the list
   */
  selectNextCriterion() {
    // TODO: Implement logic to go to next criterion
  }
}
