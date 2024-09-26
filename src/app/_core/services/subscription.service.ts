import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Subscription from '../../product/_shared/interfaces/Subscription';
import { catchError, map, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class SubscriptionService {
    SUBSCRIPTION_URL = '/api/subscription';

    constructor(private httpClient: HttpClient) {}

    getAllSubscriptions() {
        const url = `${environment.BASE_URL}${this.SUBSCRIPTION_URL}`;
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
