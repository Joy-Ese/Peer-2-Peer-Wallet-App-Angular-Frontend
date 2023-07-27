import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { SignalrService } from 'src/app/services/signalr.service';


@Component({
  selector: 'app-notification-dialog-content',
  templateUrl: './notification-dialog-content.component.html',
  styleUrls: ['./notification-dialog-content.component.css']
})
export class NotificationDialogContentComponent implements OnInit{

  baseUrl : string = "http://localhost:7236";

  username! : string;
  acctDetails! : any[];

  notificationDetails! : any[];

  noOfNotifications : number = 0;

  constructor(
    public dialogRef: MatDialogRef<NotificationDialogContentComponent>,
    private signalrService : SignalrService,
    private http: HttpClient,
  ) {}

  ngOnInit() {
    this.getUnreadNotifications();
    this.getNotificationCount();
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

  getUnreadNotifications() {
    const headers = new HttpHeaders({
      "Content-Type": "application/json"
    });
    this.http.get<any[]>(`${this.baseUrl}/api/Notification/GetAllUnreadNotifications`, {headers: headers})
    .subscribe({
      next: (res) => {
        this.notificationDetails = res;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  reloadPage() {
    setTimeout(() => {
      window.location.reload();
    }, 500);
  }

  SetNotificationsToRead(id: [key: number]) {
    const headers = new HttpHeaders({
      "Content-Type": "application/json"
    });
    this.http.put(`${this.baseUrl}/api/Notification/SetNotificationsToRead`, {id: id}, {headers: headers})
    .subscribe({
      next: (res) => {
        console.log(res);
        this.getUnreadNotifications();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }




}
