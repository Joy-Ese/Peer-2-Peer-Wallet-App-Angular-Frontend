import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-set-pin-dialog-content',
  templateUrl: './set-pin-dialog-content.component.html',
  styleUrls: ['./set-pin-dialog-content.component.css']
})
export class SetPinDialogContentComponent implements OnInit{

  baseUrl : string = "http://localhost:7236";

  createPinRespMsg = "";
  createPinStatus! : boolean;

  constructor(public dialogRef: MatDialogRef<SetPinDialogContentComponent>, private http: HttpClient) {}

  ngOnInit() {}

  onPinCreate(createPinData: [key: string]) {
    const headers = new HttpHeaders({
      "Content-Type": "application/json"
    });
    this.http.post<any>(`${this.baseUrl}/api/Auth/CreatePin`, createPinData, {headers: headers})
    .subscribe({
      next: (res) => {
        this.createPinRespMsg = res.message;
        this.createPinStatus = res.status;
        if (this.createPinStatus == true) {
          Swal.fire({
            text: this.createPinRespMsg,
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
