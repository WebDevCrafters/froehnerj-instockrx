import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonComponent } from '../../../../../_shared/components/button/button.component';
import { CheckboxComponent } from '../../../../../_shared/components/checkbox/checkbox.component';
import { InputComponent } from '../../../../../_shared/components/input/input.component';
import APP_ROUTES from '../../../../../_shared/constants/routes';

@Component({
    selector: 'app-personal-info',
    standalone: true,
    imports: [
        InputComponent,
        ButtonComponent,
        CommonModule,
        ReactiveFormsModule,
        CheckboxComponent,
    ],
    templateUrl: './personal-info.component.html',
    styleUrl: './personal-info.component.scss',
})
export class PersonalInfoComponent {
    @Output() onPersonalInfoSubmit: EventEmitter<void> = new EventEmitter<void>();
    @Input() personalInfoForm = new FormGroup({
        fullName: new FormControl(''),
        phoneNumber: new FormControl(''),
        email: new FormControl(''),
        terms: new FormControl(false),
    });

    constructor(private router: Router) { }

    onFormSubmit() {
        console.log(this.personalInfoForm.controls.terms.value, 'hrewe');
        this.onPersonalInfoSubmit.emit();
    }


    openPrivacy() {
        if(!window) return;
        const url = this.router.serializeUrl(
            this.router.createUrlTree([APP_ROUTES.webpage.privacy])
        );
        window.open(url, '_blank');
    }

    openTermsOfService() {
        if(!window) return;
        const url = this.router.serializeUrl(
            this.router.createUrlTree([APP_ROUTES.webpage.termsOfService])
        );
        window.open(url, '_blank');
    }
}
