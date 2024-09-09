import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { catchError, map, Observable, of, throwError } from 'rxjs';
import Payment from '../../product/_shared/interfaces/Payment';
import {
    HttpClient,
    HttpErrorResponse,
    HttpHeaders,
} from '@angular/common/http';
import { API_URL } from '../../../../env';
import PaymentStatus from '../../product/_shared/interfaces/PaymentStatus';
import { AddPaymentRequest } from '../../product/_shared/interfaces/AddPaymentRequest';
import { error } from 'node:console';

@Injectable({
    providedIn: 'root',
})
export class PaymentService {
    PAYMENT_URL: string = '/payment';

    constructor(
        private userService: UserService,
        private httpClinet: HttpClient
    ) {}

    getCurrentPayment(): Observable<Payment | null> {
        const url = `${API_URL}${this.PAYMENT_URL}`;
        const accessToken = this.userService.getAccessToken();
        const headers = new HttpHeaders().set('authorization', accessToken);
        return this.httpClinet.get(url, { headers }).pipe(
            map((result) => {
                return result as Payment;
            }),
            catchError((err: HttpErrorResponse) => {
                if (err.status === 404) {
                    return of(null);
                }
                return throwError(() => err);
            })
        );
    }

    addPayment(requestBody: AddPaymentRequest) {
        const url = `${API_URL}${this.PAYMENT_URL}`;
        const accessToken = this.userService.getAccessToken();
        const headers = new HttpHeaders().set('authorization', accessToken);
        return this.httpClinet.post(url, requestBody, { headers }).pipe(
            map((res) => {
                return res as Payment;
            }),
            catchError((err: HttpErrorResponse) => throwError(() => err))
        );
    }
}
