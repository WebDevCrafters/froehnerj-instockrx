import { Component } from '@angular/core';
import { InputComponent } from '../../_shared/components/input/input.component';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonComponent } from '../../_shared/components/button/button.component';
import { CommonModule } from '@angular/common';
import {
  charLimitValidator,
  dateValidator,
  emailValidator,
  requiredValidator,
} from '../../_shared/utils/Validators';
import { CheckboxComponent } from '../../_shared/components/checkbox/checkbox.component';
import { ModalComponent } from '../../_shared/components/modal/modal.component';
import { DatePickerComponent } from '../../_shared/components/date-picker/date-picker.component';
import {
  formatTimestamp,
  formatTimestampToMMDDYYYY,
  mmddyyToTimestamp,
} from '../../_shared/utils/dateTime';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    InputComponent,
    ButtonComponent,
    CommonModule,
    ReactiveFormsModule,
    CheckboxComponent,
    ModalComponent,
    DatePickerComponent,
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent {
  stepNumber: number = 1;
  modalVisible: boolean = false;
  isDateInputActive: boolean = false;
  selectedPackage: string = '2';
  selectedDate: number = new Date().getTime();
  dateFormControl = new FormControl(
    formatTimestampToMMDDYYYY(this.selectedDate),
    dateValidator('Invalid format')
  );
  packageOptions = [
    {
      id: '1',
      title: 'One Med Search',
      cost: 50,
      description:
        "$50 per successfull search.\nGet a full refund if we don't find your medication!",
    },
    {
      id: '2',
      title: 'Three Med Searches',
      cost: 120,
      description:
        '$40 per successfull search.\nMost popular package. Use remaining searches anytime in the future for any medications.',
    },
    {
      id: '3',
      title: 'Six Med Searches',
      cost: 180,
      description:
        '$30 per successfull search.\nBest value! Use remaining searches any time in the future, for any medication.',
    },
  ];

  personalInfoForm = new FormGroup({
    fullName: new FormControl(
      '',
      requiredValidator("Patient's Name cannot be empty")
    ),
    phoneNumber: new FormControl('', [
      requiredValidator("Patient's phone number cannot be empty"),
      charLimitValidator(
        10+4, //inclusing () and -
        "Patient's phone must be 10 digits. (Only US phone numbers are supported at this time.)"
      ),
    ]),
    email: new FormControl('', [
      requiredValidator("Patient's email cannot be empty"),
      emailValidator('Please enter a valid email'),
    ]),
    terms: new FormControl(false, requiredValidator('Please accept')),
  });

  termsControl: FormControl = this.personalInfoForm.controls.terms;
  additionalInfoForm = new FormGroup({
    dob: new FormControl('', [
      requiredValidator("Patient's date of birth cannot be empty"),
      dateValidator('Please enter a valid date'),
    ]),
    zipCode: new FormControl('', [
      requiredValidator('Zip code must not be empty'),
      charLimitValidator(5, 'Zip code must be 5 digits'),
    ]),
    prescriber: new FormControl('', [
      requiredValidator("Prescriber's name cannot be empty"),
    ]),
    prescribedMedication: new FormArray([
      new FormGroup({
        name: new FormControl('', [
          requiredValidator('Medication option 1 cannot be empty'),
        ]),
        dose: new FormControl(''),
        quantity: new FormControl(''),
        brand: new FormControl(''),
      }),
    ]),
    pickupDate: new FormControl(new Date().getTime(), [Validators.required]),
  });

  createPrescribedMedicationFormGroup(): FormGroup {
    return new FormGroup({
      name: new FormControl(''),
      dose: new FormControl(''),
      quantity: new FormControl(''),
      brand: new FormControl(''),
    });
  }

  get prescribedMedication(): FormArray {
    return this.additionalInfoForm.get('prescribedMedication') as FormArray;
  }

  addMedication() {
    console.log('adding');
    this.prescribedMedication.push(this.createPrescribedMedicationFormGroup());
  }

  removeMedication(index: number) {
    this.prescribedMedication.removeAt(index);
  }

  selectPackage(selectedPackageId: string) {
    this.selectedPackage = selectedPackageId;
  }

  onPersonalInfoSubmit() {
    if (this.personalInfoForm.valid) {
      console.log(this.personalInfoForm.value);
      this.stepNumber += 1;
    } else {
      this.personalInfoForm.markAllAsTouched();
      this.markAllAsDirty(this.personalInfoForm);
      console.log(this.personalInfoForm.value);
    }
  }

  onAdditionalInfoSubmit() {
    if (this.additionalInfoForm.valid) {
      console.log(this.additionalInfoForm.value);
      this.stepNumber += 1;
      console.log('step was added');
    } else {
      this.additionalInfoForm.markAllAsTouched();
      this.markAllAsDirty(this.additionalInfoForm);
      console.log(this.additionalInfoForm);
    }
  }

  onSelectPackageSubmit() {
    this.stepNumber += 1;
  }

  markAllAsDirty(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach((key) => {
      const control = formGroup.get(key);

      if (control instanceof FormGroup) {
        this.markAllAsDirty(control); // Recursively mark nested FormGroups as dirty
      } else if (control instanceof FormArray) {
        this.markAllAsDirtyInArray(control); // Handle FormArray
      } else {
        control?.markAsDirty();
      }
    });
  }

  markAllAsDirtyInArray(formArray: FormArray) {
    formArray.controls.forEach((control) => {
      if (control instanceof FormGroup) {
        this.markAllAsDirty(control); // Recursively mark nested FormGroups in the array as dirty
      } else if (control instanceof FormArray) {
        this.markAllAsDirtyInArray(control); // Handle nested FormArrays
      } else {
        control.markAsDirty();
      }
    });
  }

  getControl(formArrayIndex: number, formControlName: string): FormControl {
    const medicationFormGroup =
      this.additionalInfoForm.controls.prescribedMedication.at(
        formArrayIndex
      ) as FormGroup;
    return medicationFormGroup.get(formControlName) as FormControl;
  }

  openDateChooserModal() {
    this.modalVisible = true;
  }

  closeDateChooserModal(): void {
    this.modalVisible = false;
  }

  onDatePicked(timestamp: number) {
    this.selectedDate = timestamp;
  }

  toggleDateInput() {
    this.isDateInputActive = !this.isDateInputActive;
  }

  formatTimestamp(timestamp: number | null) {
    if (!timestamp) return '';
    return formatTimestamp(timestamp);
  }

  onPositivePress() {
    let pickupTimestamp = 0;
    if (this.isDateInputActive && this.dateFormControl.value) {
      if (!this.dateFormControl.valid) return;
      pickupTimestamp = mmddyyToTimestamp(this.dateFormControl.value);
    } else {
      pickupTimestamp = this.selectedDate;
    }
    this.additionalInfoForm.controls.pickupDate.setValue(pickupTimestamp);
    this.closeDateChooserModal();
  }
}
