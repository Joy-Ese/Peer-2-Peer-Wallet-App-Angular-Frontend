import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SignalrService } from 'src/app/services/signalr.service';
import { DialogContentComponent } from '../dialog-content/dialog-content.component';

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

  admins: any[] = [];
  selectedAdmin: any = {};

  chats! : any[];

  constructor(
    public dialogRef: MatDialogRef<ChatDialogContentComponent>, 
    private http: HttpClient, 
    public dialog: MatDialog,
    private signalrService : SignalrService) {}

  ngOnInit() {
    this.getUserIsLoggedIn();
    this.getUserAdminChat();
    this.getUserDetails();
    this.signalrService.startConnection();
    this.signalrService.onUpdateUser(() => {
      this.getUserIsLoggedIn();
    });
    this.signalrService.onReceiveMessage(() => {
      this.getUserAdminChat();
    });


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
        this.readChat(this.username);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getUserIsLoggedIn() {
    const headers = new HttpHeaders({
      "Content-Type": "application/json"
    });
    this.http.get<any[]>(`${this.baseUrl}/api/Account/GetUserIsLoggedIn`, {headers: headers})
    .subscribe({
      next: (res) => {
        this.admins = res;
        this.randomlySelectAdmin();
        this.getUserAdminChat();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  randomlySelectAdmin() {
    if (this.admins.length > 0) {
      const randomIndex = Math.floor(Math.random() * this.admins.length);
      this.selectedAdmin = this.admins[randomIndex];
      console.log("Random admin ID:", this.selectedAdmin.id);
      console.log("Random admin Username:", this.selectedAdmin.username);
    }
  }

  getUserAdminChat() {
    const headers = new HttpHeaders({
      "Content-Type": "application/json"
    });
    const params = new URLSearchParams();
    params.append("user", this.selectedAdmin.username);

    this.http.get<any>(`${this.baseUrl}/api/Chat/GetChatsUser?${params}`, {headers: headers})
    .subscribe({
      next: (res) => {
        console.log(res);
        this.chats = res;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  readChat(uName: string) {
    const headers = new HttpHeaders({
      "Content-Type": "application/json"
    });

    const params = new URLSearchParams();
    params.append("userOrAdmin", "User");

    this.http.put(`${this.baseUrl}/api/Chat/ReadChat?${params}`, {username: uName}, {headers: headers})
    .subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  onSendMessage() {
    if (!this.username || !this.message || this.message.trim() == "") return;
    this.signalrService.hubConnection.invoke("SendMessage", this.username, this.message);
    this.message = "";
  }

  postSendMsg(msgData: [key: string]) {
    const headers = new HttpHeaders({
      "Content-Type": "application/json"
    });
    const params = new URLSearchParams();
    params.append("chattingWIth", this.selectedAdmin.username);

    this.http.post(`${this.baseUrl}/api/Chat/UserChat${params}`, msgData, {headers: headers})
    .subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }


}
