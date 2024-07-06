import { Component } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  dateValidator,
  requiredValidator,
} from '../../../_shared/utils/Validators';
import { activeSearchData } from '../../../_shared/constants/data';
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

@Component({
  selector: 'app-patient-dashboard',
  standalone: true,
  imports: [
    DatePickerComponent,
    InputComponent,
    ModalComponent,
    ButtonComponent,
    CommonModule,
  ],
  templateUrl: './patient-dashboard.component.html',
  styleUrl: './patient-dashboard.component.scss',
})
export class PatientDashboardComponent {
  activeSearchData: ActiveSearch = activeSearchData;
  modalVisible: boolean = false;
  isDateInputActive: boolean = false;
  isProfileEditable: boolean = true;
  selectedDate: number = activeSearchData.pickupDate;
  dateFormControl: FormControl = new FormControl('');

  activeSearchForm = new FormGroup({
    prescribedMedication: new FormArray([
      new FormGroup({
        name: new FormControl('Eissa', [
          requiredValidator('Medication option 1 cannot be empty'),
        ]),
        dose: new FormControl('Dose'),
        quantity: new FormControl('QQU'),
        brand: new FormControl('Bra'),
      }),
    ]),
    pickupDate: new FormControl(new Date().getTime(), [Validators.required]),
  });

  profileForm = new FormGroup({
    name: new FormControl('Patient Bal'),
    email: new FormControl('patientsomething.com'),
    phoneNumber: new FormControl('(123) 456-7890'),
    dob: new FormControl('2020-10-10'),
    zipCode: new FormControl('12345'),
    doctorName: new FormControl('John'),
    doctorEmail: new FormControl('doctoreail.com'),
  });

  editableStates: boolean[] = Array(activeSearchData.medications.length).fill(
    false
  );
  backups: any[] = [];

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
  }

  saveEditProfile(){
    
  }

  cancelEditProfile(){

  }

}
