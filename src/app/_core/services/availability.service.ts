import { Injectable } from '@angular/core';
import Availability from '../../product/_shared/interfaces/Availability';
import { UserService } from './user.service';
import { API_URL } from '../../../../env';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, throwError } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class AvailabilityService {
    AVAILABILITY_URL = '/availability';
    constructor(
        private userService: UserService,
        private httpClient: HttpClient
    ) {}

    add(availability: Availability) {
        const accessToken = this.userService.getAccessToken();
        const url = `${API_URL}${this.AVAILABILITY_URL}`;
        const headers = new HttpHeaders().set('authorization', accessToken);
        return this.httpClient.post(url, availability, { headers }).pipe(
            map((res) => {
                return res as Availability;
            }),
            catchError((err) => throwError(() => err))
        );
    }

    get(searchId: string) {
        const accessToken = this.userService.getAccessToken();
        const url = `${API_URL}${this.AVAILABILITY_URL}/${searchId}`;
        const headers = new HttpHeaders().set('authorization', accessToken);
        return this.httpClient.get(url, { headers }).pipe(
            map((res) => {
                return res as Availability[];
            }),
            catchError((err) => throwError(() => err))
        );
    }
}
