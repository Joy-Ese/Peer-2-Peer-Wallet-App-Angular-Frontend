import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UserDetailResponseFromBackEnd } from 'src/app/models/response-from-backend/userdetails-response';

@Component({
  selector: 'app-mini-dashboard-page',
  templateUrl: './mini-dashboard-page.component.html',
  styleUrls: ['./mini-dashboard-page.component.css']
})
export class MiniDashboardPageComponent implements OnInit{

  baseUrl : string = "http://localhost:7236";

  userDetailResponseFromBackEnd! : UserDetailResponseFromBackEnd;

  username! : string;

  acctDetails! : any[];

  lastThreeTxns!: any[];

  constructor(
    private http: HttpClient, 
  ) {}

  ngOnInit() {
    this.getUserDetails();
    this.getLastThreeTxns();
	}

  getUserDetails() {
    const headers = new HttpHeaders({
      "Content-Type": "application/json"
    });
    this.http.get<any>(`${this.baseUrl}/api/Dashboard/GetUserDetails`,
    {headers: headers})
    .subscribe({
      next: (res) => {
        this.username = res.username;
        this.acctDetails = res.accountDetails;
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

}
