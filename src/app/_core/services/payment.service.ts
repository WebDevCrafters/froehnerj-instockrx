import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { catchError, map, Observable, of, throwError } from 'rxjs';
import Payment from '../../product/_shared/interfaces/Payment';
import {
    HttpClient,
    HttpErrorResponse,
    HttpHeaders,
} from '@angular/common/http';
import { BASE_URL } from '../../../../env';

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
        const url = `${BASE_URL}${this.PAYMENT_URL}`;
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
}
