import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function futureDateValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const currentDate = new Date();
    const inputDate = new Date(control.value);

    if (!control.value) {
      return null; // Allow empty values; use `Validators.required` for required fields
    }

    if (inputDate <= currentDate) {
      return { futureDate: true }; // Validation fails
    }

    return null; // Validation passes
  };
}
