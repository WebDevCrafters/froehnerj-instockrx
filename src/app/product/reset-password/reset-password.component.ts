import { Component } from '@angular/core';
import { InputComponent } from '../../_shared/components/input/input.component';
import { ButtonComponent } from '../../_shared/components/button/button.component';
import { FormControl, FormGroup, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [InputComponent, ButtonComponent, FormsModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss'
})
export class ResetPasswordComponent {
  resetPasswordForm = new FormGroup({
    verificationCode: new FormControl(""),
    newPassword: new FormControl(""),
    confirmNewPassword: new FormControl("")
  })

  onSubmit(){
    console.log(this.resetPasswordForm)
  }
}
