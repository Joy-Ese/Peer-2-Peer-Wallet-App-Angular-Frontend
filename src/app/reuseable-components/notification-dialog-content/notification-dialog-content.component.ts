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

  notificationMessage! : string;

  username! : string;
  acctDetails! : any[];
  lastThreeTxns!: any[];

  constructor(
    public dialogRef: MatDialogRef<NotificationDialogContentComponent>,
    private signalrService : SignalrService,
    private http: HttpClient,
    ) {}

  ngOnInit() {
    this.signalrService.startConnection();
    this.signalrService.onReceiveAlert((user, message) => {
      if (user === this.username) {
        // this.notificationCount++;
        alert(message);
        this.notificationMessage = message;
      }
    });


  }

  getUserDetails() {
    const headers = new HttpHeaders({
      "Content-Type": "application/json"
    });
    this.http.get<any>(`${this.baseUrl}/api/Dashboard/GetUserDetails`,
    {headers: headers})
    .subscribe({
      next: (res) => {
        this.username = res.username;
        this.acctDetails = res.accountDetails;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }




}
