import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../_shared/components/header/header.component';
import { ButtonComponent } from '../../_shared/components/button/button.component';
import { CommonModule } from '@angular/common';
import { ModalComponent } from '../../_shared/components/modal/modal.component';
import { PatientDashboardComponent } from './patient-dashboard/patient-dashboard.component';
import { InputComponent } from '../../_shared/components/input/input.component';
import { ClinicianDashboardComponent } from './clinician-dashboard/clinician-dashboard.component';
import { AuthService } from '../../_core/services/auth.service';
import { RouterOutlet } from '@angular/router';


@Component({
    selector: 'app-dashboard',
    standalone: true,
    imports: [
        HeaderComponent,
        ButtonComponent,
        CommonModule,
        ModalComponent,
        PatientDashboardComponent,
        ClinicianDashboardComponent,
        RouterOutlet
    ],
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
    userType: "patient" | "clinician" = "patient"

    constructor(private authService: AuthService) { }

    ngOnInit(): void {
        this.getUserType();
    }

    getUserType() {
        const user = this.authService.getUserData();
        if (!user) return;
        this.userType = user.type;
    }
}
