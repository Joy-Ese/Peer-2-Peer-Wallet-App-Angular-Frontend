import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { SignalrService } from 'src/app/services/signalr.service';

@Component({
  selector: 'app-chat-dialog-content',
  templateUrl: './chat-dialog-content.component.html',
  styleUrls: ['./chat-dialog-content.component.css']
})
export class ChatDialogContentComponent implements OnInit{

  baseUrl : string = "http://localhost:7236";

  username!: string;

  messages: { userName: string, message: string }[] = [];
  message: string = "";

  constructor(
    public dialogRef: MatDialogRef<ChatDialogContentComponent>, 
    private http: HttpClient, 
    private signalrService : SignalrService) {}

  ngOnInit() {
    this.signalrService.startConnection();
    this.getUserDetails();

    this.signalrService.hubConnection.on("ReceiveMessage", (userName, message) => {
      this.messages.push({ userName, message });
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
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  onSendMessage() {
    if (!this.username || !this.message || this.message.trim() == "") return;
    this.signalrService.hubConnection.invoke("SendMessage", this.username, this.message);
    this.message = "";
  }


}
