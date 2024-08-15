import { Component, OnInit } from '@angular/core';
import { ModalComponent } from '../modal/modal.component';
import { AuthService } from '../../../_core/services/auth.service';
import { ButtonComponent } from '../button/button.component';
import { User } from '../../dataTypes/User';
import { Router } from '@angular/router';
import APP_ROUTES from '../../constants/routes';
import { Location } from '@angular/common';

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [ModalComponent, ButtonComponent],
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
    constructor(private authService: AuthService, private router: Router, private location: Location) { }

    modalVisible: boolean = false;
    user: User | null = null;

    ngOnInit(): void {
        this.getUserEmail();
    }

    getUserEmail() {
        const user = this.authService.getUserData();
        if (!user) return;
        this.user = user;
    }

    toggleSettings() {
        this.modalVisible = !this.modalVisible;
    }

    requestAccountDeletion() {
        const url = 'https://u4acjiu8lv3.typeform.com/to/WDj0hN0I';
        window.open(url, '_blank');
    }

    signout() {
        this.authService.signOut();
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
            APP_ROUTES.product.editPatientsProfile
        ]);
        this.toggleSettings();
    }

    goBack() {
        this.location.back();
    }
}
