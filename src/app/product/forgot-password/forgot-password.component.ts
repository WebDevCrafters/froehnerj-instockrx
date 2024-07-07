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
    selector: 'app-forgot-password',
    standalone: true,
    imports: [InputComponent, ButtonComponent, CustomSearchDropdownComponent, FormsModule, CommonModule],
    templateUrl: './forgot-password.component.html',
    styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent {
    @Input() public isSignUpScreenVisible: boolean = false;
    @Input() public isSignInScreenVisible: boolean = true;
    @Input() public isForgotPasswordScreenVisible: boolean = false;
    @Input() public isVerificationScreenVisible: boolean = false;
    @Input() public isEmailLoginInOptionSelected: boolean = true;
    @Input() public patientSignUp: boolean = false;
    @Input() public forgotPasswordInfo = new FormGroup({
        email: new FormControl(''),
        phoneNumber: new FormControl(''),
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
            email: "dummyEmail@email.com",
            firstName: "John",
            lastName: "Doe",
            phoneNumber: "+1134567892",
            type: "patient"
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
        this.forgotPasswordInfo.markAllAsTouched();
        markAllAsDirty(this.forgotPasswordInfo);
        if (this.forgotPasswordInfo.controls.email.valid === false && this.forgotPasswordInfo.controls.phoneNumber.valid === false) return;
    }
}