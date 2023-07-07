import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import Swal from 'sweetalert2/dist/sweetalert2.js';


@Component({
  selector: 'app-gen-stmnt-dialog-content',
  templateUrl: './gen-stmnt-dialog-content.component.html',
  styleUrls: ['./gen-stmnt-dialog-content.component.css']
})
export class GenStmntDialogContentComponent implements OnInit{

  baseUrl : string = "http://localhost:7236";

  accountCurrency!: string;

  responseMsg = "";
  status! : boolean;

  currencies!: any[];

  constructor(private http: HttpClient, public dialogRef: MatDialogRef<GenStmntDialogContentComponent>, ) {}

  ngOnInit() {
    this.getCurrenciesUserHas();
  }

  getPDFStatement(forPDFData: [key: string]) {
    const headers = new HttpHeaders({
      "Content-Type": "application/json"
    });
    this.http.post<any>(`${this.baseUrl}/api/Transaction/GeneratePDFStatement`, forPDFData, {headers: headers})
    .subscribe({
      next: (res) => {
        this.responseMsg = res.message;
        this.status = res.status;
        if (this.status != true) {
          Swal.fire({
            text: this.responseMsg,
            confirmButtonColor: "#FF0033",
            showClass: {
              popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
              popup: 'animate__animated animate__fadeOutUp'
            }
          })
        } 
        else {
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
      },
      error: (err) => {
        console.log(err);
      },
    })
  }

  getExcelStatement(forExcelData: [key: string]) {
    const headers = new HttpHeaders({
      "Content-Type": "application/json"
    });
    this.http.post<any>(`${this.baseUrl}/api/Transaction/GenerateExcelStatement`, forExcelData, {headers: headers})
    .subscribe({
      next: (res) => {
        this.responseMsg = res.message;
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
        } else {
          Swal.fire({
            text: this.responseMsg,
            confirmButtonColor: "#FF0033",
            showClass: {
              popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
              popup: 'animate__animated animate__fadeOutUp'
            }
          })
        }
      },
      error: (err) => {
        console.log(err);
      },
    })
  }

  getCurrenciesUserHas() {
    const headers = new HttpHeaders({
      "Content-Type": "application/json"
    });
    this.http.get<any[]>(`${this.baseUrl}/api/Account/UserAccountDetails`, {headers: headers})
    .subscribe({
      next: (res) => {
        this.currencies = res;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

}
