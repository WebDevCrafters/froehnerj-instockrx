import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ModalComponent } from '../../modal/modal.component';
import { NotificationService } from '../../../../_core/services/notification.service';
import { CommonModule } from '@angular/common';
import { Notification } from '../../../../product/_shared/interfaces/Notification';

@Component({
    selector: 'app-notification',
    standalone: true,
    imports: [ModalComponent, CommonModule],
    templateUrl: './notification.component.html',
    styleUrl: './notification.component.scss',
})
export class NotificationComponent implements OnInit {
    notificationArr: Notification[] = [];

    constructor(private notificationService: NotificationService) {}

    ngOnInit(): void {
        this.getNotifications();
        console.log('Ia m eher');
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
}
