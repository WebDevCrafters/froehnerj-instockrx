import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { API_URL } from '../../../../env';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, of, throwError } from 'rxjs';
import { Notification } from '../../product/_shared/interfaces/Notification';

@Injectable({
    providedIn: 'root',
})
export class NotificationService {
    NOTIFICATION_URL = '/notification';
    constructor(
        private userService: UserService,
        private httpClient: HttpClient
    ) {}

    getNotifications() {
        const accessToken = this.userService.getAccessToken();
        const url = `${API_URL}${this.NOTIFICATION_URL}`;
        const headers = new HttpHeaders().set('authorization', accessToken);
        return this.httpClient.get(url, { headers }).pipe(
            map((res) => {
                return res as Notification[];
            }),
            catchError((err) => {
                if (err.status === 404) {
                    return of([]);
                }
                return throwError(() => err);
            })
        );
    }

    markAllAsRead() {
        const accessToken = this.userService.getAccessToken();
        const url = `${API_URL}${this.NOTIFICATION_URL}/read`;
        const headers = new HttpHeaders().set('authorization', accessToken);
        return this.httpClient.put(url, { headers }).pipe(
            map((res) => {
                return true;
            }),
            catchError((err) => {
                return throwError(() => err);
            })
        );
    }

    markAsRead(notificationId: string) {
        const notification: Notification = {
            notificationId: notificationId,
            isRead: true,
        };

        const accessToken = this.userService.getAccessToken();
        const url = `${API_URL}${this.NOTIFICATION_URL}/update`;
        const headers = new HttpHeaders().set('authorization', accessToken);
        return this.httpClient.put(url, notification, { headers }).pipe(
            map((res) => {
                return true;
            }),
            catchError((err) => {
                return throwError(() => err);
            })
        );
    }

    getUnreadCount() {
        const accessToken = this.userService.getAccessToken();
        const url = `${API_URL}${this.NOTIFICATION_URL}/unread-count`;
        const headers = new HttpHeaders().set('authorization', accessToken);
        return this.httpClient.get(url, { headers }).pipe(
            map((res) => {
                return res as { count: number };
            }),
            catchError((err) => {
                return throwError(() => err);
            })
        );
    }
}
