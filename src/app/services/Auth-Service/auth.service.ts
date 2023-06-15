import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  tokenKey: string = 'token';
  isLoggedIn = new BehaviorSubject<boolean>(false);
  constructor() {}

  setToken(token: string) {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken() {
    return localStorage.getItem(this.tokenKey);
  }

  clearToken() {
    localStorage.removeItem(this.tokenKey);
  }
  
  isLoginSuccess(): boolean {
    return !!this.getToken();
  }
  getTokens() {
    return localStorage.getItem('token');
  }
  getRole() {
    let token = this.getTokens()!;
    if (token) {
      let JwtData = token?.split('.')[1];

      let decodedJWT = JSON.parse(window.atob(JwtData));
      return decodedJWT.Role;
    }
  }
  getUsername() {
    let token = this.getTokens()!;
    if (token) {
      let JwtData = token?.split('.')[1];
      let decodedJWT = JSON.parse(window.atob(JwtData));
      return decodedJWT.Username;
    }
  }


}
