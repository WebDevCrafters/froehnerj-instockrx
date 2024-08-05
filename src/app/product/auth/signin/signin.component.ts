import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../_core/services/auth.service';
import { ButtonComponent } from '../../../_shared/components/button/button.component';
import { InputComponent } from '../../../_shared/components/input/input.component';
import APP_ROUTES from '../../../_shared/constants/routes';
import { User } from '../../../_shared/dataTypes/User';
import { markAllAsDirty } from '../../../_shared/utils/formUtils';
import { CustomSearchDropdownComponent } from '../custom-search-dropdown/custom-search-dropdown.component';

@Component({
    selector: 'app-signin',
    standalone: true,
    imports: [InputComponent, ButtonComponent, CustomSearchDropdownComponent, CommonModule],
    templateUrl: './signin.component.html',
    styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
    @Input() public isForgotPasswordScreenVisible: boolean = false;
    @Input() public isEmailLoginInOptionSelected: boolean = true;
    @Input() public isVerificationScreenVisible: boolean = false;
    @Input() public patientSignUp: boolean = false;

    public signInInfoForm = new FormGroup({
        email: new FormControl(''),
        phoneNumber: new FormControl(''),
        password: new FormControl(''),
    });
    public countryCode: string = '';
    public isPatientRoute: boolean = false;

    constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute) { }

    ngOnInit() {
        this.route.parent?.url.subscribe(url => {
            this.isPatientRoute = url.length > 0 && url[0].path === APP_ROUTES.product.patient;
        });
    }

    public setCountryCode(countryCode: string) {
        this.countryCode = countryCode;
    }

    public openSignUpScreen() {
        const targetRoute = this.isPatientRoute ? APP_ROUTES.product.patient : APP_ROUTES.product.clinician;
        this.router.navigate([APP_ROUTES.product.app, APP_ROUTES.product.auth, targetRoute, APP_ROUTES.product.signUp]);
    }

    public openForgotPasswordScreen() {
        // Implementation for opening forgot password screen
    }

    public markEmailOptionAsSelected() {
        this.isEmailLoginInOptionSelected = true;
    }

    public markPasswordOptionAsSelected() {
        this.isEmailLoginInOptionSelected = false;
    }

    public signin() {
        const user: User = {
            email: this.signInInfoForm.controls.email.value || '',
            firstName: 'John', // Placeholder value; should be fetched from server
            lastName: 'Doe',
            phoneNumber: this.signInInfoForm.controls.phoneNumber.value || '',
            type: this.isPatientRoute ? 'patient' : 'clinician'
        };
        this.authService.signIn(user);
        this.router.navigate([`${APP_ROUTES.product._}/${APP_ROUTES.product.dashboard}`], { replaceUrl: true });
    }

    public onSuccess() {
        this.signInInfoForm.markAllAsTouched();
        markAllAsDirty(this.signInInfoForm);

        if (this.signInInfoForm.controls.email.valid || this.signInInfoForm.controls.phoneNumber.valid) {
            this.signin();
        }
    }
}
