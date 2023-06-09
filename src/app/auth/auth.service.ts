import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn : boolean = false;

  private userLoggedIn = new Subject<boolean>();

  constructor(private router: Router) { 
    this.userLoggedIn.next(false);
  }

  public getToken() {
    const getToken = localStorage.getItem("token");
    return getToken;
  }

  setUserLoggedIn(userLoggedIn: boolean) {
    this.userLoggedIn.next(userLoggedIn);
  }

  getUserLoggedIn(): Observable<boolean> {
    return this.userLoggedIn.asObservable();
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
