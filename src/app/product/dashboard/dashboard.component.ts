import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../_shared/components/header/header.component';
import { ButtonComponent } from '../../_shared/components/button/button.component';
import { CommonModule } from '@angular/common';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import {
  dateValidator,
  requiredValidator,
} from '../../_shared/utils/Validators';
import { activeSearchData } from '../../_shared/constants/data';
import { ActiveSearch } from '../../_shared/dataTypes/ActiveSearch';
import {
  formatTimestamp,
  mmddyyToTimestamp,
} from '../../_shared/utils/dateTime';
import { DatePickerComponent } from '../../_shared/components/date-picker/date-picker.component';
import { InputComponent } from '../../_shared/components/input/input.component';
import { ModalComponent } from '../../_shared/components/modal/modal.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    HeaderComponent,
    ButtonComponent,
    CommonModule,
    DatePickerComponent,
    InputComponent,
    ModalComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  activeSearchData: ActiveSearch = activeSearchData;
  modalVisible: boolean = false;
  isDateInputActive: boolean = false;
  selectedDate: number = activeSearchData.pickupDate;
  dateFormControl: FormControl = new FormControl(this.selectedDate);

  activeSearchForm = new FormGroup({
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
    pickupDate: new FormControl(new Date().getTime(), [Validators.required]),
  });

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
  }

  removeMedication(index: number) {
    this.activeSearchForm.controls.prescribedMedication.removeAt(index);
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
}
