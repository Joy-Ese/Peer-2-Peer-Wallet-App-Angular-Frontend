import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AcctBalanceResponseFromBackEnd } from 'src/app/models/response-from-backend/acctBal-response';
import { AcctCurrencyResponseFromBackEnd } from 'src/app/models/response-from-backend/acctCurr-response';
import { AcctNumberResponseFromBackEnd } from 'src/app/models/response-from-backend/acctNum-response';

@Component({
  selector: 'app-mini-dashboard-page',
  templateUrl: './mini-dashboard-page.component.html',
  styleUrls: ['./mini-dashboard-page.component.css']
})
export class MiniDashboardPageComponent implements OnInit{

  baseUrl : string = "http://localhost:7236";

  acctNumberResponseFromBackEnd! : AcctNumberResponseFromBackEnd;
  acctBalanceResponseFromBackEnd! : AcctBalanceResponseFromBackEnd;
  acctCurrencyResponseFromBackEnd! : AcctCurrencyResponseFromBackEnd;

  acctNumber! : string;

  balance! : string;

  currency! : string;

  constructor(
    private http: HttpClient, 
  ) {}

  ngOnInit() {
		this.getAccountNumber();
    this.getAccountBalance();
    this.getAccountCurrency();
	}

  getAccountNumber() {
    const headers = new HttpHeaders({
      "Content-Type": "application/json"
    });
    this.http.get(`${this.baseUrl}/api/Dashboard/GetUserAccountNumber`,
    {headers: headers})
    .subscribe({
      next: (res) => {
        console.log(res);
        this.acctNumberResponseFromBackEnd = res as AcctNumberResponseFromBackEnd;
        this.acctNumber = this.acctNumberResponseFromBackEnd.accountNumber;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getAccountBalance() {
    const headers = new HttpHeaders({
      "Content-Type": "application/json"
    });
    this.http.get(`${this.baseUrl}/api/Dashboard/GetUserAccountBalance`,
    {headers: headers})
    .subscribe({
      next: (res) => {
        console.log(res);
        this.acctBalanceResponseFromBackEnd = res as AcctBalanceResponseFromBackEnd;
        this.balance = this.acctBalanceResponseFromBackEnd.balance;
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
        console.log(res);
        this.acctCurrencyResponseFromBackEnd = res as AcctCurrencyResponseFromBackEnd;
        this.currency = this.acctCurrencyResponseFromBackEnd.currency;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }


}
