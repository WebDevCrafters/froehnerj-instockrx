import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../_core/services/auth.service';
import { ButtonComponent } from '../../../_shared/components/button/button.component';
import { InputComponent } from '../../../_shared/components/input/input.component';
import APP_ROUTES from '../../../_shared/constants/routes';
import { User } from '../../../_shared/dataTypes/User';
import { markAllAsDirty } from '../../../_shared/utils/formUtils';
import { CustomSearchDropdownComponent } from '../../../_shared/components/custom-search-dropdown/custom-search-dropdown.component';

@Component({
    selector: 'app-signup',
    standalone: true,
    imports: [
        InputComponent,
        ButtonComponent,
        CustomSearchDropdownComponent,
        FormsModule,
        CommonModule
    ],
    templateUrl: './signup.component.html',
    styleUrl: './signup.component.scss',
})
export class SignupComponent implements OnInit {
    public signUpInfoForm = new FormGroup({
        firstName: new FormControl(''),
        lastName: new FormControl(''),
        email: new FormControl(''),
        phoneNumber: new FormControl(''),
        zipCode: new FormControl(''),
        password: new FormControl(''),
        confirmPassword: new FormControl(''),
    });

    /**
        @todo: add validators in these fields 
        @todo: Validate zipcode
        @todo: Conpare pass and cpass
     */

    public countryCode: string = '';
    public isPatientRoute: boolean = false;

    constructor(
        private authService: AuthService,
        private router: Router,
        private route: ActivatedRoute
    ) {

    }

    ngOnInit() {
        this.route.parent?.url.subscribe(url => {
            if (url.length > 0) {
                this.isPatientRoute = url[0].path === APP_ROUTES.product.patient;
            }
        });
    }

    public setCountryCode(countryCode: string) {
        this.countryCode = countryCode;
    }

    public openSignInScreen() {
        const targetRoute = this.isPatientRoute
            ? APP_ROUTES.product.patient
            : APP_ROUTES.product.clinician;
        this.router.navigate([
            APP_ROUTES.product.app,
            APP_ROUTES.product.auth,
            targetRoute,
            APP_ROUTES.product.signIn
        ]);
    }

    private signup() {
        const user: User = {
            email: this.signUpInfoForm.get('email')?.value || "",
            firstName: this.signUpInfoForm.get('firstName')?.value || "",
            lastName: this.signUpInfoForm.get('lastName')?.value || "",
            phoneNumber: this.signUpInfoForm.get('phoneNumber')?.value || "",
            type: this.isPatientRoute ? "patient" : "clinician"
        };
        console.log(this.signUpInfoForm)
        // this.authService.signUp(user);
        // this.router.navigate(
        //     [`${APP_ROUTES.product.app}/${APP_ROUTES.product.newSearch}`],
        //     {
        //         replaceUrl: true,
        //         queryParams: { stepNumber: JSON.stringify(2) }
        //     },
        // );
    }

    public onSuccess() {
        this.signUpInfoForm.markAllAsTouched();
        markAllAsDirty(this.signUpInfoForm);
        if (!this.signUpInfoForm.valid) return;

        if (this.isPatientRoute) {
            this.signup();
        }
    }

    public navigateToPrivacyPolicy() {
        const url = this.router.serializeUrl(this.router.createUrlTree([`${APP_ROUTES.webpage.privacy}`]));
        window.open(url, '_blank');
    }

    public navigateToTermsOfService() {
        const url = this.router.serializeUrl(this.router.createUrlTree([`${APP_ROUTES.webpage.termsOfService}`]));
        window.open(url, '_blank');
    }
}
