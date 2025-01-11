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
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { CriteriaForm, FormCriteriaGroup } from './criteria/criteria.form';
import { FormUser, ReviewerForm } from './add-reviewer/reviewer.form';
import { ProjectService } from '../project/project.service';
import {
  CriteriaGroup,
  Criterion,
  Feature,
  FeatureRoutes,
} from '@emerald/models';
import { first } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { arrayNotEmptyValidator } from '@emerald/services';
import { AddReviewerComponent } from './add-reviewer/add-reviewer.component';
import { BasicProjectDataComponent } from './basic-project-data/basic-project-data.component';
import { CriteriaComponent } from './criteria/criteria.component';

@Component({
  selector: 'project-create-project',
  imports: [
    MatStepper,
    MatStep,
    ReactiveFormsModule,
    MatButton,
    MatStepperPrevious,
    MatStepperNext,
    MatStepperIcon,
    MatIcon,
    AddReviewerComponent,
    BasicProjectDataComponent,
    CriteriaComponent
  ],
  templateUrl: './create-project.component.html',
  styleUrl: './create-project.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { displayDefaultIndicatorType: false, showError: true },
    },
  ],
  standalone: true,
})
export class CreateProjectComponent {
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly checklistService = inject(ProjectService);
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
      criteriaGroups: this.fb.array<FormCriteriaGroup>([], arrayNotEmptyValidator()),
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
          this.snackbar.open('Successfully saved checklist!', 'Close', {
            duration: 3000,
            verticalPosition: 'top',
          });
          this.router.navigate([FeatureRoutes.get(Feature.Projects)]);
        });
    } else {
      this.snackbar.open('There has been an error saving the checklist. Please check if your data is valid.', 'Close', {
        duration: 3000,
        verticalPosition: 'top',
      });
    }
  }

  private mapCriteriaGroups(criteriaGroupForm: CriteriaForm): CriteriaGroup[] {
    const criteriaGroups = criteriaGroupForm.value.criteriaGroups;

    return (
      criteriaGroups?.map((criteriaGroup) => {
        const mappedCriteria = criteriaGroup.criteria?.map((criterion) => {
          return {
            description: criterion.title ?? '',
            type: criterion.type,
            maxPoints: criterion.maxPoints,
          } satisfies Criterion;
        });
        return {
          description: criteriaGroup.description ?? '',
          criteria: mappedCriteria,
        } satisfies CriteriaGroup;
      }) ?? []
    );
  }
}
