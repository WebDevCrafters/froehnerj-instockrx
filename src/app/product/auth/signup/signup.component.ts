import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonComponent } from '../../../_shared/components/button/button.component';
import { InputComponent } from '../../../_shared/components/input/input.component';
import APP_ROUTES from '../../../_shared/constants/routes';
import { User } from '../../_shared/interfaces/User';
import { markAllAsDirty } from '../../../_shared/utils/formUtils';
import { CustomSearchDropdownComponent } from '../../../_shared/components/custom-search-dropdown/custom-search-dropdown.component';
import { UserService } from '../../../_core/services/user.service';
import UserType from '../../_shared/interfaces/UserType';
import { DataService } from '../../../_core/services/data.service';
import { ToastrService } from 'ngx-toastr';
import { charLimitValidator, emailValidator, matchPasswordValidator, passwordValidator, requiredValidator } from '../../../_shared/utils/Validators';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
    selector: 'app-signup',
    standalone: true,
    imports: [
        InputComponent,
        ButtonComponent,
        CustomSearchDropdownComponent,
        FormsModule,
        CommonModule,
    ],
    templateUrl: './signup.component.html',
    styleUrl: './signup.component.scss',
})
export class SignupComponent implements OnInit {
    userType: UserType | null = null;
    isLoading: boolean = false;

    public signUpInfoForm = new FormGroup(
        {
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
                passwordValidator(
                    'Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, a number, and a special character'
                ),
            ]),
            zipCode: new FormControl('', [
                requiredValidator('Zip code must not be empty'),
                charLimitValidator(5, 'Zip code must be 5 digits'),
            ]),
            confirmPassword: new FormControl('', [
                requiredValidator('Confirm password cannot be empty.'),
            ]),
        },
        { validators: matchPasswordValidator('password', 'confirmPassword') }
    );


    /**
        @todo: add validators in these fields 
        @todo: Validate zipcode
        @todo: Conpare pass and cpass
     */

    public countryCode: string = '';

    constructor(
        private userService: UserService,
        private router: Router,
        private route: ActivatedRoute,
        private dataService: DataService,
        private toastrService: ToastrService
    ) { }

    ngOnInit() {
        this.route.paramMap.subscribe((params) => {
            this.userType = params.get('userType') as UserType;
            console.log(this.userType);
        });
    }

    public setCountryCode(countryCode: string) {
        this.countryCode = countryCode;
    }

    public openSignInScreen() {
        this.router.navigate([
            APP_ROUTES.product.app,
            APP_ROUTES.product.auth,
            APP_ROUTES.product.signIn,
        ]);
    }

    private async signup() {
        if (!this.userType) {
            this.isLoading = false;
            return;
        }

        const user: User = {
            email: this.signUpInfoForm.get('email')?.value || '',
            name: `${this.signUpInfoForm.get('firstName')?.value || ''} ${this.signUpInfoForm.get('lastName')?.value || ''
                }`,
            phoneNumber: this.signUpInfoForm.get('phoneNumber')?.value || '',
            userType: this.userType,
            zipCode: this.signUpInfoForm.get('zipCode')?.value || '',
            password: this.signUpInfoForm.get('password')?.value || '',
        };
        this.userService.signUp(user).subscribe({
            next: (user) => {
                this.dataService.currentUserType = this.userType;
                this.isLoading = false;
                this.router.navigate(
                    [
                        `${APP_ROUTES.product.app}/${APP_ROUTES.product.dashboard}/${APP_ROUTES.product.newSearch}`,
                    ],
                    { replaceUrl: true }
                );
            },
            error: (err: HttpErrorResponse) => {
                console.log(err);
                this.isLoading = false;
                this.toastrService.error(err.error.message);
            },
        });
    }

    public onSuccess() {
        this.isLoading = true;
        this.signUpInfoForm.markAllAsTouched();
        markAllAsDirty(this.signUpInfoForm);
        if (!this.signUpInfoForm.valid) {
            this.isLoading = false;
            return;
        }

        this.signup();
    }

    public navigateToPrivacyPolicy() {
        if(!window) return;
        const url = this.router.serializeUrl(
            this.router.createUrlTree([`${APP_ROUTES.webpage.privacy}`])
        );
        window.open(url, '_blank');
    }

    public navigateToTermsOfService() {
        if(!window) return;
        const url = this.router.serializeUrl(
            this.router.createUrlTree([`${APP_ROUTES.webpage.termsOfService}`])
        );
        window.open(url, '_blank');
    }
}
