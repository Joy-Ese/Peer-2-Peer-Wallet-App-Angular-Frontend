import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn : boolean = false;

  constructor() { }

  public getToken() {
    const getToken = localStorage.getItem("token");
    return getToken;
  }

  isAuthenticated(){
    const token = localStorage.getItem("token");
    if (token != null) {
      this.isLoggedIn = true;
      return this.isLoggedIn;
    }
    return this.isLoggedIn;
  }
}
