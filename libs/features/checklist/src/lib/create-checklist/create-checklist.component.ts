import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  MatStep,
  MatStepper,
  MatStepperIcon,
  MatStepperNext,
  MatStepperPrevious,
} from '@angular/material/stepper';
import {
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { BasicChecklistDataComponent } from './basic-checklist-data/basic-checklist-data.component';
import { CriteriaComponent } from './criteria/criteria.component';
import { AddReviewerComponent } from './add-reviewer/add-reviewer.component';
import { FinishChecklistComponent } from './finish-checklist/finish-checklist.component';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { CriteriaForm, FormCriteriaGroup } from './criteria/criteria.form';
import { FormUser, ReviewerForm } from './add-reviewer/reviewer.form';
import { ChecklistService } from '../checklist/checklist.service';
import {
  CriteriaGroup,
  Criterion,
  Feature,
  FeatureRoutes,
} from '@emerald/models';
import { first } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'checklist-create-checklist',
  imports: [
    MatStepper,
    MatStep,
    ReactiveFormsModule,
    BasicChecklistDataComponent,
    CriteriaComponent,
    AddReviewerComponent,
    FinishChecklistComponent,
    MatButton,
    MatStepperPrevious,
    MatStepperNext,
    MatStepperIcon,
    MatIcon,
  ],
  templateUrl: './create-checklist.component.html',
  styleUrl: './create-checklist.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { displayDefaultIndicatorType: false, showError: true },
    },
  ],
  standalone: true,
})
export class CreateChecklistComponent {
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly checklistService = inject(ChecklistService);
  private readonly snackbar = inject(MatSnackBar);
  private readonly router = inject(Router);

  basicData: FormGroup;
  criteriaForm: CriteriaForm;
  reviewerForm: ReviewerForm;

  constructor() {
    this.basicData = this.fb.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
    });

    this.criteriaForm = this.fb.group({
      criteriaGroups: this.fb.array<FormCriteriaGroup>([]),
    });

    this.reviewerForm = this.fb.group({
      reviewers: this.fb.array<FormUser>([]),
    });
  }

  createChecklist() {
    if (
      this.basicData.valid &&
      this.criteriaForm.valid &&
      this.reviewerForm.valid
    ) {
      const basicData = this.basicData.value;
      const reviewers = this.reviewerForm.value.reviewers ?? [];

      this.checklistService
        .createChecklist(
          basicData.title,
          basicData.description,
          this.mapCriteriaGroups(this.criteriaForm),
          reviewers.map((reviewer) => reviewer.uuid ?? '')
        )
        .pipe(first())
        .subscribe(() => {
          this.snackbar.open('User added successfully!', 'Close', {
            duration: 3000,
            verticalPosition: 'top',
          });
          this.router.navigate([FeatureRoutes.get(Feature.Checklists)]);
        });
    }
  }

  private mapCriteriaGroups(criteriaGroupForm: CriteriaForm): CriteriaGroup[] {
    const criteriaGroups = criteriaGroupForm.value.criteriaGroups;

    return (
      criteriaGroups?.map((criteriaGroup) => {
        const mappedCriteria = criteriaGroup.criteria?.map((criterion) => {
          return {
            title: criterion.title ?? '',
            description: criterion.title ?? '',
            maxPoints: criterion.maxPoints,
          } satisfies Criterion;
        });
        return {
          title: criteriaGroup.title ?? '',
          description: criteriaGroup.description ?? '',
          criteria: mappedCriteria,
        } satisfies CriteriaGroup;
      }) ?? []
    );
  }
}
