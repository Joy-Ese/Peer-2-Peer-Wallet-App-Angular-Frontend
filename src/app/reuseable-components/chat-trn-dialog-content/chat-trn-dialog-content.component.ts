import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-chat-trn-dialog-content',
  templateUrl: './chat-trn-dialog-content.component.html',
  styleUrls: ['./chat-trn-dialog-content.component.css']
})
export class ChatTrnDialogContentComponent implements OnInit{

  baseUrl : string = "http://localhost:7236";

  chatTrn!: any;

  sourceAccountVal!: string;
  destinationAccountVal!: string;

  responseMsg = "";
  status = false;

  constructor(
    private http: HttpClient, 
    public dialogRef: MatDialogRef<ChatTrnDialogContentComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: MatDialogRef<ChatTrnDialogContentComponent>) {
      this.chatTrn = data;
      console.log(this.chatTrn);
    }

  ngOnInit() {
    this.getChatTrnAcctNums();
  }

  getChatTrnAcctNums() {
    const headers = new HttpHeaders({
      "Content-Type": "application/json"
    });
    
    const params = new URLSearchParams();
    params.append("currency", this.chatTrn.curr);
    params.append("destAcctUser", this.chatTrn.destAcctUser);

    this.http.get<any>(`${this.baseUrl}/api/Contact/GetChatTrnAcctNums?${params}`, {headers: headers})
    .subscribe({
      next: (res) => {
        console.log(res);
        this.sourceAccountVal = res.sourceAccount;
        this.destinationAccountVal = res.destinationAccount;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  createTransfer(transferData: {[key: string] : string | number}) {
    const headers = new HttpHeaders({
      "Content-Type": "application/json"
    });
    this.http.post<any>(`${this.baseUrl}/api/Transaction/CreateTransfer`, transferData, {headers: headers})
    .subscribe({
      next: (res) => {
        console.log(res);
        this.responseMsg = res.responseMessage;
        this.status = res.status;
        if (this.status == true) {
          Swal.fire({
            text: this.responseMsg,
            confirmButtonColor: "#003366",
            showClass: {
              popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
              popup: 'animate__animated animate__fadeOutUp'
            }
          })
        }
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

}
