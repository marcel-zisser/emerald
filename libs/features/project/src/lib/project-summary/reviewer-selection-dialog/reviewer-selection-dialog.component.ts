import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButton } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { User } from '@emerald/models';
import {
  FormArray,
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatCheckbox } from '@angular/material/checkbox';

type DialogData = {
  reviewers: User[];
  selectedReviewers: string[];
};

@Component({
  selector: 'project-reviewer-selection-dialog',
  imports: [
    CommonModule,
    MatButton,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle,
    ReactiveFormsModule,
    MatCheckbox,
  ],
  templateUrl: './reviewer-selection-dialog.component.html',
  styleUrl: './reviewer-selection-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class ReviewerSelectionDialogComponent {
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly dialogRef = inject(
    MatDialogRef<ReviewerSelectionDialogComponent>,
  );

  protected selectedReviewersForm: FormGroup;
  protected reviewers: User[];

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {
    this.reviewers = data.reviewers;

    this.selectedReviewersForm = this.fb.group({
      selectedReviewers: this.fb.array([], Validators.maxLength(5)),
    });

    for (const selectedReviewer of data.selectedReviewers) {
      this.selectedReviewers.push(this.fb.control(selectedReviewer));
    }
  }

  get selectedReviewers(): FormArray {
    return this.selectedReviewersForm.get('selectedReviewers') as FormArray;
  }

  /**
   * Adds and removes a reviewer to and form the list of selected reviewers
   * @param event the checkbox event
   * @param userId
   */
  onCheckboxChange(event: any, userId: string) {
    if (event.checked) {
      this.selectedReviewers.push(this.fb.control(userId));
    } else {
      const index = this.selectedReviewers.controls.findIndex(
        (ctrl) => ctrl.value === userId,
      );
      this.selectedReviewers.removeAt(index);
    }
  }

  submit() {
    if (this.selectedReviewersForm.valid) {
      this.dialogRef.close(this.selectedReviewers.value);
    }
  }
}
