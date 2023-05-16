import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver } from '@angular/cdk/layout';
import {MatDialog} from '@angular/material/dialog';
import { UserDetailResponseFromBackEnd } from 'src/app/models/response-from-backend/userdetails-response';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LogoutDialogContentComponent } from 'src/app/reuseable-components/logout-dialog-content/logout-dialog-content.component';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.css']
})
export class DashboardPageComponent implements OnInit {

  baseUrl : string = "http://localhost:7236";

  userDetailResponseFromBackEnd! : UserDetailResponseFromBackEnd;

  imageFromDb! : any;

  username! : string;
  sourceAcct! : string;

  @ViewChild(MatSidenav) sidenav!: MatSidenav;

  constructor(private observer: BreakpointObserver, private http: HttpClient, public dialog: MatDialog, ) {}

  ngOnInit(){
    this.getUsername();
    this.getUserImage();
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
}
