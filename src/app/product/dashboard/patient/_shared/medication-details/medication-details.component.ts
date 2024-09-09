import { Component, HostListener, OnInit } from '@angular/core';
import { DataService } from '../../../../../_core/services/data.service';
import Search from '../../../../_shared/interfaces/Search';
import { ActivatedRoute, Router } from '@angular/router';
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
import { NotificationService } from '../../../../../_core/services/notification.service';
import APP_ROUTES from '../../../../../_shared/constants/routes';
import { PharmacyService } from '../../../../../_core/services/pharmacy.service';
import Pharmacy from '../../../../_shared/interfaces/Pharmacy';
import Medication from '../../../../_shared/interfaces/Medication';

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

    page: number = 1;
    search: Search | null = null;
    searchId: string | null = null;
    pharmaciesCount: number = 0;
    availability: Availability[] = [];
    searchStatus = SearchStatus;
    public isModalVisible: boolean = false;
    public isDecisionModalVisible: boolean = false;
    public isLoading: boolean = true;
    public isGetNearPharmacyloading: boolean = true;
    public isNextPharmacyLoading: boolean = false;
    public isPaid: boolean | null = null;
    public additionalInfoForm: any;
    public userType: UserType | null = null;
    public userInfo: User | null = null;
    readonly UserType = UserType;
    public isMedicationMarkedAsAvailable: boolean = false;
    public isEditMedicationLoading: boolean = false;
    public isStartSearchLoading: boolean = false;
    public isMarkAsCompleteLoading: boolean = false;
    public isMarkAsAvailableLoading: boolean = false;

    public pharmaciesNearSearchArray: Pharmacy[] = []

    constructor(
        private dataService: DataService,
        private userService: UserService,
        private searchService: SearchService,
        private route: ActivatedRoute,
        private availabilityService: AvailabilityService,
        private notificationService: NotificationService,
        private paymentService: PaymentService,
        private router: Router,
        private pharmacyService: PharmacyService
    ) { }

    async ngOnInit(): Promise<void> {
        this.initializeForm();
        this.route.paramMap.subscribe((params) => {
            this.searchId = params.get('searchId');
            this.getSearchDetails();
            this.checkIfMarkedAsAvailable();
        });
        this.getAvailability();
        this.setUserType();
        this.getSearchUserInfo(this.search?.patient);
        this.listenForLiveNotification();
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
        this.isMarkAsAvailableLoading = true;
        if (!this.searchId) {
            return;
            this.isMarkAsAvailableLoading = false;
        }
        let availability: Availability = {
            search: this.searchId,
        };
        this.availabilityService.add(availability).subscribe({
            next: (res) => {
                if (res) {
                    this.isMedicationMarkedAsAvailable = true;
                } else {
                    this.isMarkAsAvailableLoading = false;
                }
            },
            error: (err) => {
                console.log(err);
                this.isMarkAsAvailableLoading = false;
            },
        });
    }

    initializeForm() {
        this.additionalInfoForm = new FormGroup({
            dob: new FormControl(''),
            zipCode: new FormControl(''),
            prescriber: new FormControl(''),
            prescribedMedication: new FormArray([
                new FormGroup({
                    name: new FormControl(''),
                    dose: new FormControl(''),
                    quantity: new FormControl(''),
                    brandName: new FormControl(''),
                }),
            ]),
            pickupDate: new FormControl(new Date().getTime()),
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

            if (this.search.medication?.alternatives) {
                this.search.medication.alternatives.forEach((alternative) => {
                    const alternativeFormGroup = new FormGroup({
                        name: new FormControl(alternative.name),
                        dose: new FormControl(alternative.dose),
                        quantity: new FormControl(alternative.quantity),
                        brandName: new FormControl(alternative.brandName),
                    });
                    this.prescribedMedication.push(alternativeFormGroup);
                });
            }

        }
    }

    get prescribedMedication(): FormArray {
        return this.additionalInfoForm.get('prescribedMedication') as FormArray;
    }

    converTimestampToDOBString(dob: any) {
        const date = new Date(dob);
        return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
    }

    pay() {
        if (!this.isPaid) {
            this.isStartSearchLoading = false;
            this.navigateToPayment();
            return;
        }
    }

    public startSearch() {
        this.isStartSearchLoading = true;

        if (!this.search?.searchId) {
            this.isStartSearchLoading = false;
            return;
        }

        this.markStatus(this.search?.searchId, SearchStatus.InProgress);
    }

    public onSuccess() {
        if (this.search?.status == this.searchStatus.InProgress) {
            this.markSearchAsCompleted();
        } else {
            this.startSearch();
        }
    }

    public markSearchAsCompleted() {
        this.isMarkAsCompleteLoading = true;
        if (!this.search?.searchId) {
            this.isMarkAsCompleteLoading = false;
            this.toggleDecisionModalPopup();
            return;
        }
        this.markStatus(this.search?.searchId, SearchStatus.Completed);
    }

    private markStatus(searchId: string, status: SearchStatus) {
        this.searchService.markStatus(searchId, status).subscribe({
            next: (res) => {
                if (!this.search) return;
                this.search.status = res.status;
                this.isMarkAsCompleteLoading = false;
                this.isStartSearchLoading = false;
                if (this.isDecisionModalVisible) {
                    this.toggleDecisionModalPopup();
                }
            },
            error: (err) => {
                console.log(err);
                this.isMarkAsCompleteLoading = false;
                this.isStartSearchLoading = false;
                if (this.isDecisionModalVisible) {
                    this.toggleDecisionModalPopup();
                }
            },
        });
    }

    private updateSearch(search: Search | null): void {
        if (!search) return;

        this.searchService.updateSearch(search).subscribe({
            next: (res) => {
                const alternatives = this.search?.medication?.alternatives;
                const resAlternatives = res.medication?.alternatives;

                if (alternatives && resAlternatives) {
                    alternatives.forEach((alternative, index) => {
                        alternative.medicationId = resAlternatives[index] as any;
                    });
                }

                this.isEditMedicationLoading = false;
                this.isModalVisible = false;
                // console.log("Response update search:", this.search);
            },
            error: (err) => {
                console.error("Error updating search:", err);
                this.isEditMedicationLoading = false;
                this.isModalVisible = false;
            },
        });
    }


    toggleDecisionModalPopup() {
        this.isDecisionModalVisible = !this.isDecisionModalVisible;
    }

    async updateMedicationDetails() {
        this.isEditMedicationLoading = true;
        if (this.search) {
            this.search = this.convertFormToSearch();
            // console.log("Request update search", this.search);
            this.updateSearch(this.search);
        } else {
            this.isEditMedicationLoading = false;
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
        // if (this.searchId) {
        //     this.search = this.dataService.getSearch(this.searchId);
        //     console.log(this.search);
        // }
        // if (!this.search) {
        // }
        this.getSearch();
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

    listenForLiveNotification() {
        this.notificationService.notification$.subscribe({
            next: (notification) => {
                const notiAvailability = notification.data as Availability;
                if (this.searchId === notiAvailability.search) {
                    this.availability.unshift(notification.data);
                }
            },
            error: (err) => {
                console.log(err);
            },
        });
    }

    getSearch() {
        if (!this.searchId) return;
        this.searchService.getSearch(this.searchId).subscribe({
            next: (res) => {
                this.search = res;
                console.log("Fetched Search", this.search);
                this.checkPayment();
                this.generateForm();
                this.getPharmaciesNearSearch();
                this.getPharmaciesNearSearchCount();
            },
            error: (err) => { },
        });
    }

    checkPayment() {
        if (this.search?.status !== SearchStatus.NotStarted) return;

        this.paymentService.getCurrentPayment().subscribe({
            next: (payment) => {
                this.isPaid = !!payment;
            },
            error: (err) => {
                this.isPaid = false;
                console.log(err);
            },
        });
    }

    navigateToPayment() {
        this.router.navigate([
            APP_ROUTES.product.app,
            APP_ROUTES.product.dashboard,
            APP_ROUTES.product.payments,
        ]);
    }

    getPharmaciesNearSearch() {
        this.isGetNearPharmacyloading = true;
        if (!this.search?.location) return;
        this.pharmacyService
            .getPharmacyInRadius(this.search?.location, 1, 20)
            .subscribe({
                next: (res) => {
                    this.pharmaciesNearSearchArray.push(...res);
                    this.isGetNearPharmacyloading = false;
                },
                error: (err) => {
                    console.log(err);
                    this.isGetNearPharmacyloading = false;
                },
            });
    }

    getPharmaciesNearSearchCount() {
        if (!this.search?.location) return;

        this.pharmacyService
            .getPharmacyInRadiusCount(this.search?.location)
            .subscribe({
                next: (res) => {
                    this.pharmaciesCount = res.count;
                },
                error: (err) => {
                    console.log(err);
                },
            });
    }

    @HostListener('window:scroll', ['$event'])
    onScroll(event: any) {
        const element = event.target;
        if (element.scrollTop + element.clientHeight + 3 >= element.scrollHeight) {
            this.loadMorePharmacies();
        }
    }

    loadMorePharmacies() {
        if (!this.search?.location) return;
        this.isNextPharmacyLoading = true;
        this.pharmacyService
            .getPharmacyInRadius(this.search?.location, this.page, 20)
            .subscribe({
                next: (res) => {
                    this.pharmaciesNearSearchArray.push(...res);
                    this.page++;
                    this.isNextPharmacyLoading = false;
                },
                error: (err) => {
                    console.error(err);
                    this.isNextPharmacyLoading = false;
                },
            });
    }

}
