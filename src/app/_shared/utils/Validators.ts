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

export function dateValidator(errorMessage: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const dateRegex = /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/\d{4}$/;
    return dateRegex.test(control.value) ? null : { date: errorMessage };
  };
}

export function charLimitValidator(limit: number, errorMessage: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    return control.value && control.value.length !== limit ? { charLimit: errorMessage } : null;
  };
}