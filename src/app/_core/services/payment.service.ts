import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { catchError, map, Observable, of, switchMap, throwError } from 'rxjs';
import Payment from '../../product/_shared/interfaces/Payment';
import {
    HttpClient,
    HttpErrorResponse,
    HttpHeaders,
    HttpResponse,
} from '@angular/common/http';
import { AddPaymentRequest } from '../../product/_shared/interfaces/AddPaymentRequest';
import { StripeFactoryService, StripeInstance } from 'ngx-stripe';
import { environment } from '../../../environments/environment';

interface IStripeSession {
    id: string;
}

@Injectable({
    providedIn: 'root',
})
export class PaymentService {
    PAYMENT_URL: string = '/api/payment';

    public stripe!: StripeInstance;

    constructor(
        private userService: UserService,
        private httpClinet: HttpClient,
        private stripeFactory: StripeFactoryService
    ) {
        this.stripe = this.stripeFactory.create(environment.STRIPE_PK);
    }

    getCurrentPayment(): Observable<Payment | null> {
        const url = `${environment.BASE_URL}${this.PAYMENT_URL}`;
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
        const url = `${environment.BASE_URL}${this.PAYMENT_URL}`;
        const accessToken = this.userService.getAccessToken();
        const headers = new HttpHeaders().set('authorization', accessToken);
        return this.httpClinet.post(url, requestBody, { headers }).pipe(
            map((res) => {
                return res as Payment;
            }),
            catchError((err: HttpErrorResponse) => throwError(() => err))
        );
    }

    stripeSession(addPaymentReq: AddPaymentRequest) {
        const accessToken = this.userService.getAccessToken();
        const headers = new HttpHeaders().set(
            'Authorization',
            `Bearer ${accessToken}`
        );

        return this.httpClinet
            .post(environment.BASE_URL + this.PAYMENT_URL + '/stripe', addPaymentReq, {
                headers,
                observe: 'response',
            })
            .pipe(
                switchMap((response: HttpResponse<Object>) => {
                    const session: IStripeSession =
                        response.body as IStripeSession;
                    return this.stripe.redirectToCheckout({
                        sessionId: session.id,
                    });
                })
            );
    }
}
