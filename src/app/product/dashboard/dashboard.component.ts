import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../_shared/components/header/header.component';
import { ButtonComponent } from '../../_shared/components/button/button.component';
import { CommonModule } from '@angular/common';
import { ModalComponent } from '../../_shared/components/modal/modal.component';
import { PatientDashboardComponent } from './patient-dashboard/patient-dashboard.component';
import { InputComponent } from '../../_shared/components/input/input.component';
import { ClinicianDashboardComponent } from './clinician-dashboard/clinician-dashboard.component';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    HeaderComponent,
    ButtonComponent,
    CommonModule,
    ModalComponent,
    PatientDashboardComponent,
    ClinicianDashboardComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  userType: "patient" | "clinician" = "patient"
}
