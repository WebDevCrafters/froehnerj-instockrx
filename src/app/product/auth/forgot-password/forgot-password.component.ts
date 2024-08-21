import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../../_shared/components/button/button.component';
import { CustomSearchDropdownComponent } from '../../../_shared/components/custom-search-dropdown/custom-search-dropdown.component';
import { InputComponent } from '../../../_shared/components/input/input.component';
import APP_ROUTES from '../../../_shared/constants/routes';
import { User } from '../../../_shared/dataTypes/User';
import { markAllAsDirty } from '../../../_shared/utils/formUtils';
import { UserService } from '../../../_core/services/user.service';

@Component({
    selector: 'app-forgot-password',
    standalone: true,
    imports: [InputComponent, ButtonComponent, CustomSearchDropdownComponent, FormsModule, CommonModule],
    templateUrl: './forgot-password.component.html',
    styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent implements OnInit {
    public isVerificationScreenVisible: boolean = false;
    public isEmailLoginInOptionSelected: boolean = true;
    public isPatientRoute: boolean = false;
    public forgotPasswordInfo = new FormGroup({
        email: new FormControl(''),
        phoneNumber: new FormControl(''),
    });
    public countryCode: string = '';

    constructor(private userService: UserService, private router: Router,
        private route: ActivatedRoute) { }

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

    public markEmailOptionAsSelected() {
        this.isEmailLoginInOptionSelected = true;
    }

    public markPasswordOptionAsSelected() {
        this.isEmailLoginInOptionSelected = false;
    }

    public signin() {
        // const user: User = {
        //     email: "dummyEmail@email.com",
        //     firstName: "John",
        //     lastName: "Doe",
        //     phoneNumber: "+1134567892",
        //     type: "patient"
        // }
        // this.userService.signIn(user);
        // this.router.navigate([`${APP_ROUTES.product.app}/${APP_ROUTES.product.dashboard}`], { replaceUrl: true })
    }

    public onSucces() {
        this.forgotPasswordInfo.markAllAsTouched();
        markAllAsDirty(this.forgotPasswordInfo);
        if (this.forgotPasswordInfo.controls.email.valid === false && this.forgotPasswordInfo.controls.phoneNumber.valid === false) return;
    }
}