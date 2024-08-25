import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { SearchStatus } from '../../product/_shared/interfaces/SearchStatus';
import { BASE_URL } from '../../../../env';
import { catchError, map, throwError } from 'rxjs';
import Search from '../../product/_shared/interfaces/Search';

@Injectable({
    providedIn: 'root',
})
export class SearchService {
    private SEARCH_URL = '/search';

    constructor(
        private httpClient: HttpClient,
        private userService: UserService
    ) {}

    getMySearches(status: SearchStatus) {
        const accessToken = this.userService.getAccessToken();
        const url = `${BASE_URL}${this.SEARCH_URL}?status=${status}`;
        const headers = new HttpHeaders().set('authorization', accessToken);
        return this.httpClient.get(url, { headers }).pipe(
            map((res) => {
                return res as Search[];
            }),
            catchError((err) => throwError(() => err))
        );
    }

    getSearchesInRadius(status: SearchStatus) {
        const accessToken = this.userService.getAccessToken();
        const url = `${BASE_URL}${this.SEARCH_URL}/radius`;
        const headers = new HttpHeaders().set('authorization', accessToken);
        return this.httpClient.get(url, { headers }).pipe(
            map((res) => {
                return res as Search[];
            }),
            catchError((err) => throwError(() => err))
        );
    }
}
