import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { UsersChatDialogContentComponent } from 'src/app/reuseable-components/users-chat-dialog-content/users-chat-dialog-content.component';
import { UserDataService } from 'src/app/services/user-data.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { trigger, state, style, transition, animate } from '@angular/animations';

class User {
  constructor(public username: string) {}
}

@Component({
  selector: 'app-find-contact-page',
  templateUrl: './find-contact-page.component.html',
  styleUrls: ['./find-contact-page.component.css']
})
export class FindContactPageComponent implements OnInit {

  baseUrl : string = "http://localhost:7236";

  displayedUsers: { firstName: string, lastName: string, userName: string, imageFromDb: string | null }[] = [];

  initChats!: any[];

  searchInfo! : string;
  firstName! : string;
  lastName! : string;
  userName! : string;
  imageFromDb! : any;
  status!: boolean;
  message!: string;

  searchText!: string;
  page: number = 1;
  count: number = 0;
  tableSize: number = 3;
  order!: string;
  reverse: boolean = false;

  constructor(
    private http: HttpClient, 
    public dialog: MatDialog,
    public userDataService: UserDataService,
    ) { }

  ngOnInit() {
    this.getInitChats();
  }

  searchContact(value: string) {
    const headers = new HttpHeaders({
      "Content-Type": "application/json"
    });

    const params = new URLSearchParams();
    params.append("searchInfo", value);

    this.http.post<any>(`${this.baseUrl}/api/Contact/GetSearchedContact?${params}`, {headers: headers})
    .subscribe({
      next: (res) => {
        console.log(res);
        this.status = res.status;
        this.message = res.message;
        if (this.status == false) {
          Swal.fire({
            text: this.message,
            confirmButtonColor: "#FF0033",
            showClass: {
              popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
              popup: 'animate__animated animate__fadeOutUp'
            }
          })
        }
        this.firstName = res.result.firstName;
        this.lastName = res.result.lastName;
        this.userName = res.result.userName;
        this.imageFromDb = "data:image/png;base64," + res.result.imageDetails;
        this.userDataService.addUser(res.result);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }


  setOrder(value: string) { 
    if (this.order === value) { 
      this.reverse = !this.reverse; 
    } 
    this.order = value; 
  }
  onTableDataChange(event: any) {
    this.page = event;
  }
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
  }


  initiateChatToDb() {
    const headers = new HttpHeaders({
      "Content-Type": "application/json"
    });

    const params = new URLSearchParams();
    params.append("chattingWith", this.userName);

    this.http.post<any>(`${this.baseUrl}/api/Chat/InitiateChats?${params}`, {headers: headers})
    .subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getInitChats() {
    const headers = new HttpHeaders({
      "Content-Type": "application/json"
    });
    this.http.get<any[]>(`${this.baseUrl}/api/Chat/GetInitiatedChats`,
    {headers: headers})
    .subscribe({
      next: (res) => {
        this.initChats = res;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  openUsersChatDialog(enterAnimationDuration: string, exitAnimationDuration: string, chattingWith: string): void {
    const dialogRef: MatDialogRef<UsersChatDialogContentComponent> = this.dialog.open(UsersChatDialogContentComponent, {
      data: chattingWith,
      width: '800px',
      height: '500px',
      enterAnimationDuration,
      exitAnimationDuration,
    });

    dialogRef.afterClosed().subscribe(() => {
      window.location.reload();
    });
  }

}
