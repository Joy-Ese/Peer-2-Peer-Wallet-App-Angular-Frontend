import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
declare let html2pdf: any;

@Component({
  selector: 'app-txn-range-dialog-content',
  templateUrl: './txn-range-dialog-content.component.html',
  styleUrls: ['./txn-range-dialog-content.component.css']
})
export class TxnRangeDialogContentComponent implements OnInit{

  baseUrl : string = "http://localhost:7236";

  rangeTxns!: any[];
  tempTxns!: any[];

  order!: string;
  reverse: boolean = false;

  constructor(private http: HttpClient, public dialogRef: MatDialogRef<TxnRangeDialogContentComponent>, ) {}

  ngOnInit() {}

  setOrder(value: string) { 
    if (this.order === value) { 
      this.reverse = !this.reverse; 
    } 
    this.order = value; 
  }

  getCredits() {
    const credits = this.tempTxns.filter((x: any) => x.transactionType === "CREDIT");
    this.rangeTxns = credits;
  }

  getDebits() {
    const debits = this.tempTxns.filter((x: any) => x.transactionType === "DEBIT");
    this.rangeTxns = debits;
  }

  getAll() {
    const allTxns = this.tempTxns;
    this.rangeTxns = allTxns;
  }

  getTxnsByRange(rangeData: [key: string]) {
    const headers = new HttpHeaders({
      "Content-Type": "application/json"
    });
    this.http.post<any>(`${this.baseUrl}/api/Transaction/TransactionsByDateRange`, rangeData, {headers: headers})
    .subscribe({
      next: (res) => {
        this.rangeTxns = res;
        this.tempTxns = res;
      },
      error: (err) => {
        console.log(err);
      },
    })
  }

  download() {
    var element = document.getElementById("rangeTable");
    var opt = {
      margin: 1,
      filename: "transactionByRange.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 3 },
      jsPDF: { unit: "in", format: "Tabloid", orientation: "portrait", width: 9, }
    };

    html2pdf().from(element).set(opt).save();
  }
}
