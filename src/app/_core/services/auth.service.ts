import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isSignedIn: boolean = false;

  constructor() {

  }

  checkIfSignedIn(): boolean {
    if (typeof window !== 'undefined' && localStorage) {
      const isSignedIn = localStorage.getItem("isSignedIn");
      this.isSignedIn = isSignedIn === "true";
    }
    return false;
  }

  signIn() {
    localStorage.setItem("isSignedIn", "true");
    this.isSignedIn = true;
  }

  signOut() {
    localStorage.setItem("isSignedIn", "false");
    this.isSignedIn = false;
  }
}
