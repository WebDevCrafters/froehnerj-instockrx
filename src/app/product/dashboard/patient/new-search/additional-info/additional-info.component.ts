import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    FormArray,
    FormControl,
    FormGroup,
    ReactiveFormsModule,
} from '@angular/forms';
import { ButtonComponent } from '../../../../../_shared/components/button/button.component';
import { DatePickerComponent } from '../../../../../_shared/components/date-picker/date-picker.component';
import { InputComponent } from '../../../../../_shared/components/input/input.component';
import { ModalComponent } from '../../../../../_shared/components/modal/modal.component';
import { formatTimestampToMMDDYYYY, formatTimestamp, mmddyyToTimestamp } from '../../../../../_shared/utils/dateTime';
import { dateValidator } from '../../../../../_shared/utils/Validators';


@Component({
    selector: 'app-additional-info',
    standalone: true,
    imports: [
        InputComponent,
        ButtonComponent,
        CommonModule,
        ReactiveFormsModule,
        ModalComponent,
        DatePickerComponent,
    ],
    templateUrl: './additional-info.component.html',
    styleUrl: './additional-info.component.scss',
})
export class AdditionalInfoComponent {
    @Input() showDatePickerOnlyasInput: boolean = false;
    modalVisible: boolean = false;
    isDateInputActive: boolean = false;
    selectedDate: number = new Date().getTime();
    dateFormControl = new FormControl(
        formatTimestampToMMDDYYYY(this.selectedDate),
        dateValidator('Invalid format')
    );
    @Output() onAdditionalInfoSubmit = new EventEmitter<void>();
    @Input() additionalInfoForm = new FormGroup({
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

    get prescribedMedication(): FormArray {
        return this.additionalInfoForm.get('prescribedMedication') as FormArray;
    }

    addMedication() {
        this.prescribedMedication.push(this.createPrescribedMedicationFormGroup());
    }

    removeMedication(index: number) {
        this.prescribedMedication.removeAt(index);
    }

    createPrescribedMedicationFormGroup(): FormGroup {
        return new FormGroup({
            name: new FormControl(''),
            dose: new FormControl(''),
            quantity: new FormControl(''),
            brandName: new FormControl(''),
        });
    }

    getControl(formArrayIndex: number, formControlName: string): FormControl {
        const medicationFormGroup =
            this.additionalInfoForm.controls.prescribedMedication.at(
                formArrayIndex
            ) as FormGroup;
        return medicationFormGroup.get(formControlName) as FormControl;
    }

    openDateChooserModal() {
        this.modalVisible = true;
    }

    closeDateChooserModal(): void {
        this.modalVisible = false;
    }

    onDatePicked(timestamp: number) {
        this.selectedDate = timestamp;
    }

    toggleDateInput() {
        this.isDateInputActive = !this.isDateInputActive;
    }

    formatTimestamp(timestamp: number | null): string {
        if (!timestamp) return '';
        return formatTimestamp(timestamp);
    }

    onPositivePress() {
        let pickupTimestamp = 0;
        if (this.isDateInputActive && this.dateFormControl.value) {
            if (!this.dateFormControl.valid) return;
            pickupTimestamp = mmddyyToTimestamp(this.dateFormControl.value);
        } else {
            pickupTimestamp = this.selectedDate;
        }
        this.additionalInfoForm.controls.pickupDate.setValue(pickupTimestamp);
        this.closeDateChooserModal();
    }

    onFormSubmit() {
        this.onAdditionalInfoSubmit.emit();
    }
}
