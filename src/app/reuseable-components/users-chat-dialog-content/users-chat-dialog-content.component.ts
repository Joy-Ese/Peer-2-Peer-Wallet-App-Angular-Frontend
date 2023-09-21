import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { SignalrService } from 'src/app/services/signalr.service';
import { ChatTrnDialogContentComponent } from '../chat-trn-dialog-content/chat-trn-dialog-content.component';

@Component({
  selector: 'app-users-chat-dialog-content',
  templateUrl: './users-chat-dialog-content.component.html',
  styleUrls: ['./users-chat-dialog-content.component.css']
})
export class UsersChatDialogContentComponent implements OnInit{

  baseUrl : string = "http://localhost:7236";

  onlineStatus!: boolean;

  username!: string;

  messages: { userName: string, message: string }[] = [];
  message: string = "";

  usersChats! : any[];

  chattingWith!: any;

  currenc!: string;
  amoun!: number;

  chatCountData!: any[];

  constructor(
    private http: HttpClient, 
    private signalrService : SignalrService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<UsersChatDialogContentComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: MatDialogRef<UsersChatDialogContentComponent>) {
      this.chattingWith = data;
      console.log(this.chattingWith);
    }

  ngOnInit() {
    this.readUserChats();
    this.getUnreadChatCount();
    this.getOnlineStatus();
    this.getUserDetails();
    this.getUser2UserChats();
    this.signalrService.startConnection();
    this.signalrService.onUserRefreshChat((loggedInUser, userChattingWith) => {
      if (userChattingWith == this.chattingWith || loggedInUser == this.username) {
        this.getUser2UserChats();
      }
    });


    this.signalrService.hubConnection.on("User2UserReceiveMessage", (userName, message) => {
      this.messages.push({ userName, message });
      this.getUser2UserChats();
    });
  }


  readUserChats() {
    const headers = new HttpHeaders({
      "Content-Type": "application/json"
    });
    const params = new URLSearchParams();
    params.append("chattingWith", this.chattingWith);

    this.http.put<any>(`${this.baseUrl}/api/Chat/ReadUserChats?${params}`, {headers: headers})
    .subscribe({
      next: (res) => {
        console.log(res);
        this.getUnreadChatCount();
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  getUnreadChatCount() {
    const headers = new HttpHeaders({
      "Content-Type": "application/json"
    });
    this.http.get<any>(`${this.baseUrl}/api/Contact/GetUnreadChatCount`, {headers: headers})
    .subscribe({
      next: (res) => {
        console.log(res);
        this.chatCountData = res;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getOnlineStatus() {
    const headers = new HttpHeaders({
      "Content-Type": "application/json"
    });
    const params = new URLSearchParams();
    params.append("chattingWith", this.chattingWith);

    this.http.get<any>(`${this.baseUrl}/api/Contact/GetOnlineStatus?${params}`, {headers: headers})
    .subscribe({
      next: (res) => {
        console.log(res);
        this.onlineStatus = res;
      },
      error: (err) => {
        console.log(err);
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
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getUser2UserChats() {
    const headers = new HttpHeaders({
      "Content-Type": "application/json"
    });
    this.http.get<any[]>(`${this.baseUrl}/api/Chat/GetUser2UserChats`, {headers: headers})
    .subscribe({
      next: (res) => {
        this.usersChats = res;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  onSendMessage() {
    if (!this.username || !this.message || this.message.trim() == "") return;
    this.signalrService.hubConnection.invoke("User2UserSendMessage", this.username, this.message); 
    this.message = "";
    this.getUser2UserChats();
  }

  postSendMsg(msgData: [key: string]) {
    const headers = new HttpHeaders({
      "Content-Type": "application/json"
    });
    const params = new URLSearchParams();
    params.append("chattingWith", this.chattingWith); 

    this.http.post(`${this.baseUrl}/api/Chat/User2User?${params}`, msgData, {headers: headers})
    .subscribe({
      next: (res) => {
        this.getUser2UserChats();
      },
      error: (err) => {
        console.log(err);
      }
    });
  }


  handleMsg(event: any) {
    const transferPattern = /(^|\s)transfer\s+(\w+)\s+(\d+(\.\d{1,2})?)($|\s)/i;

    const trimmedMessage = this.message.trim();

    if (transferPattern.test(trimmedMessage)) {
      const parsedTransfer = this.extractTransferDetails(this.message);
      this.currenc = parsedTransfer.currency;
      this.amoun = parsedTransfer.amount;
      this.openUsersChatTrnDialog('600ms', '300ms');
    }
  }

  extractTransferDetails(text: string): { currency: string, amount: number } {
    const transferPattern = /(^|\s)transfer\s+(\w+)\s+(\d+(\.\d{1,2})?)($|\s)/i;
    const matches = text.match(transferPattern);
  
    if (matches) {
      return {
        currency: matches[2],
        amount: parseFloat(matches[3])
      };
    } else {
      return { currency: 'n/a', amount: 0 };
    }
  }


  openUsersChatTrnDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(ChatTrnDialogContentComponent, {
      data: {curr: this.currenc, amt: this.amoun, destAcctUser: this.chattingWith},
      width: '500px',
      height: '400px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

}
