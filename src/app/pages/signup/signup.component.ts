import { Component } from '@angular/core';
import { InputComponent } from '../../_shared/components/input/input.component';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonComponent } from '../../_shared/components/button/button.component';
import { CommonModule } from '@angular/common';
import { emailValidator, requiredValidator } from '../../_shared/utils/Validators';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [InputComponent, ButtonComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {

  stepNumber: number = 1;
  medicationList = [1]
  selectedPackage: string = "2";
  packageOptions = [
    {
      id: "1",
      title: "One Med Search",
      cost: 50,
      description: "$50 per successfull search.\nGet a full refund if we don't find your medication!"
    },
    {
      id: "2",
      title: "Three Med Searches",
      cost: 120,
      description: "$40 per successfull search.\nMost popular package. Use remaining searches anytime in the future for any medications."
    },
    {
      id: "3",
      title: "Six Med Searches",
      cost: 180,
      description: "$30 per successfull search.\nBest value! Use remaining searches any time in the future, for any medication."
    },
  ]

  personalInfoForm = new FormGroup({
    fullName: new FormControl('', requiredValidator("Patient's Name cannot be empty")),
    phoneNumber: new FormControl('', requiredValidator("Patient's phone number cannot be empty")),
    email: new FormControl('', [
      requiredValidator("Patient's email cannot be empty"),
      emailValidator("Please enter a valid email")
    ]),
    terms: new FormControl(false, requiredValidator("Please accept"))
  });

  additionalInfoForm = new FormGroup({
    dob: new FormControl('', [Validators.required]),
    zipCode: new FormControl('', [Validators.required]),
    prescriber: new FormControl('', [Validators.required]),
    prescribedMedication: new FormControl('', [Validators.required]),
    pickupDate: new FormControl('', [Validators.required])
  });

  selectPackage(selectedPackageId: string) {
    this.selectedPackage = selectedPackageId;
  }

  onPersonalInfoSubmit() {
    if (this.personalInfoForm.valid) {
      console.log(this.personalInfoForm.value);
      this.stepNumber += 1;

    } else {
      this.personalInfoForm.markAllAsTouched()
      this.markAllAsDirty(this.personalInfoForm);
      console.log(this.personalInfoForm.value);
    }
  }

  markAllAsDirty(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(key => {
      formGroup.get(key)?.markAsDirty();
    });
  }

}
