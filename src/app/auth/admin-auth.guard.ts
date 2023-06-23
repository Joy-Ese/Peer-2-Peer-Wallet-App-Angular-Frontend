import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AdminAuthService } from './admin-auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {
  constructor(private permissions: Permissions, private adminAuthService: AdminAuthService, private router: Router){};

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    var canAdminLogIn = this.adminAuthService.isAdminAuthenticated();
    if (!canAdminLogIn) {
      this.router.navigate(['/adminlogin']);
    }
    return canAdminLogIn;
  }
}
