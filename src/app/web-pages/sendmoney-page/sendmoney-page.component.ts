import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { AcctEnquiryResponseFromBackEnd } from 'src/app/models/response-from-backend/acctEnquiry-response';
import { UserDetailResponseFromBackEnd } from 'src/app/models/response-from-backend/userdetails-response';
import { DialogContentComponent } from 'src/app/reuseable-components/dialog-content/dialog-content.component';

@Component({
  selector: 'app-sendmoney-page',
  templateUrl: './sendmoney-page.component.html',
  styleUrls: ['./sendmoney-page.component.css']
})
export class SendmoneyPageComponent implements OnInit{

  baseUrl : string = "http://localhost:7236";

  userDetailResponseFromBackEnd! : UserDetailResponseFromBackEnd;
  acctEnquiryResponseFromBackEnd! : AcctEnquiryResponseFromBackEnd;

  balance! : string;

  searchInfo! : string;

  // sourceAcct! : string;

  destAcct! : string;
  firstName! : string;
  lastName! : string;
  status! : boolean;

  constructor(private http: HttpClient, public dialog: MatDialog, ) {}

  ngOnInit() {
    this.getUserDetails();

    // this.activatedRoute.queryParams.subscribe((params) => {
    //   this.sourceAcct = params["sourceAcct"];
    //   console.log(this.sourceAcct); 
    // });
	}

  hideBalance = false;
  toggleBalance() {
    this.hideBalance = !this.hideBalance;
  }

  accountLookUp(value: string) {
    const headers = new HttpHeaders({
      "Content-Type": "application/json"
    });
    const params = new URLSearchParams();
    params.append("searchInfo", value);
    this.http.post(`${this.baseUrl}/api/Account/AccountLookUp?${params}`, {headers: headers})
    .subscribe({
      next: (res) => {
        console.log(res);
        this.acctEnquiryResponseFromBackEnd = res as AcctEnquiryResponseFromBackEnd;
        this.destAcct = this.acctEnquiryResponseFromBackEnd.acctNumber;
        this.firstName = this.acctEnquiryResponseFromBackEnd.firstName;
        this.lastName = this.acctEnquiryResponseFromBackEnd.lastName;
        this.status = this.acctEnquiryResponseFromBackEnd.status;
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
    this.http.get(`${this.baseUrl}/api/Dashboard/GetUserDetails`,
    {headers: headers})
    .subscribe({
      next: (res) => {
        this.userDetailResponseFromBackEnd = res as UserDetailResponseFromBackEnd;
        this.balance = this.userDetailResponseFromBackEnd.balance;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(DialogContentComponent, {
      data: {destAcc: this.destAcct},
      width: '585px',
      height: '400px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }
}
