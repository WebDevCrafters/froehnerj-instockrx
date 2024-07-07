import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { InputComponent } from '../../_shared/components/input/input.component';
import { ButtonComponent } from '../../_shared/components/button/button.component';
import { CommonModule } from '@angular/common';
import { CustomSearchDropdownComponent } from './custom-search-dropdown/custom-search-dropdown.component';
import { AuthService } from '../../_core/services/auth.service';
import { User } from '../../_shared/dataTypes/User';
import { ActivatedRoute, Router } from '@angular/router';
import APP_ROUTES from '../../_shared/constants/routes';
import { SigninComponent } from '../signin/signin.component';
import { SignupComponent } from '../signup/signup.component';
import { ForgotPasswordComponent } from '../forgot-password/forgot-password.component';
import { VerificationCodeComponent } from '../verification-code/verification-code.component';
import { emailValidator, requiredValidator } from '../../_shared/utils/Validators';

@Component({
    selector: 'app-auth',
    standalone: true,
    imports: [InputComponent, ButtonComponent, CommonModule, CustomSearchDropdownComponent, SigninComponent, SignupComponent, ForgotPasswordComponent, VerificationCodeComponent],
    templateUrl: './auth.component.html',
    styleUrl: './auth.component.scss'
})
export class AuthComponent implements OnInit {
    public isSignUpScreenVisible: boolean = true;
    public isSignInScreenVisible: boolean = false;
    public isForgotPasswordScreenVisible: boolean = false;
    public isEmailLoginInOptionSelected: boolean = true;
    public isVerificationScreenVisible: boolean = false;
    public patientSignUp: boolean = true;

    constructor(
        private authService: AuthService,
        private router: Router,
        private route: ActivatedRoute
    ) { }

    ngOnInit(): void {
        this.route.queryParams.subscribe((params) => {
            const serializedValue = params['patientSignUp'];
            if (serializedValue) {
                this.patientSignUp = JSON.parse(serializedValue);
            }
        });
    }

    public openPatientSignUpScreen() {
        this.isSignInScreenVisible = false;
        this.isSignUpScreenVisible = true;
        this.isForgotPasswordScreenVisible = false;
        this.isVerificationScreenVisible = false;
        this.patientSignUp = true;
    }

    public signInInfoForm = new FormGroup({
        email: new FormControl('', [
            requiredValidator("Email field must not be blank."),
            emailValidator("Invalid email format.")
        ]),
        phoneNumber: new FormControl('', [
            requiredValidator("Phone Number field must not be blank.")
        ]),
        password: new FormControl('', [
            requiredValidator("Password field must not be blank.")
        ]),
    });

    public signUpInfoForm = new FormGroup({
        firstName: new FormControl('',[
            requiredValidator("First name cannot be empty.")
        ]),
        lastName: new FormControl('',[
            requiredValidator("Last name cannot be empty.")
        ]),
        email: new FormControl('',[
            requiredValidator("Email cannot be empty."),
            emailValidator("Invalid email format.")
        ]),
        phoneNumber: new FormControl('',[
            requiredValidator("Phone number cannot be empty.")
        ]),
        password: new FormControl('',[
            requiredValidator("Password cannot be empty.")
        ]),
    });

    public verificationCodeInfo = new FormGroup({
      email: new FormControl(""),
        code: new FormControl('',
            requiredValidator('Verification code cannot be empty.')),
    });

    public forgotPasswordInfo = new FormGroup({
        email: new FormControl('',
            emailValidator('Username/client id combination not found')),
        phoneNumber: new FormControl('',
            emailValidator('Username/client id combination not found')),
    });

    public updateStates(state: { isSignUpScreenVisible: boolean, isSignInScreenVisible: boolean, isForgotPasswordScreenVisible: boolean, isEmailLoginInOptionSelected: boolean, patientSignUp: boolean }) {
        this.isSignUpScreenVisible = state.isSignUpScreenVisible;
        this.isSignInScreenVisible = state.isSignInScreenVisible;
        this.isForgotPasswordScreenVisible = state.isForgotPasswordScreenVisible;
        this.isEmailLoginInOptionSelected = state.isEmailLoginInOptionSelected;
        this.patientSignUp = state.patientSignUp;
    }

    public signin() {
        const user: User = {
            email: "dummyEmail@email.com",
            firstName: "John",
            lastName: "Doe",
            phoneNumber: "+1134567892",
            type: 'patient'
        }
        this.authService.signIn(user);
        this.router.navigate([`${APP_ROUTES.product.app}/${APP_ROUTES.product.dashboard}`], { replaceUrl: true })
    }
}
