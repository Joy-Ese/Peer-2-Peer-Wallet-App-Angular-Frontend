import { Injectable, OnInit } from '@angular/core';
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
import { UserInformation } from '../userInformation';
import { SignalrService } from 'src/app/services/signalr.service';

@Injectable()
export class AuthorizeInterceptorInterceptor implements HttpInterceptor, OnInit{

  userDetails! : any;

  constructor(private router: Router, private matSnackBar: MatSnackBar, private signalrService : SignalrService,) {}

  ngOnInit() {
    this.userDetails = UserInformation();
  }

  passDataToSnackComponent() {
    this.matSnackBar.openFromComponent(SnackBarComponent, {
      data: `Hi ${this.userDetails.firstName}, You now have unauthorized access!`,
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
          var userId = localStorage.getItem("userId");
          this.signalrService.hubConnection.invoke("OnLogOut", userId);
          this.passDataToSnackComponent();
          setTimeout(() => {this.router.navigate(['/login'])}, 4000);
          localStorage.clear();
        }
        else if(error.status === 404) {
          this.router.navigate(['/notfound']);
        }
      }
    }));
  }
}
