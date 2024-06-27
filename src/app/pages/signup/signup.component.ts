import { Component } from '@angular/core';
import { InputComponent } from '../../_shared/components/input/input.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ButtonComponent } from '../../_shared/components/button/button.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [InputComponent, ButtonComponent, CommonModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {

  stepNumber: number = 3;
  medicationList=[1]

  personalInfoForm = new FormGroup({
    fullName: new FormControl('', [Validators.required]),
    phoneNumber: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email])
  });

  additionalInfoForm = new FormGroup({
    dob: new FormControl('', [Validators.required]),
    zipCode: new FormControl('', [Validators.required]),
    prescriber: new FormControl('', [Validators.required]),
    prescribedMedication: new FormControl('', [Validators.required]),
    pickupDate: new FormControl('', [Validators.required])
  });

  onContinuePress() {
    console.log(this.stepNumber)
    this.stepNumber = this.stepNumber + 1;
    console.log(this.stepNumber)
  }
}
