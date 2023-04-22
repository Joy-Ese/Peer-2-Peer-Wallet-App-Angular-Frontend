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
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarComponent } from 'src/app/reuseable-components/snack-bar/snack-bar.component';

@Injectable()
export class AuthorizeInterceptorInterceptor implements HttpInterceptor {

  constructor(private router: Router, private matSnackBar: MatSnackBar) {}

  passDataToSnackComponent() {
    this.matSnackBar.openFromComponent(SnackBarComponent, {
      data: `Hi {NAME}, You now have unauthorized access!`,
      duration: 5000,
      panelClass: ["snack-notification"],
      horizontalPosition: "center",
      verticalPosition: "top",
    })
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler,): Observable<HttpEvent<unknown>> {
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
          setTimeout(() => {this.router.navigate(['/login'])}, 4000);
        }
        else if(error.status === 404) {
          this.router.navigate(['/login']);
        }
      }
    }));
  }
}
