import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-clinician-dashboard',
    standalone: true,
    imports: [FormsModule, CommonModule],
    templateUrl: './clinician-dashboard.component.html',
    styleUrls: ['./clinician-dashboard.component.scss']
})
export class ClinicianDashboardComponent {
    dropdownOpen = false;
    allSelected = false;
    options = [
        { label: 'Payment Authorized', checked: false },
        { label: 'On Hold', checked: false },
        { label: 'In Progress', checked: false },
        { label: 'Script Found', checked: false }
    ];

    toggleDropdown() {
        this.dropdownOpen = !this.dropdownOpen;
    }

    closeDropdown() {
        this.dropdownOpen = false;
    }

    @HostListener('document:click', ['$event'])
    onDocumentClick(event: MouseEvent) {
        const target = event.target as HTMLElement;
        if (!target.closest('.dropdown-content') && !target.closest('.dropdown-toggle')) {
            this.closeDropdown();
        }
    }

    toggleAllOptions() {
        const newValue = this.allSelected;
        this.options.forEach(option => option.checked = newValue);
    }

    updateAllSelected() {
        this.allSelected = this.options.every(option => option.checked);
    }
}
