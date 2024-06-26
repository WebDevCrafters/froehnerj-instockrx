import { Component } from '@angular/core';
import { InputComponent } from '../../_shared/components/input/input.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ButtonComponent } from '../../_shared/components/button/button.component';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [InputComponent, ButtonComponent],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {

  step: number = 1;

  formGroup = new FormGroup({
    fullName: new FormControl("", [Validators.required]),
    phoneNumber: new FormControl("", [Validators.required]),
    email: new FormControl("", [Validators.required])
  })

  onContinuePress(event: MouseEvent) {
    // this.step = this.step + 1;
    console.log(this.step)
  }
}
