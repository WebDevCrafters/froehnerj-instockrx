import { Component } from '@angular/core';
import { InputComponent } from '../../_shared/components/input/input.component';
import { ButtonComponent } from '../../_shared/components/button/button.component';
import { FormControl, FormGroup, FormsModule } from '@angular/forms';
import { emailValidator, matchPasswordValidator, passwordValidator, requiredValidator } from '../../_shared/utils/Validators';
import { markAllAsDirty } from '../../_shared/utils/formUtils';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../_core/services/user.service';
import { ResetPasswordRequest } from '../_shared/interfaces/ResetPasswordRequest';
import { Router } from '@angular/router';
import APP_ROUTES from '../../_shared/constants/routes';

@Component({
    selector: 'app-reset-password',
    standalone: true,
    imports: [InputComponent, ButtonComponent, FormsModule],
    templateUrl: './reset-password.component.html',
    styleUrl: './reset-password.component.scss'
})
export class ResetPasswordComponent {
    public isLoading: boolean = false;
    public isEmailSubmitted: boolean = false;
    public emailForm = new FormGroup({
        email: new FormControl('', [
            requiredValidator('Email cannot be empty.'),
            emailValidator('Invalid email format.'),
        ]),
    })
    public resetPasswordForm = new FormGroup(
        {
            verificationCode: new FormControl('', requiredValidator('Verification code cannot be empty')),
            newPassword: new FormControl('', [
                requiredValidator('New Password cannot be empty.'),
                passwordValidator(
                    'Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, a number, and a special character'
                ),
            ]),
            confirmPassword: new FormControl('', [
                requiredValidator('Confirm password cannot be empty.'),
            ]),
        },
        { validators: matchPasswordValidator('newPassword', 'confirmPassword') }
    );

    constructor(
        private toastrService: ToastrService,
        private userService: UserService,
        private router: Router,
    ) { }

    onResetPasswordSubmit() {
        console.log(this.resetPasswordForm)
        this.isLoading = true;
        this.resetPasswordForm.markAllAsTouched();
        markAllAsDirty(this.resetPasswordForm);
        if (!this.resetPasswordForm.valid) {
            this.isLoading = false;
            return;
        }
        this.resetPassword();
    }

    resetPassword() {
        let control = this.resetPasswordForm.controls;
        let resetPasswordRequest: ResetPasswordRequest = {
            email: this.emailForm.controls.email.value || '',
            otp: control.verificationCode.value || '',
            newPassword: control.newPassword.value || ''
        }
        this.userService.resetPassword(resetPasswordRequest).subscribe({
            next: (result) => {
                this.isLoading = false;
                this.toastrService.success(`Password updated successfully`);
                this.router.navigate([
                    APP_ROUTES.product.app,
                    APP_ROUTES.product.auth,
                    APP_ROUTES.product.signIn,
                ]);
            },
            error: (err) => {
                this.isLoading = false;
                console.log(err);
                this.toastrService.error(err.error.message);
            },
        })
    }

    onEmailSubmit() {
        console.log(this.emailForm)
        this.isLoading = true;
        this.emailForm.markAllAsTouched();
        markAllAsDirty(this.emailForm);
        if (!this.emailForm.valid) {
            this.isLoading = false;
            return;
        }
        this.forgotPassword();
    }

    forgotPassword() {
        let value = this.emailForm.controls.email.value;
        if (!value) {
            this.toastrService.error("Failed to sent OTP")
            return;
        }
        this.userService.forgotPassword(value).subscribe({
            next: (result) => {
                this.isEmailSubmitted = true;
                this.isLoading = false;
                this.toastrService.success(`OTP has been sent to ${value} successfully.`);
            },
            error: (err) => {
                console.log(err);
                this.toastrService.error(err.error.message);
            },
        })
    }
}
