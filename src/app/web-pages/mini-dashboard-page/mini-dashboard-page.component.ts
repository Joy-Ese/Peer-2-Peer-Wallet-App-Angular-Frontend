import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AcctCurrencyResponseFromBackEnd } from 'src/app/models/response-from-backend/acctCurr-response';
import { UserDetailResponseFromBackEnd } from 'src/app/models/response-from-backend/userdetails-response';

@Component({
  selector: 'app-mini-dashboard-page',
  templateUrl: './mini-dashboard-page.component.html',
  styleUrls: ['./mini-dashboard-page.component.css']
})
export class MiniDashboardPageComponent implements OnInit{

  baseUrl : string = "http://localhost:7236";

  acctCurrencyResponseFromBackEnd! : AcctCurrencyResponseFromBackEnd;
  userDetailResponseFromBackEnd! : UserDetailResponseFromBackEnd;

  username! : string;

  acctNumber! : string;

  balance! : string;

  currency! : string;

  lastThreeTxns!: any[];

  constructor(
    private http: HttpClient, 
  ) {}

  ngOnInit() {
    this.getAccountCurrency();
    this.getUserDetails();
    this.getLastThreeTxns();
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
        this.acctNumber = this.userDetailResponseFromBackEnd.accountNumber;
        this.balance = this.userDetailResponseFromBackEnd.balance;
        this.username = this.userDetailResponseFromBackEnd.username;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getLastThreeTxns() {
    const headers = new HttpHeaders({
      "Content-Type": "application/json"
    });
    this.http.get<any[]>(`${this.baseUrl}/api/Transaction/GetLastThreeTransactions`,
    {headers: headers})
    .subscribe({
      next: (res) => {
        this.lastThreeTxns = res;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getAccountCurrency() {
    const headers = new HttpHeaders({
      "Content-Type": "application/json"
    });
    this.http.get(`${this.baseUrl}/api/Dashboard/GetUserAccountCurrency`,
    {headers: headers})
    .subscribe({
      next: (res) => {
        this.acctCurrencyResponseFromBackEnd = res as AcctCurrencyResponseFromBackEnd;
        this.currency = this.acctCurrencyResponseFromBackEnd.currency;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
