import { Injectable } from '@angular/core';
import { User } from '../../_shared/dataTypes/User';
import { KEYS } from '../../_shared/constants/localStorageKeys';
import RestCalls from '../rest/RestCalls';
import { BASE_URL } from '../../../../env';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  isSignedIn: boolean = false;
  user: User | null = null;
  USER_URL = '/user';

  constructor() {}

  checkIfSignedIn(): boolean {
    if (typeof window !== 'undefined' && localStorage) {
      const isSignedIn = localStorage.getItem(KEYS.isSignedIn);
      this.isSignedIn = isSignedIn === 'true';
    }
    return this.isSignedIn;
  }

  async signIn(user: User) {
    const url = `${BASE_URL}${this.USER_URL}/signin`;
    const signinResult = await RestCalls.post(url, user);

    if (signinResult.status === 200) {
      this.storeUserData(signinResult.data);
      this.isSignedIn = true;
    }
  }

  async signUp(user: User) {
    const url = `${BASE_URL}${this.USER_URL}/signup`;
    const signupResult = await RestCalls.post(url, user);

    if (signupResult.status === 200) {
      this.storeUserData(signupResult.data);
      this.isSignedIn = true;
      return signupResult.data;
    }

    /**
      @todo: throw new error from here acc to error code
      @todo: handle error
     */

    return null;
  }

  signOut() {
    this.removeUserData();
    this.isSignedIn = false;
  }

  storeUserData(data: any) {
    localStorage.setItem(KEYS.isSignedIn, 'true');
    localStorage.setItem(KEYS.userData, JSON.stringify(data));
  }

  removeUserData() {
    localStorage.clear();
  }

  getUserData(): User | null {
    if (this.user) {
      return this.user;
    }
    const user = localStorage.getItem(KEYS.userData);
    if (!user) return null;
    const userObj = JSON.parse(user);
    this.user = userObj;
    return userObj;
  }
}
