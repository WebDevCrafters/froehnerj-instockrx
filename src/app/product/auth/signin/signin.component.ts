import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../../_shared/components/button/button.component';
import { InputComponent } from '../../../_shared/components/input/input.component';
import APP_ROUTES from '../../../_shared/constants/routes';
import { User } from '../../_shared/interfaces/User';
import { markAllAsDirty } from '../../../_shared/utils/formUtils';
import { CustomSearchDropdownComponent } from '../../../_shared/components/custom-search-dropdown/custom-search-dropdown.component';
import { UserService } from '../../../_core/services/user.service';

@Component({
    selector: 'app-signin',
    standalone: true,
    imports: [InputComponent, ButtonComponent, CustomSearchDropdownComponent, CommonModule, FormsModule, ReactiveFormsModule],
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

    constructor(private userService: UserService, private router: Router, private route: ActivatedRoute) { }

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
        const targetRoute = this.isPatientRoute ? APP_ROUTES.product.patient : APP_ROUTES.product.clinician;
        this.router.navigate([APP_ROUTES.product.app, APP_ROUTES.product.auth, targetRoute, APP_ROUTES.product.forgotPassword]);
    }

    public markEmailOptionAsSelected() {
        this.isEmailLoginInOptionSelected = true;
    }

    public markPasswordOptionAsSelected() {
        this.isEmailLoginInOptionSelected = false;
    }

    public async  signin() {
        const user: User = {
            email: this.signInInfoForm.controls.email.value || '',
            phoneNumber: this.signInInfoForm.controls.phoneNumber.value || '',
            password: this.signInInfoForm.controls.password.value || ''
        };
        await this.userService.signIn(user);
        // this.router.navigate([`${APP_ROUTES.product._}/${APP_ROUTES.product.dashboard}`], { replaceUrl: true });
    }

    public onSuccess() {
        this.signInInfoForm.markAllAsTouched();
        markAllAsDirty(this.signInInfoForm);

        if (this.signInInfoForm.controls.email.valid || this.signInInfoForm.controls.phoneNumber.valid) {
            this.signin();
        }
    }
}
