import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notification-page',
  templateUrl: './notification-page.component.html',
  styleUrls: ['./notification-page.component.css']
})
export class NotificationPageComponent implements OnInit{

  baseUrl : string = "http://localhost:7236";

  notificationDetails! : any[];

  page: number = 1;
  count: number = 0;
  notiSize: number = 4;

  openEnvelope: boolean = false;

  constructor(
    private http: HttpClient,
  ) {}

  ngOnInit() {
    this.getAllNotifications();
  }

  getAllNotifications() {
    const headers = new HttpHeaders({
      "Content-Type": "application/json"
    });
    this.http.get<any[]>(`${this.baseUrl}/api/Notification/GetAllNotifications`, {headers: headers})
    .subscribe({
      next: (res) => {
        this.notificationDetails = res;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  onTableDataChange(event: any) {
    this.page = event;
  }
  onTableSizeChange(event: any): void {
    this.notiSize = event.target.value;
    this.page = 1;
  }

  SetNotificationsToRead(id: [key: number]) {
    this.openEnvelope = !this.openEnvelope;
    const headers = new HttpHeaders({
      "Content-Type": "application/json"
    });
    this.http.put(`${this.baseUrl}/api/Notification/SetNotificationsToRead`, {id: id}, {headers: headers})
    .subscribe({
      next: (res) => {
        console.log(res);
        setTimeout(() => {
          window.location.reload();
        }, 3500);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

}
