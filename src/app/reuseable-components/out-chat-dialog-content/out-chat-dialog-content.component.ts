import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, ElementRef, HostListener, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SignalrService } from 'src/app/services/signalr.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-out-chat-dialog-content',
  templateUrl: './out-chat-dialog-content.component.html',
  styleUrls: ['./out-chat-dialog-content.component.css']
})
export class OutChatDialogContentComponent implements OnInit{
  @ViewChild('chatContainer') chatContainer!: ElementRef;

  baseUrl : string = "http://localhost:7236";

  outAppUser!: any;

  messages: { userName: string, message: string }[] = [];
  message: string = "";

  admins: any[] = [];
  selectedAdmin: any = {};

  chats! : any[];
  chatsPg! : any[];

  isLoadingMore = false;
  page = 1;
  pageSize = 3;

  constructor(
    public dialogRef: MatDialogRef<OutChatDialogContentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: MatDialogRef<OutChatDialogContentComponent>,
    private http: HttpClient,
    private signalrService : SignalrService,
    private router: Router,
  ) {
    this.outAppUser = data;
    console.log(this.outAppUser);
  }

  ngOnInit() {
    this.getUserIsLoggedIn();
    this.signalrService.startConnection();
    this.signalrService.onUpdateUser(() => {
      this.getUserIsLoggedIn();
    });
    this.signalrService.hubConnection.on("ReceiveMessage", (userName, message) => {
      this.messages.push({ userName, message });
    });
  }

  randomlySelectAdmin() {
    if (this.admins.length > 0) {
      const randomIndex = Math.floor(Math.random() * this.admins.length);
      this.selectedAdmin = this.admins[randomIndex];
    }
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
        this.getOutChatsUser();
        // this.getOutChatsUserPag(this.page, this.pageSize);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getOutChatsUser() {
    const headers = new HttpHeaders({
      "Content-Type": "application/json"
    });
    const params = new URLSearchParams();
    params.append("admin", this.selectedAdmin.username);
    params.append("uName", this.outAppUser);
    this.http.get<any>(`${this.baseUrl}/api/Chat/GetOutChatsUser?${params}&${params}`, {headers: headers})
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

  onSendMessage() {
    if (!this.outAppUser || !this.message || this.message.trim() == "") return;
    this.signalrService.hubConnection.invoke("SendMessage", this.outAppUser, this.message);
    this.message = "";
  }

  postSendMsg(msgData: [key: string]) {
    const headers = new HttpHeaders({
      "Content-Type": "application/json"
    });
    const params = new URLSearchParams();
    params.append("outAppUser", this.outAppUser);

    this.http.post(`${this.baseUrl}/api/Chat/UserOutChat?${params}`, msgData, {headers: headers})
    .subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  // getOutChatsUserPag(page: number, pageSize: number) {
  //   const headers = new HttpHeaders({
  //     'Content-Type': 'application/json'
  //   });

  //   const params = new HttpParams()
  //   .set('admin', this.selectedAdmin.username)
  //   .set('uName', this.outAppUser)
  //   .set('page', page.toString())
  //   .set('pageSize', pageSize.toString());

  //   this.http.get<any>(`${this.baseUrl}/api/Chat/GetOutChatsUserPag`, {headers: headers, params: params})
  //   .subscribe({
  //     next: (res) => {
  //       console.log(res);
  //       this.chatsPg = res;
  //     },
  //     error: (err) => {
  //       console.log(err);
  //     }
  //   });
  // }


  // @HostListener('scroll', ['$event'])
  // onScroll(event: Event) {
  //   const scrollContainer = event.target as HTMLElement;
  //   if (scrollContainer.scrollTop === 0 && !this.isLoadingMore) {
  //     this.isLoadingMore = true;
  //     this.loadMoreChatMessages();
  //   }
  // }

  // loadMoreChatMessages() {
  //   if (!this.isLoadingMore) {
  //     this.isLoadingMore = true;
  //     this.page++;
  //     this.getOutChatsUserPag(this.page, this.pageSize);
  //   }
  // }










  endChatConn() {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#003366',
      cancelButtonColor: '#FF0033',
      confirmButtonText: 'Yes!'
    }).then((result) => {
      if (result.isConfirmed) {
        setTimeout(() => {
          window.location.reload();
        }, 50);
        this.router.navigate(['/contactadmin']);
      }
    })
  }


}
