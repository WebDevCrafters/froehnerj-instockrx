import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PersonalInfoComponent } from './personal-info/personal-info.component';
import { SelectPackageComponent } from '../payment/select-package/select-package.component';
import { PaymentComponent } from '../payment/payment.component';
import { AdditionalInfoComponent } from './additional-info/additional-info.component';
import { Router } from '@angular/router';
import {
    requiredValidator,
    dateValidator,
    charLimitValidator,
} from '../../../../_shared/utils/Validators';
import { ButtonComponent } from '../../../../_shared/components/button/button.component';
import { SearchService } from '../../../../_core/services/search.service';
import Search from '../../../_shared/interfaces/Search';
import { SearchStatus } from '../../../_shared/interfaces/SearchStatus';
import { PaymentService } from '../../../../_core/services/payment.service';
import APP_ROUTES from '../../../../_shared/constants/routes';
import { ModalComponent } from "../../../../_shared/components/modal/modal.component";

@Component({
    selector: 'app-new-search',
    standalone: true,
    imports: [
        CommonModule,
        PersonalInfoComponent,
        AdditionalInfoComponent,
        SelectPackageComponent,
        PaymentComponent,
        ButtonComponent,
        ModalComponent
    ],
    templateUrl: './new-search.component.html',
    styleUrl: './new-search.component.scss',
})
export class NewSearchComponent {
    public modalVisible: boolean = false;

    constructor(
        private searchService: SearchService,
        private paymentService: PaymentService,
        private router: Router
    ) { }

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

    async onAdditionalInfoSubmit() {
        this.modalVisible = true;

        // if (this.additionalInfoForm.valid) {
        //     const isPaid = await this.checkUserPayment();
        //     const search: Search = this.convertFormToSearch(isPaid);
        //     this.addNewSearch(search, isPaid);
        // } else {
        //     this.additionalInfoForm.markAllAsTouched();
        //     markAllAsDirty(this.additionalInfoForm);
        // }
    }

    public toggleModal() {
        this.modalVisible = !this.modalVisible;
    }

    private checkUserPayment(): Promise<boolean> {
        return new Promise((resolve) => {
            this.paymentService.getCurrentPayment().subscribe({
                next: (data) => {
                    if (data) {
                        resolve(true);
                    } else {
                        resolve(false);
                    }
                },
                error: (err) => {
                    console.log(err);
                },
            });
        });
    }

    private addNewSearch(search: Search, isPaid: boolean) {
        this.searchService.addSearch(search).subscribe({
            next: (search) => {
                console.log(search);
                if (!isPaid) this.navigateToPayment();
                else this.navigateToActiveSearch();
            },
            error: (err) => {
                console.log(err);
            },
        });
    }

    private navigateToPayment() {
        this.router.navigate([
            APP_ROUTES.product.app,
            APP_ROUTES.product.dashboard,
            APP_ROUTES.product.payments,
        ]);
    }
    private navigateToActiveSearch() {
        this.router.navigate([
            APP_ROUTES.product.app,
            APP_ROUTES.product.dashboard,
            APP_ROUTES.product.activeSearches,
        ]);
    }

    private convertFormToSearch(isPaid: boolean) {
        const formValues = this.additionalInfoForm.value;

        const search: Search = {
            prescriberName: formValues.prescriber || '',
            zipCode: Number(formValues.zipCode),
            status: isPaid ? SearchStatus.InProgress : SearchStatus.NotStarted,
            medication:
                formValues.prescribedMedication &&
                    formValues.prescribedMedication.length > 0
                    ? {
                        name: formValues.prescribedMedication[0]?.name || '',
                        dose:
                            formValues.prescribedMedication[0]?.dose ??
                            undefined,
                        quantity: Number(
                            formValues.prescribedMedication[0]?.quantity
                        ),
                        pickUpDate: Number(formValues.pickupDate),
                        alternatives: formValues.prescribedMedication
                            .slice(1)
                            .map((med: any) => ({
                                name: med.name || '',
                                dose: med.dose ?? undefined,
                                quantity: Number(med.quantity),
                            })),
                    }
                    : undefined,
        };

        return search;
    }
}
