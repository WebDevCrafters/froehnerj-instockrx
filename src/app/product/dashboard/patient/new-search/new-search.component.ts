import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PersonalInfoComponent } from './personal-info/personal-info.component';
import { SelectPackageComponent } from '../payment/select-package/select-package.component';
import { PaymentComponent } from '../payment/payment.component';
import { AdditionalInfoComponent } from './additional-info/additional-info.component';
import { ActivatedRoute } from '@angular/router';
import { defaultPackage } from '../../../../_shared/constants/data';
import { Package } from '../../../../_shared/dataTypes/Package';
import { markAllAsDirty } from '../../../../_shared/utils/formUtils';
import {
    requiredValidator,
    dateValidator,
    charLimitValidator,
} from '../../../../_shared/utils/Validators';
import Subscription from '../../../_shared/interfaces/Subscription';

@Component({
    selector: 'app-new-search',
    standalone: true,
    imports: [
        CommonModule,
        PersonalInfoComponent,
        AdditionalInfoComponent,
        SelectPackageComponent,
        PaymentComponent,
    ],
    templateUrl: './new-search.component.html',
    styleUrl: './new-search.component.scss',
})
export class NewSearchComponent implements OnInit {
    stepNumber: number = 1;
    selectedPackage: Subscription | null = null;

    constructor(private route: ActivatedRoute) {}

    ngOnInit(): void {
        this.route.queryParams.subscribe((params) => {
            const serializedValue = params['stepNumber'];
            if (serializedValue) {
                this.stepNumber = JSON.parse(serializedValue);
            }
        });
    }

    additionalInfoForm = new FormGroup({
        dob: new FormControl('', [
            requiredValidator("Patient's date of birth cannot be empty"),
            dateValidator('Please enter a valid date'),
        ]),
        zipCode: new FormControl('', [
            requiredValidator('Zip code must not be empty'),
            charLimitValidator(5, 'Zip code must be 5 digits'),
        ]),
        prescriber: new FormControl('', [
            requiredValidator("Prescriber's name cannot be empty"),
        ]),
        prescribedMedication: new FormArray([
            new FormGroup({
                name: new FormControl('', [
                    requiredValidator('Medication option 1 cannot be empty'),
                ]),
                dose: new FormControl(''),
                quantity: new FormControl(''),
                brand: new FormControl(''),
            }),
        ]),
        pickupDate: new FormControl(new Date().getTime(), [
            Validators.required,
        ]),
    });

    onAdditionalInfoSubmit() {
        if (this.additionalInfoForm.valid) {
            console.log(this.additionalInfoForm.value);
            this.stepNumber += 1;
            console.log('step was added');
        } else {
            this.additionalInfoForm.markAllAsTouched();
            markAllAsDirty(this.additionalInfoForm);
            console.log(this.additionalInfoForm);
        }
    }

    onSelectPackageSubmit(packageSelected: Subscription | null) {
        this.selectedPackage = packageSelected;
        this.stepNumber += 1;
        console.log('got', this.selectedPackage);
    }
}
