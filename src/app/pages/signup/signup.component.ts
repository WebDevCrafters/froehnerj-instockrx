import { Component } from '@angular/core';
import { InputComponent } from '../../_shared/components/input/input.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ButtonComponent } from '../../_shared/components/button/button.component';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [InputComponent, ButtonComponent, CommonModule, HeaderComponent],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {

  stepNumber: number = 3;
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

  selectPackage(selectedPackageId: string){
    this.selectedPackage = selectedPackageId;
  }

  onContinuePress() {
    console.log(this.stepNumber)
    this.stepNumber = this.stepNumber + 1;
    console.log(this.stepNumber)
  }
}
