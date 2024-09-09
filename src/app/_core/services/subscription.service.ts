import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from '../../../../env';
import Subscription from '../../product/_shared/interfaces/Subscription';
import { catchError, map, throwError } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class SubscriptionService {
    SUBSCRIPTION_URL = '/subscription';

    constructor(private httpClient: HttpClient) {}

    getAllSubscriptions() {
        const url = `${API_URL}${this.SUBSCRIPTION_URL}`;
        return this.httpClient.get(url).pipe(
            map(
                (result) => {
                    return result as Subscription[];
                },
                catchError((err) => {
                    return throwError(() => err);
                })
            )
        );
    }
}
