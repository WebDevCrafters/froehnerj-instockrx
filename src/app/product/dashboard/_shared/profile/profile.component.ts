import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormsModule } from '@angular/forms';
import { ButtonComponent } from '../../../../_shared/components/button/button.component';
import { DatePickerComponent } from '../../../../_shared/components/date-picker/date-picker.component';
import { InputComponent } from '../../../../_shared/components/input/input.component';
import { ModalComponent } from '../../../../_shared/components/modal/modal.component';
import { UserService } from '../../../../_core/services/user.service';
import APP_ROUTES from '../../../../_shared/constants/routes';
import { markAllAsDirty } from '../../../../_shared/utils/formUtils';
import { requiredValidator, emailValidator, charLimitValidator, dateValidator } from '../../../../_shared/utils/Validators';
import { User } from '../../../_shared/interfaces/User';
import { Router } from '@angular/router';
import { KEYS } from '../../../../_shared/constants/localStorageKeys';
import UserType from '../../../_shared/interfaces/UserType';

@Component({
    selector: 'app-profile',
    standalone: true,
    imports: [DatePickerComponent,
        InputComponent,
        ModalComponent,
        ButtonComponent,
        CommonModule,
        FormsModule,],
    templateUrl: './profile.component.html',
    styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
    isProfileEditable: boolean = false;
    profileBackup: any = null;
    user: User | null = null;
    userType: UserType | null = null

    @ViewChild('myProfileEleRef') myProfileEleRef: ElementRef | null = null;

    profileForm = new FormGroup({
        name: new FormControl('', [
            requiredValidator("Patient's Name cannot be empty"),
        ]),
        email: new FormControl('', [
            requiredValidator("Patient's email cannot be empty"),
            emailValidator('Please enter a valid email'),
        ]),
        phoneNumber: new FormControl('', [
            requiredValidator("Patient's phone number cannot be empty"),
            charLimitValidator(
                10 + 4, // Including '()' and '-'
                "Patient's phone must be 10 digits. (Only US phone numbers are supported at this time.)"
            ),
        ]),
        // dob: new FormControl('', [
        //     requiredValidator("Patient's date of birth cannot be empty"),
        //     dateValidator('Please enter a valid date'),
        // ]),
        zipCode: new FormControl('', [
            requiredValidator('Zip code must not be empty'),
            charLimitValidator(5, 'Zip code must be 5 digits'),
        ]),
        // doctorName: new FormControl('', []),
        // doctorEmail: new FormControl('', []),
    });

    backups: any[] = [];

    constructor(private router: Router, private userService: UserService) { }

    ngOnInit(): void {
        this.getUser();
    }

    getUser() {
        const authResponse = this.userService.getUserData();
        if (!authResponse) return;
        this.userType = authResponse.user.userType || null;
        this.user = authResponse.user;
        this.profileForm.setValue({
            name: this.user.name || '',
            email: this.user.email || '',
            phoneNumber: this.user.phoneNumber || '',
            zipCode: this.user.zipCode?.toString() || '',
        });
        console.log("this.profileForm", this.profileForm.value);
        // this.profileBackup = this.profileForm.value;
    }

    toggleEditProfile(event: Event) {
        event.stopPropagation();
        this.isProfileEditable = !this.isProfileEditable;
        if (this.isProfileEditable) {
            this.profileBackup = this.profileForm.value;
        }
    }

    saveEditProfile() {
        this.profileForm.markAllAsTouched();
        markAllAsDirty(this.profileForm);
        if (!this.profileForm.valid) return;
        this.user = this.convertFormToUser();
        this.updateProfile(this.user);
        this.isProfileEditable = false;
        this.profileBackup = null;
    }

    public updateProfile(user: User) {
        this.userService.updateProfile(user).subscribe({
            next: (result) => {
                this.user = result;
                this.userService.setUserData(this.user);
            },
            error: (err) => {
                console.log(err);
            },
        })
    }

    cancelEditProfile() {
        if (this.profileBackup) {
            this.profileForm.setValue(this.profileBackup);
        }
        this.isProfileEditable = false;
        this.profileBackup = null;
    }

    @HostListener('document:click', ['$event'])
    onDocumentClick(event: MouseEvent): void {
        const clickedInsideProfile =
            this.myProfileEleRef?.nativeElement.contains(event.target);
        if (!clickedInsideProfile) {
            this.cancelEditProfile();
        }
    }

    requestAccountDeletion() {
        const url = 'https://u4acjiu8lv3.typeform.com/to/WDj0hN0I';
        window.open(url, '_blank');
    }

    signout() {
        this.userService.signOut();
        this.router.navigate(
            [`${APP_ROUTES.product.app}/${APP_ROUTES.product.auth}`],
            { replaceUrl: true }
        );
    }

    resetPassword() {
        this.userService.signOut();
        this.router.navigate(
            [`${APP_ROUTES.product.app}/${APP_ROUTES.product.resetPassword}`],
            { replaceUrl: true }
        );
    }

    private convertFormToUser() {
        const formValues = this.profileForm.value;
        const user: User = {
            email: formValues.email || '',
            zipCode: Number(formValues.zipCode) || 0,
            name: formValues.name || '',
            phoneNumber: formValues.phoneNumber || '',
        };

        console.log(user);

        return user;
    }
}
