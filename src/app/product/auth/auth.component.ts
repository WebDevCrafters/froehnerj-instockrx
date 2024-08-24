import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { InputComponent } from '../../_shared/components/input/input.component';
import { ButtonComponent } from '../../_shared/components/button/button.component';
import { CommonModule } from '@angular/common';
import { CustomSearchDropdownComponent } from '../../_shared/components/custom-search-dropdown/custom-search-dropdown.component';
import { User } from '../_shared/interfaces/User';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import APP_ROUTES from '../../_shared/constants/routes';
import { VerificationCodeComponent } from '../verification-code/verification-code.component';
import { emailValidator, requiredValidator } from '../../_shared/utils/Validators';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { UserService } from '../../_core/services/user.service';

@Component({
    selector: 'app-auth',
    standalone: true,
    imports: [InputComponent, ButtonComponent, CommonModule, CustomSearchDropdownComponent, SigninComponent, SignupComponent, ForgotPasswordComponent, VerificationCodeComponent, RouterOutlet],
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
    isPatientRoute: boolean = false;
    isSignUpPage: boolean = false;

    constructor(
        private userService: UserService,
        private router: Router,
        private route: ActivatedRoute
    ) { }

    ngOnInit(): void {
        this.route.firstChild?.url.subscribe(url => {
            if (url.length > 0) {
                this.isPatientRoute = url[0].path === 'patient';
                this.isSignUpPage = url[0].path === 'signup';
            }
        });
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
        firstName: new FormControl('', [
            requiredValidator("First name cannot be empty.")
        ]),
        lastName: new FormControl('', [
            requiredValidator("Last name cannot be empty.")
        ]),
        email: new FormControl('', [
            requiredValidator("Email cannot be empty."),
            emailValidator("Invalid email format.")
        ]),
        phoneNumber: new FormControl('', [
            requiredValidator("Phone number cannot be empty.")
        ]),
        password: new FormControl('', [
            requiredValidator("Password cannot be empty.")
        ]),
        zipCode: new FormControl(''),
        confirmPassword: new FormControl(''),
    });

    public verificationCodeInfo = new FormGroup({
        email: new FormControl(""),
        code: new FormControl('',
            requiredValidator('Verification code cannot be empty.')),
    });

    public forgotPasswordInfo = new FormGroup({
        email: new FormControl('',
            requiredValidator('Email cannot be empty.')),
        phoneNumber: new FormControl('',
            requiredValidator('Phone number cannot be empty.')),
    });

    public signin() {
        // const user: User = {
        //     email: "dummyEmail@email.com",
        //     firstName: "John",
        //     lastName: "Doe",
        //     phoneNumber: "+1134567892",
        //     type: 'patient'
        // }
        // this.userService.signIn(user);
        // this.router.navigate([`${APP_ROUTES.product.app}/${APP_ROUTES.product.dashboard}`], { replaceUrl: true })
    }

    gotoHomePage() {
        this.router.navigate(
            [`${APP_ROUTES.webpage._}/${APP_ROUTES.webpage._}`],
            { replaceUrl: true }
        );
    }

    navigateToPatientSignUp() {
        this.isPatientRoute = true;
        this.isSignUpPage = true;
        this.router.navigate([APP_ROUTES.product.app, APP_ROUTES.product.auth, APP_ROUTES.product.patient, APP_ROUTES.product.signUp]);
    }
}
