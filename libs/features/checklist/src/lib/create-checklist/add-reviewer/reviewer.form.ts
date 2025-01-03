import { FormArray, FormControl, FormGroup } from '@angular/forms';

export type FormUser = FormGroup<{
  uuid: FormControl<string>;
}>;

export type ReviewerForm = FormGroup<{
  reviewers: FormArray<FormUser>;
}>;
