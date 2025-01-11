import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { CriterionType } from '@emerald/models';

export type FormCriterion = FormGroup<{
  description: FormControl<string>;
  criterionType: FormControl<CriterionType>;
  maxPoints: FormControl<number>;
}>;

export type FormCriteriaGroup = FormGroup<{
  title: FormControl<string>;
  description: FormControl<string>;
  criteria: FormArray<FormCriterion>;
}>;

export type CriteriaForm = FormGroup<{
  criteriaGroups: FormArray<FormCriteriaGroup>;
}>;
