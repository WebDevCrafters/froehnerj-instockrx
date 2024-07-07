import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, FormsModule } from '@angular/forms';
import { InputComponent } from '../../_shared/components/input/input.component';
import { ButtonComponent } from '../../_shared/components/button/button.component';
import { AuthService } from '../../_core/services/auth.service';
import { Router } from '@angular/router';
import APP_ROUTES from '../../_shared/constants/routes';
import { User } from '../../_shared/dataTypes/User';
import { CustomSearchDropdownComponent } from '../auth/custom-search-dropdown/custom-search-dropdown.component';
import { CommonModule } from '@angular/common';
import { emailValidator, requiredValidator } from '../../_shared/utils/Validators';
import { markAllAsDirty } from '../../_shared/utils/formUtils';

@Component({
    selector: 'app-signin',
    standalone: true,
    imports: [InputComponent, ButtonComponent, CustomSearchDropdownComponent, FormsModule, CommonModule],
    templateUrl: './signin.component.html',
    styleUrl: './signin.component.scss'
})
export class SigninComponent {
    @Input() public isSignUpScreenVisible: boolean = false;
    @Input() public isSignInScreenVisible: boolean = true;
    @Input() public isForgotPasswordScreenVisible: boolean = false;
    @Input() public isEmailLoginInOptionSelected: boolean = true;
    @Input() public isVerificationScreenVisible: boolean = false;
    @Input() public patientSignUp: boolean = false;
    @Input() public signInInfoForm = new FormGroup({
        email: new FormControl(''),
        phoneNumber: new FormControl(''),
        password: new FormControl(''),
    });

    @Output() public stateChange = new EventEmitter<{ isSignUpScreenVisible: boolean, isSignInScreenVisible: boolean, isForgotPasswordScreenVisible: boolean, isEmailLoginInOptionSelected: boolean, isVerificationScreenVisible: boolean, patientSignUp: boolean }>();

    constructor(private authService: AuthService, private router: Router) { }

    public openSignUpScreen() {
        this.isSignInScreenVisible = false;
        this.isSignUpScreenVisible = true;
        this.isForgotPasswordScreenVisible = false;
        this.isVerificationScreenVisible = false;
        this.patientSignUp = this.patientSignUp;
        this.emitStateChange();
    }

    public openForgotPasswordScreen() {
        this.isSignInScreenVisible = false;
        this.isSignUpScreenVisible = false;
        this.isForgotPasswordScreenVisible = true;
        this.isVerificationScreenVisible = false;
        this.patientSignUp = this.patientSignUp;
        this.emitStateChange();
    }

    public markEmailOptionAsSelected() {
        this.isEmailLoginInOptionSelected = true;
        this.emitStateChange();
    }

    public markPasswordOptionAsSelected() {
        this.isEmailLoginInOptionSelected = false;
        this.emitStateChange();
    }

    public signin() {
        const user: User = {
            email: this.signInInfoForm.controls.email.value || "",
            firstName: "John", //should fetch from server
            lastName:  "Doe",
            phoneNumber: this.signInInfoForm.controls.phoneNumber.value || "",
            type: this.patientSignUp? "patient" : "clinician"
        }
        this.authService.signIn(user);
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

    public onSucces() {
        this.signInInfoForm.markAllAsTouched();
        markAllAsDirty(this.signInInfoForm);
        if (this.signInInfoForm.controls.email.valid===false && this.signInInfoForm.controls.phoneNumber.valid===false) return;
        this.signin();
    }
}
