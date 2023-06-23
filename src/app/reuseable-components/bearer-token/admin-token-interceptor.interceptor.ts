import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AdminAuthService } from 'src/app/auth/admin-auth.service';

@Injectable()
export class AdminTokenInterceptorInterceptor implements HttpInterceptor {

  constructor(private adminAuthService: AdminAuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    request = request.clone({  
      setHeaders: {  
        Authorization: `Bearer ${this.adminAuthService.getAdminToken()}`  
      }  
    });

    return next.handle(request);
  }
}
