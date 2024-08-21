import { Injectable } from '@angular/core';
import { User } from '../../_shared/dataTypes/User';
import { KEYS } from '../../_shared/constants/localStorageKeys';
import RestCalls from '../rest/RestCalls';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  isSignedIn: boolean = false;
  user: User | null = null;

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

  async signUp(user: User) {
    // const signupResult = await RestCalls.post()
    // this.storeUserData(user);
    // this.isSignedIn = true;
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
    if(this.user){
      return this.user;
    }
    const user = localStorage.getItem(KEYS.userData);
    if (!user) return null;
    const userObj = JSON.parse(user);
    this.user = userObj;
    return userObj;
  }
}
