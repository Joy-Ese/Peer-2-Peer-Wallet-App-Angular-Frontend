import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserInformation } from '../userInformation';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-content',
  templateUrl: './dialog-content.component.html',
  styleUrls: ['./dialog-content.component.css']
})
export class DialogContentComponent implements OnInit{

  baseUrl : string = "http://localhost:7236";

  userDetails! : any;
  accInfo! : any;

  responseMsg = "";
  status = false;

  constructor(private http: HttpClient, public dialogRef: MatDialogRef<DialogContentComponent>, @Inject(MAT_DIALOG_DATA) public data: MatDialogRef<DialogContentComponent>) {
    this.accInfo = data
  }

  ngOnInit() {
    this.userDetails = UserInformation();
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
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
}