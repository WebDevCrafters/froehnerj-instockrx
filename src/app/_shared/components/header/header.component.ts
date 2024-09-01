import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ModalComponent } from '../modal/modal.component';
import { ButtonComponent } from '../button/button.component';
import { User } from '../../../product/_shared/interfaces/User';
import { Router } from '@angular/router';
import APP_ROUTES from '../../constants/routes';
import { CommonModule, Location } from '@angular/common';
import { UserService } from '../../../_core/services/user.service';

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [ModalComponent, ButtonComponent, CommonModule],
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
    @Output() toggleSidebar = new EventEmitter<void>();

    constructor(private userService: UserService, private router: Router, private location: Location) { }

    modalVisible: boolean = false;
    user: User | null = null;

    ngOnInit(): void {
        this.getUserEmail();
    }

    getUserEmail() {
        const authResponse = this.userService.getUserData();
        if (!authResponse) return;
        this.user = authResponse.user;
    }

    toggleSettings() {
        this.modalVisible = !this.modalVisible;
    }

    requestAccountDeletion() {
        const url = 'https://u4acjiu8lv3.typeform.com/to/WDj0hN0I';
        window.open(url, '_blank');
    }

    signout() {
        this.userService.signOut();
        this.router.navigate(
            [`${APP_ROUTES.product.app}/${APP_ROUTES.product.auth}`],
            { replaceUrl: true }
        );
    }

    resetPassword() {
        this.router.navigate(
            [`${APP_ROUTES.product.app}/${APP_ROUTES.product.resetPassword}`],
            { replaceUrl: true }
        );
    }

    navigateToEditProfile() {
        this.router.navigate([
            APP_ROUTES.product.app,
            APP_ROUTES.product.dashboard,
            APP_ROUTES.product.patient,
            APP_ROUTES.product.profile
        ]);
        this.toggleSettings();
    }

    onMenuClick() {
        this.toggleSidebar.emit();
    }

    goBack() {
        this.location.back();
    }
}
