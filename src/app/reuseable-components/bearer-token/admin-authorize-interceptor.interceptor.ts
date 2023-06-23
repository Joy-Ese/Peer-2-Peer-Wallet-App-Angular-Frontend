import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { SnackBarComponent } from '../snack-bar/snack-bar.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class AdminAuthorizeInterceptorInterceptor implements HttpInterceptor {

  constructor(private router: Router, private matSnackBar: MatSnackBar) {}

  passDataToSnackComponent() {
    this.matSnackBar.openFromComponent(SnackBarComponent, {
      data: `Hi Admin, You now have unauthorized access!`,
      duration: 5000,
      panelClass: ["snack-notification"],
      horizontalPosition: "center",
      verticalPosition: "top",
    })
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      tap({
      next: (event) => {
        if (event instanceof HttpResponse) {
          if(event.status == 401) {
            this.passDataToSnackComponent();
          }
        }
        return event;
      },
      error: (error) => {
        if(error.status === 401) {
          this.passDataToSnackComponent();
          setTimeout(() => {this.router.navigate(['/adminlogin'])}, 4000);
        }
        else if(error.status === 404) {
          this.router.navigate(['/notfound']);
        }
      }
    }));
  }
}
