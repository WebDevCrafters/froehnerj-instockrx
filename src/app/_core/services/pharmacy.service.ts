import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { API_URL } from '../../../../env';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, throwError } from 'rxjs';
import Pharmacy from '../../product/_shared/interfaces/Pharmacy';
import Location from '../../_shared/dataTypes/Location';

@Injectable({
    providedIn: 'root',
})
export class PharmacyService {
    PHARMACY_URL = '/pharmacies';

    constructor(
        private userService: UserService,
        private httpClient: HttpClient
    ) { }

    getPharmacyInRadius(location: Location, miles: number) {
        const accessToken = this.userService.getAccessToken();
        const url = `${API_URL}${this.PHARMACY_URL}?longitude=${location.longitude}&latitude=${location.latitude}&miles=${miles}`;
        const headers = new HttpHeaders().set('authorization', accessToken);
        return this.httpClient.get(url, { headers }).pipe(
            map((res) => {
                return res as Pharmacy[];
            }),
            catchError((err) => {
                return throwError(() => err);
            })
        );
    }

    getPharmacyInRadiusCount(location: Location) {
        const accessToken = this.userService.getAccessToken();
        const url = `${API_URL}${this.PHARMACY_URL}/count?longitude=${location.longitude}&latitude=${location.latitude}`;
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
