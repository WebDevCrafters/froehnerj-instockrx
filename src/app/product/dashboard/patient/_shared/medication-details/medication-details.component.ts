import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../../../_core/services/data.service';
import Search from '../../../../_shared/interfaces/Search';
import { ActivatedRoute } from '@angular/router';
import { AvailabilityService } from '../../../../../_core/services/availability.service';
import Availability from '../../../../_shared/interfaces/Availability';
import { LoaderComponent } from "../../../../../_shared/components/loader/loader.component";
import { EmptyStateComponent } from "../../../../../_shared/components/empty-state/empty-state.component";
import { ButtonComponent } from "../../../../../_shared/components/button/button.component";
import { SearchStatus } from '../../../../_shared/interfaces/SearchStatus';
import { InputComponent } from "../../../../../_shared/components/input/input.component";
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { charLimitValidator, dateValidator, requiredValidator } from '../../../../../_shared/utils/Validators';
import { ModalComponent } from "../../../../../_shared/components/modal/modal.component";
import { AdditionalInfoComponent } from "../../new-search/additional-info/additional-info.component";
import { markAllAsDirty } from '../../../../../_shared/utils/formUtils';
import { PaymentService } from '../../../../../_core/services/payment.service';
import { CommonModule } from '@angular/common';
import UserType from '../../../../_shared/interfaces/UserType';
import { UserService } from '../../../../../_core/services/user.service';
import { User } from '../../../../_shared/interfaces/User';

@Component({
    selector: 'app-medication-details',
    standalone: true,
    imports: [CommonModule, LoaderComponent, EmptyStateComponent, ButtonComponent, InputComponent, ModalComponent, AdditionalInfoComponent],
    templateUrl: './medication-details.component.html',
    styleUrl: './medication-details.component.scss',
})
export class MedicationDetailsComponent implements OnInit {
    /**
     @todo Add tooltip, add ellipses, handle mutiple alternative medications
    **/
    search: Search | null = null;
    searchId: string | null = null;
    availability: Availability[] = [];
    searchStatus = SearchStatus;
    public isModalVisible: boolean = false;
    public additionalInfoForm: any;
    public userType: UserType | null = null;
    public userInfo: User | null = null;
    readonly UserType = UserType;
    public isMedicationMarkedAsAvailable: boolean = false;

    constructor(
        private dataService: DataService,
        private userService: UserService,
        private route: ActivatedRoute,
        private availabilityService: AvailabilityService,
        private paymentService: PaymentService,
    ) { }

    async ngOnInit(): Promise<void> {
        this.route.paramMap.subscribe((params) => {
            this.searchId = params.get("searchId");
            this.getSearchDetails();
            this.generateForm();
        });
        this.getAvailability();
        this.setUserType();
        this.getSearchUserInfo(this.search?.patient);
    }

    private setUserType() {
        let userInfo = this.userService.getUserData();
        if (userInfo?.user?.userType) {
            this.userType = userInfo.user.userType;
        }
    }

    public getSearchUserInfo(userId?: string) {
        if (!(userId && this.userType === UserType.Clinician)) return;
        this.userService.getUser(userId).subscribe({
            next: (res) => {
                this.userInfo = res;
            },
            error: (err) => {
                console.log(err);
            },
        });
    }

    markMedicationAsAvailable() {
        if (!this.searchId) return;
        let availability: Availability = {
            search: this.searchId,
        }
        this.availabilityService.add(availability).subscribe({
            next: (res) => {
                if (res) {
                    this.isMedicationMarkedAsAvailable = true;
                }
            },
            error: (err) => {
                console.log(err);
            },
        })
    }

    generateForm() {
        if (this.search) {
            let DOBstring = '';
            let PickUpDateString = '';
            if (this.search?.dob) {
                DOBstring = this.converTimestampToDOBString(this.search?.dob);
            }
            if (this.search.medication?.pickUpDate) {
                PickUpDateString = this.converTimestampToDOBString(this.search.medication?.pickUpDate);
            }

            this.additionalInfoForm = new FormGroup({
                dob: new FormControl(DOBstring, [
                    requiredValidator("Patient's date of birth cannot be empty"),
                    dateValidator('Please enter a valid date'),
                ]),
                zipCode: new FormControl(JSON.stringify(this.search?.zipCode), [
                    requiredValidator('Zip code must not be empty'),
                    charLimitValidator(5, 'Zip code must be 5 digits'),
                ]),
                prescriber: new FormControl(this.search?.prescriberName, [
                    requiredValidator("Prescriber's name cannot be empty"),
                ]),
                prescribedMedication: new FormArray([
                    new FormGroup({
                        name: new FormControl(this.search?.medication?.name, [
                            requiredValidator('Medication option 1 cannot be empty'),
                        ]),
                        dose: new FormControl(this.search?.medication?.dose),
                        quantity: new FormControl(this.search?.medication?.quantity),
                        brandName: new FormControl(this.search?.medication?.brandName),
                    }),
                ]),
                pickupDate: new FormControl(PickUpDateString, [
                    Validators.required,
                ]),
            });
        }
    }

    converTimestampToDOBString(dob: any) {
        const date = new Date(dob);
        return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;

    }

    async onAdditionalInfoSubmit() {
        if (this.search) {
            this.search = this.convertFormToSearch();
            // Add update function call here
            // this.addNewSearch(this.search, this.isPaid);
        }
    }

    openModalPopup() {
        this.isModalVisible = !this.isModalVisible
        if (this.additionalInfoForm.valid) {
            this.search = this.convertFormToSearch();
            console.log(this.search);
            // this.isModalVisible = !this.isModalVisible
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

    public convertDobToTimestamp(dobString: any): number {
        const [month, day, year] = dobString.split('/').map(Number);
        const date = new Date(year, month - 1, day);
        return date.getTime();
    }

    private convertFormToSearch() {
        const formValues = this.additionalInfoForm.value;
        const dob = this.convertDobToTimestamp(formValues.dob);
        const pickUpDate = this.convertDobToTimestamp(formValues.pickupDate);

        const search: Search = {
            prescriberName: formValues.prescriber || '',
            dob: dob,
            zipCode: Number(formValues.zipCode),
            status: this.search?.status,
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
                        pickUpDate: pickUpDate,
                        brandName: formValues.prescribedMedication[0]?.brandName || '',
                        alternatives: formValues.prescribedMedication
                            .slice(1)
                            .map((med: any) => ({
                                name: med.name || '',
                                dose: med.dose ?? undefined,
                                quantity: Number(med.quantity),
                                brandName: med.brandName,
                            })),
                    }
                    : undefined,
        };

        return search;
    }

    getSearchDetails() {
        if (this.searchId) this.search = this.dataService.getData(this.searchId);
    }

    getAvailability() {
        if (!this.searchId || this.userType === UserType.Clinician) return;
        this.availabilityService.get(this.searchId).subscribe({
            next: (res) => {
                this.availability = res;
            },
            error: (err) => {
                console.log(err);
            },
        });
    }
}
