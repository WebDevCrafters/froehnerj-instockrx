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

export function passwordValidator(errorMessage: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const password = control.value;

        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumber = /[0-9]/.test(password);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
        const minLength = password ? password.length >= 8 : false;

        const isValid = hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar && minLength;

        return isValid ? null : { password: errorMessage };
    };
}

export function matchPasswordValidator(
    controlName: string,
    matchingControlName: string
): ValidatorFn {
    return (formGroup: AbstractControl): ValidationErrors | null => {
        const control = formGroup.get(controlName);
        const matchingControl = formGroup.get(matchingControlName);

        if (control && matchingControl && control.value !== matchingControl.value) {
            matchingControl.setErrors({ passwordMismatch: 'Passwords do not match' });
            return { passwordMismatch: 'Passwords do not match' };
        } else {
            return null;
        }
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