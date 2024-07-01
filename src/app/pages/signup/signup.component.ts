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
import { PersonalInfoComponent } from './personal-info/personal-info.component';
import { markAllAsDirty } from '../../_shared/utils/formUtils';
import { AdditionalInfoComponent } from './additional-info/additional-info.component';
import { SelectPackageComponent } from './select-package/select-package.component';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    CommonModule,
    PersonalInfoComponent,
    AdditionalInfoComponent,
    SelectPackageComponent,
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent {
  stepNumber: number = 3;
  selectedPackageId: string = '2';

  personalInfoForm = new FormGroup({
    fullName: new FormControl(
      '',
      requiredValidator("Patient's Name cannot be empty")
    ),
    phoneNumber: new FormControl('', [
      requiredValidator("Patient's phone number cannot be empty"),
      charLimitValidator(
        10 + 4, //inclusing () and -
        "Patient's phone must be 10 digits. (Only US phone numbers are supported at this time.)"
      ),
    ]),
    email: new FormControl('', [
      requiredValidator("Patient's email cannot be empty"),
      emailValidator('Please enter a valid email'),
    ]),
    terms: new FormControl(false, requiredValidator('Please accept')),
  });

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

  onPersonalInfoSubmit() {
    console.log(this.personalInfoForm.valid);
    if (this.personalInfoForm.valid) {
      console.log(this.personalInfoForm.value);
      this.stepNumber += 1;
    } else {
      this.personalInfoForm.markAllAsTouched();
      markAllAsDirty(this.personalInfoForm);
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
      markAllAsDirty(this.additionalInfoForm);
      console.log(this.additionalInfoForm);
    }
  }

  onSelectPackageSubmit(packageId: string) {
    this.selectedPackageId = packageId;
    this.stepNumber += 1;
    console.log("got", packageId)
  }
}
