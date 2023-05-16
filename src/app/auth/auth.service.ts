import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn : boolean = false;

  constructor(private router: Router) { }

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
    this.router.navigate(['/login']);
    return this.isLoggedIn;
  }

  logoutUser() {
    localStorage.removeItem("token");
    localStorage.removeItem("loginResponse");
    localStorage.removeItem("userDetails");
    localStorage.clear();
    this.router.navigate(['/login']);
    setTimeout(() => {
      window.location.reload();
    }, 300);
  }
}
