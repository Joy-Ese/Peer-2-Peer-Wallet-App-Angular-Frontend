import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-set-secquest-dialog-content',
  templateUrl: './set-secquest-dialog-content.component.html',
  styleUrls: ['./set-secquest-dialog-content.component.css']
})
export class SetSecquestDialogContentComponent implements OnInit{

  baseUrl : string = "http://localhost:7236";

  secQuestRespMsg = "";
  secQuestStatus! : boolean;

  constructor(public dialogRef: MatDialogRef<SetSecquestDialogContentComponent>, private http: HttpClient) {}

  ngOnInit() {}

  setSecQuest(setSecQuestData: [key: string]) {
    const headers = new HttpHeaders({
      "Content-Type": "application/json"
    });
    this.http.post<any>(`${this.baseUrl}/api/Dashboard/SetSecurityQuestion`, setSecQuestData, {headers: headers})
    .subscribe({
      next: (res) => {
        this.secQuestRespMsg = res.message;
        this.secQuestStatus = res.status;
        if (this.secQuestStatus == true) {
          Swal.fire({
            text: this.secQuestRespMsg,
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
        }, 500);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

}
