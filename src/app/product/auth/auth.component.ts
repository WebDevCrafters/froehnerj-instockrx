import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { InputComponent } from '../../_shared/components/input/input.component';
import { ButtonComponent } from '../../_shared/components/button/button.component';
import { CommonModule } from '@angular/common';
import { CustomSearchDropdownComponent } from '../../_shared/components/custom-search-dropdown/custom-search-dropdown.component';
import { User } from '../_shared/interfaces/User';
import {
    ActivatedRoute,
    NavigationEnd,
    Router,
    RouterOutlet,
} from '@angular/router';
import APP_ROUTES from '../../_shared/constants/routes';
import { VerificationCodeComponent } from '../verification-code/verification-code.component';
import {
    emailValidator,
    requiredValidator,
} from '../../_shared/utils/Validators';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { UserService } from '../../_core/services/user.service';
import UserType from '../_shared/interfaces/UserType';
import { filter } from 'rxjs';

@Component({
    selector: 'app-auth',
    standalone: true,
    imports: [
        InputComponent,
        ButtonComponent,
        CommonModule,
        CustomSearchDropdownComponent,
        SigninComponent,
        SignupComponent,
        ForgotPasswordComponent,
        VerificationCodeComponent,
        RouterOutlet,
    ],
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
    isSignUpPage: boolean = true;
    userType: UserType | null = null;
    UserType = UserType;

    constructor(
        private userService: UserService,
        private router: Router,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit(): void {
        // Subscribe to router events to detect navigation changes
        this.router.events
            .pipe(filter((event) => event instanceof NavigationEnd))
            .subscribe(() => {
                this.checkIfSignInOrSignUp();
                this.userType = this.activatedRoute.children
                    .map((child) => child.snapshot.paramMap.get('userType'))
                    .find((value) => value !== null) as UserType;
            });

        // Initial check
        this.checkIfSignInOrSignUp();
        this.userType = this.activatedRoute.children
            .map((child) => child.snapshot.paramMap.get('userType'))
            .find((value) => value !== null) as UserType;
    }

    public signInInfoForm = new FormGroup({
        email: new FormControl('', [
            requiredValidator('Email field must not be blank.'),
            emailValidator('Invalid email format.'),
        ]),
        phoneNumber: new FormControl('', [
            requiredValidator('Phone Number field must not be blank.'),
        ]),
        password: new FormControl('', [
            requiredValidator('Password field must not be blank.'),
        ]),
    });

    public signUpInfoForm = new FormGroup({
        firstName: new FormControl('', [
            requiredValidator('First name cannot be empty.'),
        ]),
        lastName: new FormControl('', [
            requiredValidator('Last name cannot be empty.'),
        ]),
        email: new FormControl('', [
            requiredValidator('Email cannot be empty.'),
            emailValidator('Invalid email format.'),
        ]),
        phoneNumber: new FormControl('', [
            requiredValidator('Phone number cannot be empty.'),
        ]),
        password: new FormControl('', [
            requiredValidator('Password cannot be empty.'),
        ]),
        zipCode: new FormControl(''),
        confirmPassword: new FormControl(''),
    });

    public verificationCodeInfo = new FormGroup({
        email: new FormControl(''),
        code: new FormControl(
            '',
            requiredValidator('Verification code cannot be empty.')
        ),
    });

    public forgotPasswordInfo = new FormGroup({
        email: new FormControl('', requiredValidator('Email cannot be empty.')),
        phoneNumber: new FormControl(
            '',
            requiredValidator('Phone number cannot be empty.')
        ),
    });

    public signin() {}

    gotoHomePage() {
        this.router.navigate(
            [`${APP_ROUTES.webpage._}/${APP_ROUTES.webpage._}`],
            { replaceUrl: true }
        );
    }

    navigateToPatientSignUp() {
        this.isSignUpPage = true;
        this.userType = UserType.Patient;
        this.router.navigate([
            APP_ROUTES.product.app,
            APP_ROUTES.product.auth,
            APP_ROUTES.product.signUp,
            UserType.Patient,
        ]);
    }

    checkIfSignInOrSignUp() {
        const urlSegments = this.router.url.split('/');

        if (urlSegments.some((segment) => segment.includes('sign-in'))) {
            this.isSignUpPage = false;
        } else if (urlSegments.some((segment) => segment.includes('sign-up'))) {
            this.isSignUpPage = true;
        }
    }
}
