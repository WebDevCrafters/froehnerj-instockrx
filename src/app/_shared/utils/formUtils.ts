import { FormArray, FormGroup } from '@angular/forms';

export function markAllAsDirty(formGroup: FormGroup) {
  Object.keys(formGroup.controls).forEach((key) => {
    const control = formGroup.get(key);

    if (control instanceof FormGroup) {
      markAllAsDirty(control); // Recursively mark nested FormGroups as dirty
    } else if (control instanceof FormArray) {
      markAllAsDirtyInArray(control); // Handle FormArray
    } else {
      control?.markAsDirty();
    }
  });
}

export function markAllAsDirtyInArray(formArray: FormArray) {
  formArray.controls.forEach((control) => {
    if (control instanceof FormGroup) {
      markAllAsDirty(control); // Recursively mark nested FormGroups in the array as dirty
    } else if (control instanceof FormArray) {
      markAllAsDirtyInArray(control); // Handle nested FormArrays
    } else {
      control.markAsDirty();
    }
  });
}
