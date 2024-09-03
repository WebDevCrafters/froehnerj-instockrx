import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ModalComponent } from '../modal/modal.component';
import { ButtonComponent } from '../button/button.component';
import { User } from '../../../product/_shared/interfaces/User';
import { Router } from '@angular/router';
import APP_ROUTES from '../../constants/routes';
import { CommonModule, Location } from '@angular/common';
import { UserService } from '../../../_core/services/user.service';
import { SocketService } from '../../../_core/services/socket.service';
import { SocketEvents } from '../../../product/_shared/interfaces/SocketEvents';
import { NotificationService } from '../../../_core/services/notification.service';
import { Notification } from '../../../product/_shared/interfaces/Notification';
import { NotificationComponent } from './notification/notification.component';

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [
        ButtonComponent,
        CommonModule,
        NotificationComponent,
        ModalComponent,
    ],
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
    @Output() toggleSidebar = new EventEmitter<void>();
    count: number = 0;

    constructor(
        private userService: UserService,
        private router: Router,
        private location: Location,
        private socketService: SocketService,
        private notificationService: NotificationService
    ) {}

    modalVisible: boolean = false;
    user: User | null = null;

    ngOnInit(): void {
        this.getUserEmail();
        this.initializeSocketConnection();
        this.getUnreadCount();
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
            APP_ROUTES.product.profile,
        ]);
        this.toggleSettings();
    }

    onMenuClick() {
        this.toggleSidebar.emit();
    }

    goBack() {
        this.location.back();
    }

    initializeSocketConnection() {
        const userId = this.user?.userId;

        if (!userId) return;

        this.socketService.init();
        this.socketService.onEvent(SocketEvents.Connect, () => {
            console.info('Socket Connected');
        });
        this.socketService.emitEvent(SocketEvents.JoinMyRoom, userId);
        this.socketService.onEvent(
            SocketEvents.Notification,
            (notification) => {
                console.log(notification);
            }
        );
    }

    getUnreadCount() {
        this.notificationService.getUnreadCount().subscribe({
            next: (res) => {
                this.count = res.count;
            },
            error: (err) => {
                console.log(err);
            },
        });
    }

    updateCount(count: number) {
        this.count = count;
    }
}
