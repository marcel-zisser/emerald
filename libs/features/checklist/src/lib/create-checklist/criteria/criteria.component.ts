import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import {
  MatAccordion,
  MatExpansionPanel, MatExpansionPanelContent,
  MatExpansionPanelDescription, MatExpansionPanelHeader,
  MatExpansionPanelTitle
} from '@angular/material/expansion';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { MatButton, MatIconButton } from '@angular/material/button';
import { NgForOf } from '@angular/common';

@Component({
  selector: 'checklist-criteria',
  imports: [
    ReactiveFormsModule,
    MatAccordion,
    MatExpansionPanel,
    MatExpansionPanelTitle,
    MatExpansionPanelDescription,
    MatFormField,
    MatIcon,
    MatInput,
    MatIconButton,
    MatButton,
    MatExpansionPanelHeader,
    MatLabel,
    NgForOf,
    MatExpansionPanelContent
  ],
  templateUrl: './criteria.component.html',
  styleUrl: './criteria.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true
})
export class CriteriaComponent {
  private readonly formBuilder = inject(FormBuilder);

  criteriaForm: FormGroup;

  constructor() {
    this.criteriaForm = this.formBuilder.group({
      criteriaGroups: this.formBuilder.array([])
    })
  }

  /**
   * Gets the criteria Groups from the form
   */
  get criteriaGroups(): FormArray {
    return this.criteriaForm.get('criteriaGroups') as FormArray;
  }

  /**
   * Adds a new criteria group to the form
   */
  addCriteriaGroup(): void {
    const group = this.formBuilder.group({
      groupName: [''],
      criteria: this.formBuilder.array([]),
    });
    this.criteriaGroups.push(group);
  }

  /**
   * Removes a specific criteria group
   * @param index the index of the criteria group to remove
   */
  removeCriteriaGroup(index: number): void {
    this.criteriaGroups.removeAt(index);
  }

  /**
   * Gets a specific criteria group by index
   * @param groupIndex the index of the criteria group to get
   */
  getCriteria(groupIndex: number): FormArray {
    return this.criteriaGroups.at(groupIndex).get('criteria') as FormArray;
  }

  /**
   * Adds a new criterion to a specified group
   * @param groupIndex the index of the group
   */
  addCriterion(groupIndex: number): void {
    const criterion = this.formBuilder.group({
      name: [''], // Name of the criterion
      value: [''], // Value of the criterion
    });
    this.getCriteria(groupIndex).push(criterion);
  }

  /**
   * Removes a specific criterion from a specified group
   * @param groupIndex the index of the group from which the criterion needs to be removed
   * @param criterionIndex the index of the criterion to remove
   */
  removeCriterion(groupIndex: number, criterionIndex: number): void {
    this.getCriteria(groupIndex).removeAt(criterionIndex);
  }

}
