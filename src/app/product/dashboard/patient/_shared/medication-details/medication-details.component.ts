import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../../../_core/services/data.service';
import Search from '../../../../_shared/interfaces/Search';
import { ActivatedRoute } from '@angular/router';
import { AvailabilityService } from '../../../../../_core/services/availability.service';
import Availability from '../../../../_shared/interfaces/Availability';
import { LoaderComponent } from '../../../../../_shared/components/loader/loader.component';
import { EmptyStateComponent } from '../../../../../_shared/components/empty-state/empty-state.component';
import { ButtonComponent } from '../../../../../_shared/components/button/button.component';
import { SearchStatus } from '../../../../_shared/interfaces/SearchStatus';
import { InputComponent } from '../../../../../_shared/components/input/input.component';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import {
    charLimitValidator,
    dateValidator,
    requiredValidator,
} from '../../../../../_shared/utils/Validators';
import { ModalComponent } from '../../../../../_shared/components/modal/modal.component';
import { AdditionalInfoComponent } from '../../new-search/additional-info/additional-info.component';
import { markAllAsDirty } from '../../../../../_shared/utils/formUtils';
import { PaymentService } from '../../../../../_core/services/payment.service';
import { CommonModule } from '@angular/common';
import UserType from '../../../../_shared/interfaces/UserType';
import { UserService } from '../../../../../_core/services/user.service';
import { User } from '../../../../_shared/interfaces/User';
import { SearchService } from '../../../../../_core/services/search.service';

@Component({
    selector: 'app-medication-details',
    standalone: true,
    imports: [
        CommonModule,
        LoaderComponent,
        EmptyStateComponent,
        ButtonComponent,
        InputComponent,
        ModalComponent,
        AdditionalInfoComponent,
    ],
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
    public isLoading: boolean = true;
    public additionalInfoForm: any;
    public userType: UserType | null = null;
    public userInfo: User | null = null;
    readonly UserType = UserType;
    public isMedicationMarkedAsAvailable: boolean = false;

    constructor(
        private dataService: DataService,
        private userService: UserService,
        private searchService: SearchService,
        private route: ActivatedRoute,
        private availabilityService: AvailabilityService,
        private paymentService: PaymentService
    ) {}

    async ngOnInit(): Promise<void> {
        this.route.paramMap.subscribe((params) => {
            this.searchId = params.get('searchId');
            this.getSearchDetails();
            this.checkIfMarkedAsAvailable();
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
        };
        this.availabilityService.add(availability).subscribe({
            next: (res) => {
                if (res) {
                    this.isMedicationMarkedAsAvailable = true;
                }
            },
            error: (err) => {
                console.log(err);
            },
        });
    }

    generateForm() {
        if (this.search) {
            let DOBstring = '';
            let PickUpDateString = '';
            if (this.search?.dob) {
                DOBstring = this.converTimestampToDOBString(this.search?.dob);
            }
            if (this.search.medication?.pickUpDate) {
                PickUpDateString = this.converTimestampToDOBString(
                    this.search.medication?.pickUpDate
                );
            }

            this.additionalInfoForm = new FormGroup({
                dob: new FormControl(DOBstring, [
                    requiredValidator(
                        "Patient's date of birth cannot be empty"
                    ),
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
                            requiredValidator(
                                'Medication option 1 cannot be empty'
                            ),
                        ]),
                        dose: new FormControl(this.search?.medication?.dose),
                        quantity: new FormControl(
                            this.search?.medication?.quantity
                        ),
                        brandName: new FormControl(
                            this.search?.medication?.brandName
                        ),
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

    public startSearch() {
        if (!this.search?.searchId) return;
        this.markStatus(this.search?.searchId, SearchStatus.InProgress);
    }

    private markStatus(searchId: string, status: SearchStatus) {
        this.searchService.markStatus(searchId, status).subscribe({
            next: (res) => {
                if (!this.search) return;
                this.search.status = res.status;
            },
            error: (err) => {
                console.log(err);
            },
        });
    }

    private updateSearch(search: Search | null) {
        if (!search) return;
        this.searchService.updateSearch(search).subscribe({
            next: (res) => {
                console.log(res);
                this.search = res;
            },
            error: (err) => {
                console.log(err);
            },
        });
    }

    async updateMedicationDetails() {
        if (this.search) {
            this.search = this.convertFormToSearch();
            this.updateSearch(this.search);
            this.isModalVisible = false;
        }
    }

    openModalPopup() {
        this.isModalVisible = !this.isModalVisible;
        if (this.additionalInfoForm.valid) {
            this.search = this.convertFormToSearch();
        } else {
            this.additionalInfoForm.markAllAsTouched();
            markAllAsDirty(this.additionalInfoForm);
        }
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
        if (!this.searchId || !this.search?.medication?.medicationId)
            return null;

        const search: Search = {
            searchId: this.searchId,
            prescriberName: formValues.prescriber || '',
            dob: dob,
            zipCode: Number(formValues.zipCode),
            status: this.search?.status,
            medication:
                formValues.prescribedMedication &&
                formValues.prescribedMedication.length > 0
                    ? {
                          medicationId: this.search?.medication?.medicationId,
                          name: formValues.prescribedMedication[0]?.name || '',
                          dose:
                              formValues.prescribedMedication[0]?.dose ??
                              undefined,
                          quantity: Number(
                              formValues.prescribedMedication[0]?.quantity
                          ),
                          pickUpDate: pickUpDate,
                          brandName:
                              formValues.prescribedMedication[0]?.brandName ||
                              '',
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

        return search || null;
    }

    getSearchDetails() {
        if (this.searchId)
            this.search = this.dataService.getSearch(this.searchId);
    }

    checkIfMarkedAsAvailable() {
        if (this.searchId)
            this.isMedicationMarkedAsAvailable =
                !!this.dataService.getAvailability(this.searchId);
    }

    getAvailability() {
        this.isLoading = true;
        if (!this.searchId || this.userType === UserType.Patient) return;
        this.availabilityService.get(this.searchId).subscribe({
            next: (res) => {
                this.isLoading = false;
                this.availability = res;
            },
            error: (err) => {
                this.isLoading = false;
                console.log(err);
            },
        });
    }
}
