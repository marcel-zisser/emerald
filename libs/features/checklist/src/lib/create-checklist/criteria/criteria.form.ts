import { FormArray, FormControl, FormGroup } from '@angular/forms';

export type FormCriterion = FormGroup<{
  title: FormControl<string>;
  description: FormControl<string>;
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
