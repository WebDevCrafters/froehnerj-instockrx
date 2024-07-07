import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  charLimitValidator,
  dateValidator,
  emailValidator,
  requiredValidator,
} from '../../../_shared/utils/Validators';
import { activeSearchData, defaultPackage } from '../../../_shared/constants/data';
import { ActiveSearch } from '../../../_shared/dataTypes/ActiveSearch';
import {
  formatTimestamp,
  mmddyyToTimestamp,
} from '../../../_shared/utils/dateTime';
import { DatePickerComponent } from '../../../_shared/components/date-picker/date-picker.component';
import { InputComponent } from '../../../_shared/components/input/input.component';
import { ModalComponent } from '../../../_shared/components/modal/modal.component';
import { ButtonComponent } from '../../../_shared/components/button/button.component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import APP_ROUTES from '../../../_shared/constants/routes';
import { markAllAsDirty } from '../../../_shared/utils/formUtils';
import { User } from '../../../_shared/dataTypes/User';
import { AuthService } from '../../../_core/services/auth.service';

@Component({
  selector: 'app-patient-dashboard',
  standalone: true,
  imports: [
    DatePickerComponent,
    InputComponent,
    ModalComponent,
    ButtonComponent,
    CommonModule,
    FormsModule,
  ],
  templateUrl: './patient-dashboard.component.html',
  styleUrl: './patient-dashboard.component.scss',
})
export class PatientDashboardComponent implements OnInit{
  activeSearchData: ActiveSearch = activeSearchData;
  modalVisible: boolean = false;
  isDateInputActive: boolean = false;
  isProfileEditable: boolean = false;
  selectedDate: number = activeSearchData.pickupDate;
  dateFormControl: FormControl = new FormControl('');
  profileBackup: any = null;
  myPackage = defaultPackage;  //should come from server
  user: User | null = null;

  activeSearchForm = new FormGroup({
    prescribedMedication: new FormArray([
      new FormGroup({
        name: new FormControl('Medication Name', [
          requiredValidator('Medication option 1 cannot be empty'),
        ]),
        dose: new FormControl('Dose'),
        quantity: new FormControl('Quantity'),
        brand: new FormControl('Brand Name'),
      }),
    ]),
    pickupDate: new FormControl(new Date().getTime(), [Validators.required]),
  });

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
    dob: new FormControl('', [
      requiredValidator("Patient's date of birth cannot be empty"),
      dateValidator('Please enter a valid date'),
    ]),
    zipCode: new FormControl('', [
      requiredValidator('Zip code must not be empty'),
      charLimitValidator(5, 'Zip code must be 5 digits'),
    ]),
    doctorName: new FormControl('', []),
    doctorEmail: new FormControl('', []),
  });

  editableStates: boolean[] = Array(activeSearchData.medications.length).fill(
    false
  );
  backups: any[] = [];

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.getUser();
    this.setControls();
  }

  getUser(){
    const user = this.authService.getUserData();
    if(!user) return;
    this.user = user;
  }

  setControls(){
    // these values should come from server
    this.profileForm.controls.name.setValue(`${this.user?.firstName} ${this.user?.lastName}`)
    this.profileForm.controls.email.setValue(`${this?.user?.email}`)
  }


  formatTimestamp(timestamp: number | null) {
    if (!timestamp) return '';
    return formatTimestamp(timestamp);
  }

  openDateChooserModal() {
    this.modalVisible = true;
  }

  closeDateChooserModal(): void {
    this.modalVisible = false;
  }

  toggleDateInput() {
    this.isDateInputActive = !this.isDateInputActive;
  }

  onDatePicked(timestamp: number) {
    this.selectedDate = timestamp;
  }

  onPositivePress() {
    let pickupTimestamp = 0;
    if (this.isDateInputActive && this.dateFormControl.value) {
      if (!this.dateFormControl.valid) return;
      pickupTimestamp = mmddyyToTimestamp(this.dateFormControl.value);
    } else {
      pickupTimestamp = this.selectedDate;
    }
    this.activeSearchForm.controls.pickupDate.setValue(pickupTimestamp);
    this.closeDateChooserModal();
  }

  createPrescribedMedicationFormGroup(): FormGroup {
    return new FormGroup({
      name: new FormControl(''),
      dose: new FormControl(''),
      quantity: new FormControl(''),
      brand: new FormControl(''),
    });
  }

  addMedication() {
    this.activeSearchForm.controls.prescribedMedication.push(
      this.createPrescribedMedicationFormGroup()
    );
    this.editableStates.push(true);
    this.backups.push(null);
  }

  removeMedication(index: number) {
    this.activeSearchForm.controls.prescribedMedication.removeAt(index);
    this.editableStates.splice(index, 1);
    this.backups.splice(index, 1);
  }

  toggleEditable(index: number) {
    if (!this.editableStates[index]) {
      const medicationFormGroup =
        this.activeSearchForm.controls.prescribedMedication.at(
          index
        ) as FormGroup;
      this.backups[index] = medicationFormGroup.value;
    }
    this.editableStates[index] = !this.editableStates[index];
  }

  getControl(formArrayIndex: number, formControlName: string): FormControl {
    const medicationFormGroup =
      this.activeSearchForm.controls.prescribedMedication.at(
        formArrayIndex
      ) as FormGroup;
    return medicationFormGroup.get(formControlName) as FormControl;
  }

  get prescribedMedication(): FormArray {
    return this.activeSearchForm.get('prescribedMedication') as FormArray;
  }

  saveMedication(index: number) {
    this.editableStates[index] = false;
    this.backups[index] = null;
  }

  cancelMedication(index: number) {
    const medicationFormGroup =
      this.activeSearchForm.controls.prescribedMedication.at(
        index
      ) as FormGroup;
    medicationFormGroup.setValue(this.backups[index]);
    this.editableStates[index] = false;
    this.backups[index] = null;
  }

  onSubmit(): void {
    if (this.profileForm.valid) {
      console.log(this.profileForm.value);
    } else {
      console.log('Form is invalid');
    }
  }

  toggleEditProfile() {
    this.isProfileEditable = !this.isProfileEditable;
    if (this.isProfileEditable) {
      this.profileBackup = this.profileForm.value;
    }
  }

  saveEditProfile() {
    this.profileForm.markAllAsTouched();
    markAllAsDirty(this.profileForm);
    if (!this.profileForm.valid) return;
    this.isProfileEditable = false;
    this.profileBackup = null;
  }

  cancelEditProfile() {
    if (this.profileBackup) {
      this.profileForm.setValue(this.profileBackup);
    }
    this.isProfileEditable = false;
    this.profileBackup = null;
  }

  completePayment(){
    this.router.navigate(
      [`${APP_ROUTES.product.app}/${APP_ROUTES.product.selfService}`],
      { replaceUrl: true }
      
    );
  }
}
