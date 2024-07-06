import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { InputComponent } from '../../_shared/components/input/input.component';
import { ButtonComponent } from '../../_shared/components/button/button.component';
import { CommonModule } from '@angular/common';
import { CustomSearchDropdownComponent } from './custom-search-dropdown/custom-search-dropdown.component';

@Component({
    selector: 'app-auth',
    standalone: true,
    imports: [InputComponent, ButtonComponent, CommonModule, CustomSearchDropdownComponent],
    templateUrl: './auth.component.html',
    styleUrl: './auth.component.scss'
})
export class AuthComponent {

    isSignUpScreenVisible: boolean = false;
    isSignInScreenVisible: boolean = true;
    isForgotPasswordScreenVisible: boolean = false;
    isEmailLoginInOptionSelected: boolean = false;

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
}
