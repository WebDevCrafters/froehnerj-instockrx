import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { InputComponent } from '../../_shared/components/input/input.component';
import { ButtonComponent } from '../../_shared/components/button/button.component';
import { CommonModule } from '@angular/common';
import { CustomSearchDropdownComponent } from './custom-search-dropdown/custom-search-dropdown.component';
import { AuthService } from '../../_core/services/auth.service';
import { User } from '../../_shared/dataTypes/User';
import { Router } from '@angular/router';
import APP_ROUTES from '../../_shared/constants/routes';
import { SigninComponent } from '../signin/signin.component';
import { SignupComponent } from '../signup/signup.component';
import { ForgotPasswordComponent } from '../forgot-password/forgot-password.component';

@Component({
    selector: 'app-auth',
    standalone: true,
    imports: [InputComponent, ButtonComponent, CommonModule, CustomSearchDropdownComponent, SigninComponent, SignupComponent, ForgotPasswordComponent],
    templateUrl: './auth.component.html',
    styleUrl: './auth.component.scss'
})
export class AuthComponent implements OnInit {
    public isSignUpScreenVisible: boolean = false;
    public isSignInScreenVisible: boolean = true;
    public isForgotPasswordScreenVisible: boolean = false;
    public isEmailLoginInOptionSelected: boolean = true;
    public patientSignUp: boolean = false;

    constructor(private authService: AuthService, private router: Router) { }

    ngOnInit(): void {
        // console.log("Implement router input here");
    }

    public personalInfoForm = new FormGroup({
        firstName: new FormControl(''),
        lastName: new FormControl(''),
        email: new FormControl(''),
        phoneNumber: new FormControl(''),
        password: new FormControl(''),
    });

    public openSignInScreen() {
        this.isSignInScreenVisible = true;
        this.isSignUpScreenVisible = false;
        this.isForgotPasswordScreenVisible = false;
    }

    public openSignUpScreen() {
        this.isSignInScreenVisible = false;
        this.isSignUpScreenVisible = true;
        this.isForgotPasswordScreenVisible = false;
    }

    public openForgotPasswordScreen() {
        this.isSignInScreenVisible = false;
        this.isSignUpScreenVisible = false;
        this.isForgotPasswordScreenVisible = true;
    }

    public markEmailOptionAsSelected() {
        this.isEmailLoginInOptionSelected = true;
    }

    public markPasswordOptionAsSelected() {
        this.isEmailLoginInOptionSelected = false;
    }

    public updateStates(state: { isSignUpScreenVisible: boolean, isSignInScreenVisible: boolean, isForgotPasswordScreenVisible: boolean, isEmailLoginInOptionSelected: boolean }) {
        this.isSignUpScreenVisible = state.isSignUpScreenVisible;
        this.isSignInScreenVisible = state.isSignInScreenVisible;
        this.isForgotPasswordScreenVisible = state.isForgotPasswordScreenVisible;
        this.isEmailLoginInOptionSelected = state.isEmailLoginInOptionSelected;
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
