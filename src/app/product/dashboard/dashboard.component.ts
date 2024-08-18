import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../_shared/components/header/header.component';
import { ButtonComponent } from '../../_shared/components/button/button.component';
import { CommonModule } from '@angular/common';
import { ModalComponent } from '../../_shared/components/modal/modal.component';
import { InputComponent } from '../../_shared/components/input/input.component';
import { AuthService } from '../../_core/services/auth.service';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import APP_ROUTES from '../../_shared/constants/routes';


@Component({
    selector: 'app-dashboard',
    standalone: true,
    imports: [
        HeaderComponent,
        ButtonComponent,
        CommonModule,
        ModalComponent,
        RouterOutlet,
        RouterLink,
        RouterLinkActive
    ],
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
    APP_ROUTES = APP_ROUTES;
    userType: "patient" | "clinician" = "patient"
    public isSidebarExpanded: boolean = true;

    constructor(private authService: AuthService) { }

    ngOnInit(): void {
        this.getUserType();
    }

    getUserType() {
        const user = this.authService.getUserData();
        if (!user) return;
        this.userType = user.type;
    }

    toggleSidebar() {
        this.isSidebarExpanded = !this.isSidebarExpanded
    }
}
