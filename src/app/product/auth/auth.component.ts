import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { InputComponent } from '../../_shared/components/input/input.component';
import { ButtonComponent } from '../../_shared/components/button/button.component';
import { CommonModule } from '@angular/common';
import { CustomSearchDropdownComponent } from './custom-search-dropdown/custom-search-dropdown.component';
import { AuthService } from '../../_core/services/auth.service';
import { User } from '../../_shared/dataTypes/User';
import { Route, Router } from '@angular/router';
import APP_ROUTES from '../../_shared/constants/routes';

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
    isEmailLoginInOptionSelected: boolean = true;

    constructor(private authService: AuthService, private router: Router){

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

    public signin(){
        const user: User = {
            email:"dummyEmail@email.com",
            firstName:"John",
            lastName:"Doe",
            phoneNumber:"+1134567892"
        }
        this.authService.signIn(user);
        this.router.navigate([`${APP_ROUTES.product.app}/${APP_ROUTES.product.dashboard}`], {replaceUrl:true})
    }
}
