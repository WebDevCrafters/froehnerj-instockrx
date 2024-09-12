import { Component, OnInit } from '@angular/core';
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
import Payment from '../../../_shared/interfaces/Payment';
import { markAllAsDirty } from '../../../../_shared/utils/formUtils';
import { ToastrService } from 'ngx-toastr';

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
export class NewSearchComponent implements OnInit {
    public modalVisible: boolean = false;
    public packageDetail: Payment | null = null;
    public isPaid: boolean = false;
    public remaningSearches: number = 0;
    public search: Search | null = null;
    public isLoading: boolean = false;

    constructor(
        private searchService: SearchService,
        private paymentService: PaymentService,
        private router: Router,
        private toastrService: ToastrService
    ) { }

    async ngOnInit(): Promise<void> {
        this.isPaid = await this.checkUserPayment();
        this.checkSearchesRemaining();
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
                brandName: new FormControl(''),
            }),
        ]),
        miles: new FormControl(),
        pickupDate: new FormControl(new Date().getTime(), [
            Validators.required,
        ]),
    });

    async onAdditionalInfoSubmit() {
        if (this.search) {
            this.addNewSearch(this.search, this.isPaid);
        }
    }

    openModalPopup() {
        if (this.additionalInfoForm.valid) {
            this.search = this.convertFormToSearch(this.isPaid);
            this.modalVisible = !this.modalVisible;
        } else {
            this.additionalInfoForm.markAllAsTouched();
            markAllAsDirty(this.additionalInfoForm);
        }
    }

    private checkUserPayment(): Promise<boolean> {
        return new Promise((resolve) => {
            this.paymentService.getCurrentPayment().subscribe({
                next: (data) => {
                    if (data) {
                        this.packageDetail = data;
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
        this.isLoading = true;
        console.log("search request object: ", search);
        this.searchService.addSearch(search).subscribe({
            next: (search) => {
                console.log("Response after adding search: ",search);
                if (!isPaid) this.navigateToPayment();
                else this.navigateToActiveSearch();
                this.isLoading = false;
                this.toastrService.success('Your new search has been added successfully!');
            },
            error: (err) => {
                this.isLoading = false;
                this.toastrService.error(err.error.message);
            },
        });
    }

    public checkSearchesRemaining() {
        if (this.packageDetail) {
            this.remaningSearches = this.packageDetail?.subscription.searchCount - this.packageDetail?.searchesConsumed;
        }
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

    public convertDobToTimestamp(dobString: any): number {
        const [month, day, year] = dobString.split('/').map(Number);
        const date = new Date(year, month - 1, day);
        return date.getTime();
    }

    private convertFormToSearch(isPaid: boolean) {
        const formValues = this.additionalInfoForm.value;
        const dob = this.convertDobToTimestamp(formValues.dob);
        const search: Search = {
            prescriberName: formValues.prescriber || '',
            dob: dob,
            zipCode: formValues.zipCode || '',
            status: isPaid ? SearchStatus.InProgress : SearchStatus.NotStarted,
            miles: formValues.miles || 30,
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
                        brandName: formValues.prescribedMedication[0]?.brandName || '',
                        pickUpDate: Number(formValues.pickupDate),
                        alternatives: formValues.prescribedMedication
                            .slice(1)
                            .map((med: any) => ({
                                name: med.name || '',
                                dose: med.dose ?? undefined,
                                quantity: Number(med.quantity),
                                brandName: med.brandName || ''
                            })),
                    }
                    : undefined,
        };

        // console.log(search);

        return search;
    }
}
