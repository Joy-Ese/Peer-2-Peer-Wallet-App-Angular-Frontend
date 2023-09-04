import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { OutChatDialogContentComponent } from '../out-chat-dialog-content/out-chat-dialog-content.component';

@Component({
  selector: 'app-pre-out-chat-dialog-content',
  templateUrl: './pre-out-chat-dialog-content.component.html',
  styleUrls: ['./pre-out-chat-dialog-content.component.css']
})
export class PreOutChatDialogContentComponent implements OnInit{

  baseUrl : string = "http://localhost:7236";

  uName: string = "";

  showInputBox = false;

  responseMsg = "";
  status = false;

  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<PreOutChatDialogContentComponent>,
    private http: HttpClient,
  ) {}

  ngOnInit() {}

  generatePin(generatePinData: {[key: string] : string | boolean}) {
    const headers = new HttpHeaders({
      "Content-Type": "application/json"
    });
    this.http.post(`${this.baseUrl}/api/Chat/GenPinSendEmail`, generatePinData, {headers: headers})
    .subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  validatePin(validatePinData: {[key: string] : string | boolean}) {
    const headers = new HttpHeaders({
      "Content-Type": "application/json"
    });
    this.http.post(`${this.baseUrl}/api/Chat/ValidatePin`, validatePinData, {headers: headers})
    .subscribe({
      next: (res) => {
        console.log(res);
        if (res == true) {
          this.openOutChatDialog('600ms', '300ms', this.uName);
        }
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  openOutChatDialog(enterAnimationDuration: string, exitAnimationDuration: string, uName: string): void {
    this.dialog.open(OutChatDialogContentComponent, {
      data: uName,
      width: '800px',
      height: '500px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

}
