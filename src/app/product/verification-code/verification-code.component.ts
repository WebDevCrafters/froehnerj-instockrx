import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule } from '@angular/forms';
import { InputComponent } from '../../_shared/components/input/input.component';
import { ButtonComponent } from '../../_shared/components/button/button.component';
import { AuthService } from '../../_core/services/auth.service';
import { Router } from '@angular/router';
import APP_ROUTES from '../../_shared/constants/routes';
import { User } from '../../_shared/dataTypes/User';
import { CustomSearchDropdownComponent } from '../auth/custom-search-dropdown/custom-search-dropdown.component';
import { CommonModule } from '@angular/common';
import { emailValidator } from '../../_shared/utils/Validators';

@Component({
    selector: 'app-verification-code',
    standalone: true,
    imports: [InputComponent, ButtonComponent, CustomSearchDropdownComponent, FormsModule, CommonModule],
    templateUrl: './verification-code.component.html',
    styleUrl: './verification-code.component.scss'
})
export class VerificationCodeComponent implements OnInit {
    @Input() public isSignUpScreenVisible: boolean = false;
    @Input() public isSignInScreenVisible: boolean = true;
    @Input() public isForgotPasswordScreenVisible: boolean = false;
    @Input() public isEmailLoginInOptionSelected: boolean = true;
    @Input() public isVerificationScreenVisible: boolean = true;
    @Input() public patientSignUp: boolean = false;
    @Input() public userEmail = new FormControl('');
    @Input() public verificationCodeInfo = new FormGroup({
        email: new FormControl(this.userEmail,
            emailValidator('Username/client id combination not found')),
        phoneNumber: new FormControl('',
            emailValidator('Username/client id combination not found')),
    });
    @Output() public stateChange = new EventEmitter<{ isSignUpScreenVisible: boolean, isSignInScreenVisible: boolean, isForgotPasswordScreenVisible: boolean, isEmailLoginInOptionSelected: boolean, isVerificationScreenVisible: boolean, patientSignUp: boolean }>();

    constructor(private authService: AuthService, private router: Router) {
    }
    ngOnInit(): void {
        this.verificationCodeInfo.controls.email.setValue(this.userEmail.value);
    }

    public openSignInScreen() {
        this.isSignInScreenVisible = true;
        this.isSignUpScreenVisible = false;
        this.isForgotPasswordScreenVisible = false;
        this.isVerificationScreenVisible = false;
        this.patientSignUp = this.patientSignUp;
        this.emitStateChange();
    }

    public signin() {
        const user: User = {
            email: "dummyEmail@email.com",
            firstName: "John",
            lastName: "Doe",
            phoneNumber: "+1134567892",
            type: "patient"
        }
        this.authService.signIn(user);
        this.router.navigate([`${APP_ROUTES.product.app}/${APP_ROUTES.product.dashboard}`], { replaceUrl: true })
    }

    private emitStateChange() {
        this.stateChange.emit({
            isSignUpScreenVisible: this.isSignUpScreenVisible,
            isSignInScreenVisible: this.isSignInScreenVisible,
            isForgotPasswordScreenVisible: this.isForgotPasswordScreenVisible,
            isEmailLoginInOptionSelected: this.isEmailLoginInOptionSelected,
            isVerificationScreenVisible: this.isVerificationScreenVisible,
            patientSignUp: this.patientSignUp
        });
    }

    public onSucces() { }
}