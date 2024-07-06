import { Injectable } from '@angular/core';
import { User } from '../../_shared/dataTypes/User';
import { KEYS } from '../../_shared/constants/localStorageKeys';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isSignedIn: boolean = false;

  constructor() {}

  checkIfSignedIn(): boolean {
    if (typeof window !== 'undefined' && localStorage) {
      const isSignedIn = localStorage.getItem(KEYS.isSignedIn);
      this.isSignedIn = isSignedIn === 'true';
    }
    return this.isSignedIn;
  }

  signIn(user: User) {
    this.storeUserData(user);
    this.isSignedIn = true;
  }

  signUp(user: User) {
    this.storeUserData(user);
    this.isSignedIn = true;
  }

  signOut() {
    this.removeUserData();
    this.isSignedIn = false;
  }

  storeUserData(user: User) {
    localStorage.setItem(KEYS.isSignedIn, 'true');
    localStorage.setItem(KEYS.userData, JSON.stringify(user));
  }

  removeUserData() {
    localStorage.clear();
  }

  getUserData(): User | null {
    const user = localStorage.getItem(KEYS.userData);
    if (!user) return null;

    return JSON.parse(user);
  }
}
