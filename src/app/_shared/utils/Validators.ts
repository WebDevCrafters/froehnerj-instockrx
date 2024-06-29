import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function requiredValidator(errorMessage: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    return control.value ? null : { required: errorMessage };
  };
}

export function emailValidator(errorMessage: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i;
      return emailRegex.test(control.value) ? null : { email: errorMessage };
    };
  }