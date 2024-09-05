import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { API_URL } from '../../../../env';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, throwError } from 'rxjs';
import Pharmacy from '../../product/_shared/interfaces/Pharmacy';

@Injectable({
    providedIn: 'root',
})
export class PharmacyService {
    PHARMACY_URL = '/pharmacies';

    constructor(
        private userService: UserService,
        private httpClient: HttpClient
    ) {}

    getPharmacyNearSearch(searchId: string) {
        const accessToken = this.userService.getAccessToken();
        const url = `${API_URL}${this.PHARMACY_URL}/${searchId}`;
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
}
