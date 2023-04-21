import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AcctNumberResponseFromBackEnd } from 'src/app/models/response-from-backend/acctNum-response';

@Component({
  selector: 'app-mini-dashboard-page',
  templateUrl: './mini-dashboard-page.component.html',
  styleUrls: ['./mini-dashboard-page.component.css']
})
export class MiniDashboardPageComponent implements OnInit{

  baseUrl : string = "http://localhost:7236";

  acctNumberResponseFromBackEnd! : AcctNumberResponseFromBackEnd;

  acctNumber : string = "";

  constructor(
    private http: HttpClient, 
  ) {}

  ngOnInit() {
		const headers = new HttpHeaders({
      "Content-Type": "application/json"
    });
    this.http.get<AcctNumberResponseFromBackEnd>(`${this.baseUrl}/api/Dashboard/GetUserAccountNumber`,
    {headers: headers})
    .subscribe({
      next: (res) => {
        console.log(res);
        this.acctNumberResponseFromBackEnd = res as AcctNumberResponseFromBackEnd;
        this.acctNumber = res.AccountNumber;
      },
      error: (err) => {
        console.log(err);
      },
    });
	}
}
