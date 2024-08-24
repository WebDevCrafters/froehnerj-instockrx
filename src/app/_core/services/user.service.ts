import { Inject, Injectable } from '@angular/core';
import { User } from '../../product/_shared/interfaces/User';
import { KEYS } from '../../_shared/constants/localStorageKeys';
import { BASE_URL } from '../../../../env';
import { AuthResponse } from '../../product/_shared/interfaces/AuthResponse';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, of, throwError } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    isSignedIn: boolean = false;
    userData: AuthResponse | null = null;
    USER_URL = '/user';
    accessToken: string = '';
    constructor(private httpClient: HttpClient) {}

    checkIfSignedIn(): boolean {
        if (typeof window !== 'undefined' && localStorage) {
            const isSignedIn = localStorage.getItem(KEYS.isSignedIn);
            this.isSignedIn = isSignedIn === 'true';
        }
        return this.isSignedIn;
    }

    signIn(user: User) {
        const url = `${BASE_URL}${this.USER_URL}/signin`;
        return this.httpClient.post(url, user).pipe(
            map((result) => {
                let signinResult = result as AuthResponse;
                this.setUser(signinResult);
                return signinResult;
            }),
            catchError((error: HttpErrorResponse) => {
                return throwError(() => error);
            })
        );
    }

    signUp(user: User) {
        const url = `${BASE_URL}${this.USER_URL}/signup`;
        return this.httpClient.post(url, user).pipe(
            map((result) => {
                let signupResult = result as AuthResponse;
                this.setUser(signupResult);
                return signupResult;
            }),
            catchError((error: HttpErrorResponse) => {
                return throwError(() => error);
            })
        );
    }

    getUserData(): AuthResponse | null {
        if (this.userData) {
            return this.userData;
        }
        const user = localStorage.getItem(KEYS.userData);
        if (!user) return null;
        const userObj: AuthResponse = JSON.parse(user);
        this.userData = userObj;
        return userObj;
    }

    getAccessToken(): string {
        if (this.accessToken) {
            return this.accessToken;
        }

        let authResponse = this.getUserData();
        this.accessToken = authResponse?.accessToken || '';
        return authResponse?.accessToken || '';
    }

    signOut() {
        this.accessToken = '';
        this.userData = null;
        this.isSignedIn = false;
        this.removeUserData();
    }

    private removeUserData() {
        localStorage.clear();
    }

    private setUser(response: AuthResponse) {
        this.accessToken = response.accessToken;
        this.userData = response;
        this.storeUserData(response);
        this.isSignedIn = true;
    }

    private storeUserData(data: any) {
        localStorage.setItem(KEYS.isSignedIn, 'true');
        localStorage.setItem(KEYS.userData, JSON.stringify(data));
    }
}
