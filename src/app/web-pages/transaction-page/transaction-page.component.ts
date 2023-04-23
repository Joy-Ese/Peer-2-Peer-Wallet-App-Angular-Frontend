import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-transaction-page',
  templateUrl: './transaction-page.component.html',
  styleUrls: ['./transaction-page.component.css']
})
export class TransactionPageComponent implements OnInit{

  baseUrl : string = "http://localhost:7236";

  txns!: any[];

  searchText!: string;

  constructor(
    private http: HttpClient, 
  ) {}

  ngOnInit() {
		this.getTxnsList();
	}

  getTxnsList() {
    const headers = new HttpHeaders({
      "Content-Type": "application/json"
    });
    this.http.get<any[]>(`${this.baseUrl}/api/Transaction/GetTransactionList`,
    {headers: headers})
    .subscribe({
      next: (res) => {
        console.log(res);
        this.txns = res;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

}
