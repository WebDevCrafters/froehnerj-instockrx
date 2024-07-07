import { Component, EventEmitter, Input, Output } from '@angular/core';
import { InputComponent } from '../../_shared/components/input/input.component';
import { ButtonComponent } from '../../_shared/components/button/button.component';
import { CustomSearchDropdownComponent } from '../auth/custom-search-dropdown/custom-search-dropdown.component';
import { FormControl, FormGroup, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../_core/services/auth.service';
import { User } from '../../_shared/dataTypes/User';
import APP_ROUTES from '../../_shared/constants/routes';

@Component({
    selector: 'app-signup',
    standalone: true,
    imports: [InputComponent, ButtonComponent, CustomSearchDropdownComponent, FormsModule, CommonModule],
    templateUrl: './signup.component.html',
    styleUrl: './signup.component.scss',
})
export class SignupComponent {
    @Input() public isSignUpScreenVisible: boolean = false;
    @Input() public isSignInScreenVisible: boolean = true;
    @Input() public isForgotPasswordScreenVisible: boolean = false;
    @Input() public isEmailLoginInOptionSelected: boolean = true;
    @Input() public isVerificationScreenVisible: boolean = true;
    @Input() public patientSignUp: boolean = false;
    @Input() public signUpInfoForm = new FormGroup({
        firstName: new FormControl(''),
        lastName: new FormControl(''),
        email: new FormControl(''),
        phoneNumber: new FormControl(''),
        password: new FormControl(''),
    });

    @Output() public stateChange = new EventEmitter<{ isSignUpScreenVisible: boolean, isSignInScreenVisible: boolean, isForgotPasswordScreenVisible: boolean, isEmailLoginInOptionSelected: boolean, isVerificationScreenVisible: boolean, patientSignUp: boolean }>();

    constructor(private authService: AuthService, private router: Router) { }

    public openSignInScreen() {
        this.isSignInScreenVisible = true;
        this.isSignUpScreenVisible = false;
        this.isForgotPasswordScreenVisible = false;
        this.isVerificationScreenVisible = false;
        this.patientSignUp = this.patientSignUp;
        this.emitStateChange();
    }

    public signUp() {
        const user: User = {
            email: this.signUpInfoForm.controls.email.value || "",
            firstName: this.signUpInfoForm.controls.firstName.value || "",
            lastName: this.signUpInfoForm.controls.lastName.value || "",
            phoneNumber: this.signUpInfoForm.controls.phoneNumber.value || "",
            type: this.patientSignUp? "patient" : "clinician"
        }
        this.authService.signUp(user);
        this.router.navigate([`${APP_ROUTES.product.app}/${APP_ROUTES.product.dashboard}`], { replaceUrl: true })
    }

    private emitStateChange() {
        this.stateChange.emit({
            isSignUpScreenVisible: this.isSignUpScreenVisible,
            isSignInScreenVisible: this.isSignInScreenVisible,
            isForgotPasswordScreenVisible: this.isForgotPasswordScreenVisible,
            isEmailLoginInOptionSelected: this.isEmailLoginInOptionSelected,
            isVerificationScreenVisible: this.isVerificationScreenVisible,
            patientSignUp: this.patientSignUp
        });
    }

    public onSuccess() {
        // if (!this.signUpInfoForm.valid) return;
        this.isSignInScreenVisible = false;
        this.isSignUpScreenVisible = false;
        this.isForgotPasswordScreenVisible = false;
        this.isVerificationScreenVisible = true;
        this.emitStateChange();

        this.signUp();
    }
}
