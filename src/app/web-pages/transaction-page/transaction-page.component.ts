import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { TxnResponseFromBackEnd } from 'src/app/models/response-from-backend/transaction-response';

@Component({
  selector: 'app-transaction-page',
  templateUrl: './transaction-page.component.html',
  styleUrls: ['./transaction-page.component.css']
})
export class TransactionPageComponent implements OnInit{

  baseUrl : string = "http://localhost:7236";

  txnResponseFromBackEnd! : TxnResponseFromBackEnd;

  // txns! : TxnResponseFromBackEnd;
  txns! : object;

  constructor(
    private http: HttpClient, 
  ) {
    // this.txns = {} as TxnResponseFromBackEnd;
  }

  ngOnInit() {
		this.getTxnsList();
	}

  getTxnsList() {
    const headers = new HttpHeaders({
      "Content-Type": "application/json"
    });
    this.http.get(`${this.baseUrl}/api/Transaction/GetTransactionList`,
    {headers: headers})
    .subscribe({
      next: (res) => {
        console.log(res);
        this.txnResponseFromBackEnd = res as TxnResponseFromBackEnd;
        this.txns = res;
        // this.txns.amount = this.txnResponseFromBackEnd.amount;
        // this.txns.senderInfo = this.txnResponseFromBackEnd.senderInfo;
        // this.txns.recepientInfo = this.txnResponseFromBackEnd.recepientInfo;
        // this.txns.transactionType = this.txnResponseFromBackEnd.transactionType;
        // this.txns.currency = this.txnResponseFromBackEnd.currency;
        // this.txns.status = this.txnResponseFromBackEnd.status;
        // this.txns.date = this.txnResponseFromBackEnd.date;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

}
