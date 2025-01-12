import { FormControl, FormGroup } from '@angular/forms';
import { CriterionStatus } from '@emerald/models';

export type ReviewForm = FormGroup<{
  status: FormControl<CriterionStatus | undefined>;
  points: FormControl<number | undefined>;
  comments: FormControl<string | undefined>;
}>;
