import { AbstractControl, FormArray, ValidationErrors, ValidatorFn } from '@angular/forms';

export function arrayNotEmptyValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (control instanceof FormArray && control.controls.length > 0) {
      return null;
    }
    return { atLeastOneEntry: true };
  };
}
