import { Inject, Injectable } from '@angular/core';
import { User } from '../../product/_shared/interfaces/User';
import { KEYS } from '../../_shared/constants/localStorageKeys';
import { API_URL } from '../../../../env';
import { AuthResponse } from '../../product/_shared/interfaces/AuthResponse';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, map, of, throwError } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    private isSignedIn: boolean = false;
    private userData: AuthResponse | null = null;
    private USER_URL = '/user';
    private accessToken: string = '';
    constructor(private httpClient: HttpClient) { }

    checkIfSignedIn(): boolean {
        if (typeof window !== 'undefined' && localStorage) {
            const isSignedIn = localStorage.getItem(KEYS.isSignedIn);
            this.isSignedIn = isSignedIn === 'true';
        }
        return this.isSignedIn;
    }

    signIn(user: User) {
        const url = `${API_URL}${this.USER_URL}/signin`;
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
        const url = `${API_URL}${this.USER_URL}/signup`;
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

    updateProfile(user: User) {
        const accessToken = this.getAccessToken();
        const url = `${API_URL}${this.USER_URL}/update`;
        const headers = new HttpHeaders().set('authorization', accessToken);
        return this.httpClient.put(url, user, { headers }).pipe(
            map((res) => {
                return res as User;
            }),
            catchError((err) => throwError(() => err))
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

    setUserData(user: User): void {
        let accessToken = this.getAccessToken();
        this.userData = {
            accessToken: accessToken,
            user: user
        };
        localStorage.setItem(KEYS.userData, JSON.stringify(this.userData));
    }

    getUser(userId: string) {
        const accessToken = this.getAccessToken();
        const url = `${API_URL}${this.USER_URL}/${userId}`;
        const headers = new HttpHeaders().set('authorization', accessToken);
        return this.httpClient.get(url, { headers }).pipe(
            map((res) => {
                return res as User;
            }),
            catchError((err) => {
                if (err.status === 404) return of(null);
                return throwError(() => err);
            })
        );
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
