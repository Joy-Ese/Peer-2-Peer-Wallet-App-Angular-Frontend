import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatDialog } from '@angular/material/dialog';
import { UserDetailResponseFromBackEnd } from 'src/app/models/response-from-backend/userdetails-response';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LogoutDialogContentComponent } from 'src/app/reuseable-components/logout-dialog-content/logout-dialog-content.component';
import { BnNgIdleService } from 'bn-ng-idle';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarComponent } from 'src/app/reuseable-components/snack-bar/snack-bar.component';
import { NotificationDialogContentComponent } from 'src/app/reuseable-components/notification-dialog-content/notification-dialog-content.component';
import { SetPinDialogContentComponent } from 'src/app/reuseable-components/set-pin-dialog-content/set-pin-dialog-content.component';
import { SetSecquestDialogContentComponent } from 'src/app/reuseable-components/set-secquest-dialog-content/set-secquest-dialog-content.component';
import { SignalrService } from 'src/app/services/signalr.service';
import { ChatDialogContentComponent } from 'src/app/reuseable-components/chat-dialog-content/chat-dialog-content.component';


@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.css']
})
export class DashboardPageComponent implements OnInit {

  baseUrl : string = "http://localhost:7236";

  // users: Array<userLoggedIn> = new Array<userLoggedIn>(); if is UserLocked == true throw user out of the application

  userDetailResponseFromBackEnd! : UserDetailResponseFromBackEnd;

  imageFromDb! : any;

  username! : string;
  sourceAcct! : string;

  userHavePin! : boolean;
  userHaveSecAns! : boolean;
  userHaveImage! : boolean;
  isUserLoggedIn! : boolean;

  noOfNotifications : number = 0;

  @ViewChild(MatSidenav) sidenav!: MatSidenav;

  constructor(
    private observer: BreakpointObserver, 
    private http: HttpClient, 
    public dialog: MatDialog, 
    private bnIdle: BnNgIdleService,
    private router: Router,
    public authService: AuthService,
    private matSnackBar: MatSnackBar,
    private signalrService : SignalrService,
    ) { }

  ngOnInit(){
    this.getUsername();
    this.getUserImage();
    this.doesUserHavePin();
    this.doesUserHaveSecurityAns();
    this.doesUserHaveImage();
    this.signalrService.startConnection();
    this.signalrService.onReceiveAlert((user, message) => {
      if (user === this.username) {
        Swal.fire({
          position: 'top-end',
          icon: 'info',
          title: `${message}`,
          showConfirmButton: false,
          timer: 8000
        })
      }
    });
    this.signalrService.onUpdateNotifications((user) => {
      if (user === this.username) {
        this.noOfNotifications--;
      }
    });
    this.bnIdle.startWatching(1500).subscribe((res) => {
      if (res) {
        var userId = localStorage.getItem("userId"); 
        this.signalrService.hubConnection.invoke("OnLogOut", userId);
        this.passDataToSnackComponent();
        this.router.navigate(['/login']);
        localStorage.clear();
        this.bnIdle.stopTimer();
      }
    });
    this.getNotificationCount();
    this.getUserLogInStatus();
  }

  // checkTokenValidity(token: string) {
  //   const expiryTime = (JSON.parse(window.atob(token.split('.')[1]))).exp;
  //   return (Math.floor((new Date).getTime() / 1000)) >= expiryTime;
  // }

  passDataToSnackComponentAutoLogOut() {
    this.matSnackBar.openFromComponent(SnackBarComponent, {
      data: "You have been logged out!! Contact Admin!",
      duration: 5000,
      panelClass: ["snack-notification"],
      horizontalPosition: "center",
      verticalPosition: "top",
    })
  }

  getUserLogInStatus() {
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
    });
    this.http.get<any>(`${this.baseUrl}/api/Account/IsUserLoggedIn`, {headers: headers})
    .subscribe({
      next: (res) => {
        this.isUserLoggedIn = res;
        if (this.isUserLoggedIn == false) {
          this.passDataToSnackComponentAutoLogOut();
          this.router.navigate(['/login']);
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getNotificationCount() {
    const headers = new HttpHeaders({
      "Content-Type": "application/json"
    });
    this.http.get<any>(`${this.baseUrl}/api/Notification/GetAllUnreadNotificationsNo`, {headers: headers})
    .subscribe({
      next: (res) => {
        this.noOfNotifications = res.allNotifications;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  doesUserHaveImage() {
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
    });
    this.http.get<any>(`${this.baseUrl}/api/Dashboard/DoesUserHaveImage`, {headers: headers})
    .subscribe({
      next: (res) => {
        this.userHaveImage = res;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  doesUserHavePin() {
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
    });
    this.http.get<any>(`${this.baseUrl}/api/Dashboard/GetUserPin`, {headers: headers})
    .subscribe({
      next: (res) => {
        this.userHavePin = res;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  doesUserHaveSecurityAns() {
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
    });
    this.http.get<any>(`${this.baseUrl}/api/Dashboard/GetUserSecurityAnswer`, {headers: headers})
    .subscribe({
      next: (res) => {
        this.userHaveSecAns = res;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  passDataToSnackComponent() {
    this.matSnackBar.openFromComponent(SnackBarComponent, {
      data: `You have been idle!!! You were automatically logged out`,
      duration: 5000,
      panelClass: ["snack-notification"],
      horizontalPosition: "center",
      verticalPosition: "top",
    })
  }

  getUsername() {
    const headers = new HttpHeaders({
      "Content-Type": "application/json"
    });
    this.http.get(`${this.baseUrl}/api/Dashboard/GetUserDetails`, {headers: headers})
    .subscribe({
      next: (res) => {
        this.userDetailResponseFromBackEnd = res as UserDetailResponseFromBackEnd;
        this.username = this.userDetailResponseFromBackEnd.username;
        this.sourceAcct = this.userDetailResponseFromBackEnd.accountNumber;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getUserImage() {
    const headers = new HttpHeaders({
      "Content-Type": "application/json"
    });
    this.http.get<any>(`${this.baseUrl}/api/Dashboard/GetUserImage`, {headers: headers})
    .subscribe({
      next: (res) => {
        this.imageFromDb ="data:image/png;base64," + res.imageDetails;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  ngAfterViewInit() {
    this.observer.observe(['(max-width: 800px)']).subscribe((res) => {
      if (res.matches) {
        this.sidenav.mode = 'over';
        this.sidenav.close();
      } else {
        this.sidenav.mode = 'side';
        this.sidenav.open();
      }
    });
  }

  openLogoutDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(LogoutDialogContentComponent, {
      width: '600px',
      height: '300px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

  openNotifyDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(NotificationDialogContentComponent, {
      width: '700px',
      height: '350px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

  openSetPinDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(SetPinDialogContentComponent, {
      width: '600px',
      height: '300px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

  openSetSecQuestDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(SetSecquestDialogContentComponent, {
      width: '600px',
      height: '350px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

  openChatDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(ChatDialogContentComponent, {
      width: '800px',
      height: '500px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

}
