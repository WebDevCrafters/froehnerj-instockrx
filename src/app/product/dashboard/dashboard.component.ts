import { Component, OnInit, HostListener } from '@angular/core';
import { HeaderComponent } from '../../_shared/components/header/header.component';
import { ButtonComponent } from '../../_shared/components/button/button.component';
import { CommonModule } from '@angular/common';
import { ModalComponent } from '../../_shared/components/modal/modal.component';
import { InputComponent } from '../../_shared/components/input/input.component';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import APP_ROUTES from '../../_shared/constants/routes';
import { SidebarComponent } from './_shared/sidebar/sidebar.component';
import { UserService } from '../../_core/services/user.service';
import UserType from '../_shared/interfaces/UserType';

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
        RouterLinkActive,
        SidebarComponent,
    ],
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
    APP_ROUTES = APP_ROUTES;
    userType?: UserType = UserType.Patient;
    UserType = UserType;
    public isSidebarExpanded: boolean = true;

    constructor(private userService: UserService) { }

    ngOnInit(): void {
        this.getUserType();
    }

    getUserType() {
        const authResponse = this.userService.getUserData();
        if (!authResponse) return;
        this.userType = authResponse.user.userType;
    }

    toggleSidebar() {
        this.isSidebarExpanded = !this.isSidebarExpanded;
    }

    closeSidebar() {
        if(!window) return;
        if (window.innerWidth <= 700) {
            this.isSidebarExpanded = false;
        }
    }

    @HostListener('window:resize', ['$event'])
    onResize(event: Event) {
        if(!window) return;
        if (window.innerWidth > 700 && !this.isSidebarExpanded) {
            this.isSidebarExpanded = true;
        }
    }
}
