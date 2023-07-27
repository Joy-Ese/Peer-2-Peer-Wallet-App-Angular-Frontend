import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { UserDetailResponseFromBackEnd } from 'src/app/models/response-from-backend/userdetails-response';
import { DialogContentComponent } from 'src/app/reuseable-components/dialog-content/dialog-content.component';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-sendmoney-page',
  templateUrl: './sendmoney-page.component.html',
  styleUrls: ['./sendmoney-page.component.css']
})
export class SendmoneyPageComponent implements OnInit{

  baseUrl : string = "http://localhost:7236";

  userDetailResponseFromBackEnd! : UserDetailResponseFromBackEnd;

  acctDetails! : any[];

  searchInfo! : string;
  currn: string = "";

  acctNum! : string;
  firstName! : string;
  lastName! : string;
  status! : boolean;

  senderAcct! : string;

  constructor(private http: HttpClient, public dialog: MatDialog, ) {}

  ngOnInit() {
    this.getUserDetails();

    // this.activatedRoute.queryParams.subscribe((params) => {
    //   this.sourceAcct = params["sourceAcct"];
    //   console.log(this.sourceAcct); 
    // });
	}

  showEye = false;
  toggleEye() {
    this.showEye = !this.showEye;
  }

  accountLookUp(value1: string, value2: string) {
    const headers = new HttpHeaders({
      "Content-Type": "application/json"
    });

    const params = new URLSearchParams();
    params.append("searchInfo", value1);
    params.append("currency", value2);

    this.http.post<any>(`${this.baseUrl}/api/Account/AccountLookUp?${params}&${params}`, {headers: headers})
    .subscribe({
      next: (res) => {
        this.acctNum = res.acctNum;
        this.firstName = res.firstName;
        this.lastName = res.lastName;
        this.status = res.status;

        if (this.status == false) {
          Swal.fire({
            text: `${this.firstName} does not have an account matching ${this.currn} currency`,
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
        this.acctDetails = res.accountDetails;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  avoidChecks(value: string) {
    const headers = new HttpHeaders({
      "Content-Type": "application/json"
    });

    const params = new URLSearchParams();
    params.append("currency", value);

    this.http.post<any>(`${this.baseUrl}/api/Account/SendMoneyCheck?${params}`, {senderAcct: this.acctNum}, {headers: headers})
    .subscribe({
      next: (res) => {
        this.senderAcct = res.senderAccountNumber;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(DialogContentComponent, {
      // data: {destAcc: this.destAcct.find(item=> item.accountNumber === this.allAccounts)},
      data: {destAcc: this.acctNum, sendAcct: this.senderAcct},
      width: '585px',
      height: '500px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

}
