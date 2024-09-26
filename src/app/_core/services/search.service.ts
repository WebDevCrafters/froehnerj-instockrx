import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { SearchStatus } from '../../product/_shared/interfaces/SearchStatus';
import { catchError, map, Observable, of, throwError } from 'rxjs';
import Search from '../../product/_shared/interfaces/Search';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class SearchService {
    private SEARCH_URL = '/api/search';

    constructor(
        private httpClient: HttpClient,
        private userService: UserService
    ) {}

    addSearch(search: Search): Observable<Search> {
        const accessToken = this.userService.getAccessToken();
        const url = `${environment.BASE_URL}${this.SEARCH_URL}/add`;
        const headers = new HttpHeaders().set('authorization', accessToken);
        return this.httpClient.post(url, search, { headers }).pipe(
            map((res) => {
                return res as Search;
            }),
            catchError((err) => throwError(() => err))
        );
    }

    getMySearches(statusArr: SearchStatus[]) {
        const accessToken = this.userService.getAccessToken();
        const query = statusArr.map((status) => `status=${status}`).join('&');

        const url = `${environment.BASE_URL}${this.SEARCH_URL}?${query}`;
        const headers = new HttpHeaders().set('authorization', accessToken);
        return this.httpClient.get(url, { headers }).pipe(
            map((res) => {
                return res as Search[];
            }),
            catchError((err) => throwError(() => err))
        );
    }

    getSearch(searchId: string) {
        const accessToken = this.userService.getAccessToken();
        const url = `${environment.BASE_URL}${this.SEARCH_URL}/one/${searchId}`;
        const headers = new HttpHeaders().set('authorization', accessToken);
        return this.httpClient.get(url, { headers }).pipe(
            map((res) => {
                return res as Search;
            }),
            catchError((err) => throwError(() => err))
        );
    }

    getSearchesInRadius() {
        const accessToken = this.userService.getAccessToken();
        const url = `${environment.BASE_URL}${this.SEARCH_URL}/radius`;
        const headers = new HttpHeaders().set('authorization', accessToken);
        return this.httpClient.get(url, { headers }).pipe(
            map((res) => {
                return res as Search[];
            }),
            catchError((err) => {
                if (err.status === 404) return of([]);
                return throwError(() => err);
            })
        );
    }

    getMarkedByMeSearches() {
        const accessToken = this.userService.getAccessToken();
        const url = `${environment.BASE_URL}${this.SEARCH_URL}/marked`;
        const headers = new HttpHeaders().set('authorization', accessToken);
        return this.httpClient.get(url, { headers }).pipe(
            map((res) => {
                return res as Search[];
            }),
            catchError((err) => {
                if (err.status === 404) return of([]);
                return throwError(() => err);
            })
        );
    }

    updateSearch(search: Search): Observable<Search> {
        const accessToken = this.userService.getAccessToken();
        const url = `${environment.BASE_URL}${this.SEARCH_URL}/update`;
        const headers = new HttpHeaders().set('authorization', accessToken);
        return this.httpClient.post(url, search, { headers }).pipe(
            map((res) => {
                return res as Search;
            }),
            catchError((err) => throwError(() => err))
        );
    }

    markStatus(searchId: string, status: SearchStatus): Observable<Search> {
        const accessToken = this.userService.getAccessToken();
        const url = `${environment.BASE_URL}${this.SEARCH_URL}/update-status`;
        const headers = new HttpHeaders().set('authorization', accessToken);
        return this.httpClient
            .post(url, { searchId, status }, { headers })
            .pipe(
                map((res) => {
                    return res as Search;
                }),
                catchError((err) => throwError(() => err))
            );
    }
}
