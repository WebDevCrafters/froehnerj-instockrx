import { Component, Input, OnInit } from '@angular/core';
import {
    FormControl,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../../_shared/components/button/button.component';
import { InputComponent } from '../../../_shared/components/input/input.component';
import APP_ROUTES from '../../../_shared/constants/routes';
import { User } from '../../_shared/interfaces/User';
import { markAllAsDirty } from '../../../_shared/utils/formUtils';
import { CustomSearchDropdownComponent } from '../../../_shared/components/custom-search-dropdown/custom-search-dropdown.component';
import { UserService } from '../../../_core/services/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import UserType from '../../_shared/interfaces/UserType';
import { DataService } from '../../../_core/services/data.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-signin',
    standalone: true,
    imports: [
        InputComponent,
        ButtonComponent,
        CustomSearchDropdownComponent,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
    ],
    templateUrl: './signin.component.html',
    styleUrls: ['./signin.component.scss'],
})
export class SigninComponent {
    @Input() public isEmailLoginInOptionSelected: boolean = true;
    public error: string = '';
    public isLoading: boolean = false;

    public signInInfoForm = new FormGroup({
        email: new FormControl(''),
        phoneNumber: new FormControl(''),
        password: new FormControl(''),
    });
    public countryCode: string = '';

    constructor(
        private userService: UserService,
        private router: Router,
        private route: ActivatedRoute,
        private dataService: DataService,
        private toastrService: ToastrService
    ) {}

    public setCountryCode(countryCode: string) {
        this.countryCode = countryCode;
    }

    public openClinicianSignUpScreen() {
        this.router.navigate([
            APP_ROUTES.product.app,
            APP_ROUTES.product.auth,
            APP_ROUTES.product.signUp,
            UserType.Clinician,
        ]);
    }

    public openForgotPasswordScreen() {
        this.router.navigate([
            APP_ROUTES.product.app,
            APP_ROUTES.product.auth,
            APP_ROUTES.product.resetPassword,
        ]);
    }

    public markEmailOptionAsSelected() {
        this.isEmailLoginInOptionSelected = true;
    }

    public markPasswordOptionAsSelected() {
        this.isEmailLoginInOptionSelected = false;
    }

    public async signin() {
        this.isLoading = true;
        const user: User = {
            email: this.signInInfoForm.controls.email.value || '',
            phoneNumber: this.signInInfoForm.controls.phoneNumber.value || '',
            password: this.signInInfoForm.controls.password.value || '',
        };
        this.userService.signIn(user).subscribe({
            next: (res) => {
                if (res.user.userType) {
                    this.dataService.currentUserType = res.user.userType;
                }
                this.isLoading = false;
                this.router.navigate(
                    [
                        `${APP_ROUTES.product.app}/${APP_ROUTES.product.dashboard}/${APP_ROUTES.product.newSearch}`,
                    ],
                    { replaceUrl: true }
                );
            },
            error: (err: HttpErrorResponse) => {
                this.isLoading = false;
                this.error = err.error.message;
                this.toastrService.error('Failed to signin');
            },
        });
    }

    public onSuccess() {
        this.signInInfoForm.markAllAsTouched();
        markAllAsDirty(this.signInInfoForm);

        if (
            this.signInInfoForm.controls.email.valid ||
            this.signInInfoForm.controls.phoneNumber.valid
        ) {
            this.signin();
        }
    }
}
