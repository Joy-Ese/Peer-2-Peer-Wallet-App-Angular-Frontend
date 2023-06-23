import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthService {

  isAdminLoggedIn : boolean = false;

  private adminUserLoggedIn = new Subject<boolean>();

  constructor(private router: Router) { 
    this.adminUserLoggedIn.next(false);
  }

  public getAdminToken() {
    const getAdminToken = localStorage.getItem("adminToken");
    return getAdminToken;
  }

  setAdminUserLoggedIn(adminUserLoggedIn: boolean) {
    this.adminUserLoggedIn.next(adminUserLoggedIn);
  }

  getAdminUserLoggedIn(): Observable<boolean> {
    return this.adminUserLoggedIn.asObservable();
  }

  isAdminAuthenticated(){
    const admintoken = localStorage.getItem("adminToken");
    if (admintoken != null) {
      this.isAdminLoggedIn = true;
      return this.isAdminLoggedIn;
    }
    this.router.navigate(['/adminlogin']);
    return this.isAdminLoggedIn;
  }

  logoutAdminUser() {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminLoginResponse");
    localStorage.clear();
    this.router.navigate(['/adminlogin']);
    setTimeout(() => {
      window.location.reload();
    }, 300);
  }
}
