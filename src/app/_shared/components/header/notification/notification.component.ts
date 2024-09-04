import {
    Component,
    EventEmitter,
    Input,
    OnChanges,
    OnInit,
    Output,
    SimpleChanges,
} from '@angular/core';
import { ModalComponent } from '../../modal/modal.component';
import { NotificationService } from '../../../../_core/services/notification.service';
import { CommonModule } from '@angular/common';
import { Notification } from '../../../../product/_shared/interfaces/Notification';
import { EmptyStateComponent } from '../../empty-state/empty-state.component';
import { Router } from '@angular/router';
import APP_ROUTES from '../../../constants/routes';
import { NotificationType } from '../../../../product/_shared/interfaces/NotificationType';

@Component({
    selector: 'app-notification',
    standalone: true,
    imports: [ModalComponent, CommonModule, EmptyStateComponent],
    templateUrl: './notification.component.html',
    styleUrl: './notification.component.scss',
})
export class NotificationComponent implements OnInit {
    notificationArr: Notification[] = [];
    @Input() count = 0;
    @Output() countChange = new EventEmitter<number>();

    constructor(
        private notificationService: NotificationService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.getNotifications();
        this.listenLiveNotification();
    }

    listenLiveNotification() {
        this.notificationService.notification$.subscribe({
            next: (notification) => {
                console.log('from nitit', notification);
                this.notificationArr.unshift(notification);
            },
            error: (err) => {
                console.log(err);
            },
        });
    }

    getNotifications() {
        this.notificationService.getNotifications().subscribe({
            next: (res) => {
                this.notificationArr = res;
                console.log(res);
            },
            error: (err) => {
                console.log(err);
            },
        });
    }

    markAllAsRead() {
        this.notificationService.markAllAsRead().subscribe({
            next: (res) => {
                console.log(res);
            },
            error: (err) => {
                console.log(err);
            },
        });
    }

    markAsRead(notificationId?: string) {
        if (!notificationId) return;
        this.count = this.count - 1;
        this.countChange.emit(this.count);

        this.notificationService.markAsRead(notificationId).subscribe({
            next: (res) => {
                this.notificationArr.forEach((ele) => {
                    if (ele.notificationId === notificationId)
                        ele.isRead = true;
                });
                console.log(res);
            },
            error: (err) => {
                console.log(err);
            },
        });
    }

    shouldShowDateSeparator(index: number): boolean {
        if (index === 0) {
            return true; // Always show a separator for the first item
        }

        const currentNotification = this.notificationArr[index];
        const previousNotification = this.notificationArr[index - 1];

        // Compare the dates of the current and previous notifications
        return this.isDifferentDay(
            currentNotification.createdOn,
            previousNotification.createdOn
        );
    }

    isDifferentDay(date1?: number, date2?: number): boolean {
        if (!date1 || !date2) return false;

        const d1 = new Date(date1);
        const d2 = new Date(date2);
        return (
            d1.getDate() !== d2.getDate() ||
            d1.getMonth() !== d2.getMonth() ||
            d1.getFullYear() !== d2.getFullYear()
        );
    }

    getDateLabel(timestamp: number): string {
        const date = new Date(timestamp);
        const today = new Date();

        if (
            date.getDate() === today.getDate() &&
            date.getMonth() === today.getMonth() &&
            date.getFullYear() === today.getFullYear()
        ) {
            return 'Today';
        }

        return date.toLocaleDateString(); // Returns the date in a readable format
    }

    routeToMedicationDetails(searchId: string) {
        this.router.navigate([
            APP_ROUTES.product.app,
            APP_ROUTES.product.dashboard,
            APP_ROUTES.product.medicationDetails,
            searchId,
        ]);
    }

    onNotificationClick(notification: Notification) {
        if (
            notification.notificationType === NotificationType.MarkAsAvailable
        ) {
            this.markAsRead(notification.notificationId);
            this.routeToMedicationDetails(notification.data.search);
        }
    }
}
