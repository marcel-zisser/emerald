import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatStep, MatStepper, MatStepperNext, MatStepperPrevious } from '@angular/material/stepper';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BasicChecklistDataComponent } from './basic-checklist-data/basic-checklist-data.component';
import { CriteriaComponent } from './criteria/criteria.component';
import { AddReviewerComponent } from './add-reviewer/add-reviewer.component';
import { FinishChecklistComponent } from './finish-checklist/finish-checklist.component';
import { MatButton } from '@angular/material/button';

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
    MatStepperNext
  ],
  templateUrl: './create-checklist.component.html',
  styleUrl: './create-checklist.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true
})
export class CreateChecklistComponent {
  private readonly formBuilder = inject(FormBuilder);

  basicData: FormGroup;

  constructor() {
    this.basicData = this.formBuilder.group({
      name: ['', [Validators.required]],
    });
  }
}
