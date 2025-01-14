import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  input,
  signal,
} from '@angular/core';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  MatAccordion,
  MatExpansionPanel,
  MatExpansionPanelHeader,
  MatExpansionPanelTitle,
} from '@angular/material/expansion';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { CriteriaForm, FormCriterion } from './criteria.form';
import { arrayNotEmptyValidator } from '@emerald/services';
import {
  MatButtonToggle,
  MatButtonToggleGroup,
} from '@angular/material/button-toggle';
import { CriterionType } from '@emerald/models';

@Component({
  selector: 'project-criteria',
  imports: [
    ReactiveFormsModule,
    MatAccordion,
    MatExpansionPanel,
    MatExpansionPanelTitle,
    MatFormField,
    MatInput,
    MatButton,
    MatExpansionPanelHeader,
    MatLabel,
    MatButtonToggleGroup,
    MatButtonToggle,
  ],
  templateUrl: './criteria.component.html',
  styleUrl: './criteria.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class CriteriaComponent {
  private readonly fb = inject(NonNullableFormBuilder);

  protected readonly CriterionType = CriterionType;

  form = input.required<CriteriaForm>();

  addCriteriaGroup() {
    this.form().controls.criteriaGroups.push(
      this.fb.group({
        title: ['', Validators.required],
        description: '',
        criteria: this.fb.array<FormCriterion>([], arrayNotEmptyValidator()),
      })
    );
  }

  addCriterion(groupIndex: number) {
    this.form()
      .controls.criteriaGroups.at(groupIndex)
      .controls.criteria.push(
        this.fb.group({
          description: [''],
          criterionType: [CriterionType.BINARY],
          maxPoints: 0,
        })
      );
  }

  /**
   * Removes a criteria group at a given index
   * @param groupIndex The index to remove the criteria group
   */
  removeCriteriaGroup(groupIndex: number): void {
    this.form().controls.criteriaGroups.removeAt(groupIndex);
  }

  /**
   * Removes a criterion from a specified criteria group
   * @param groupIndex the group from which the criterion is removed
   * @param criterionIndex the index of the  criterion to be removed
   */
  removeCriterion(groupIndex: number, criterionIndex: number): void {
    this.form()
      .controls.criteriaGroups.at(groupIndex)
      .controls.criteria.removeAt(criterionIndex);
  }
}
