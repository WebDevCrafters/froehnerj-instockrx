import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, of, Subject, throwError } from 'rxjs';
import { Notification } from '../../product/_shared/interfaces/Notification';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class NotificationService {
    NOTIFICATION_URL = '/api/notification';
    notificationSubject = new Subject<Notification>()
    constructor(
        private userService: UserService,
        private httpClient: HttpClient
    ) {}

    notification$ = this.notificationSubject.asObservable();
  
    emitNotification(data: Notification) {
      this.notificationSubject.next(data);
    }

    getNotifications() {
        const accessToken = this.userService.getAccessToken();
        const url = `${environment.BASE_URL}${this.NOTIFICATION_URL}`;
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
        const url = `${environment.BASE_URL}${this.NOTIFICATION_URL}/read`;
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
        const url = `${environment.BASE_URL}${this.NOTIFICATION_URL}/update`;
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
        const url = `${environment.BASE_URL}${this.NOTIFICATION_URL}/unread-count`;
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
