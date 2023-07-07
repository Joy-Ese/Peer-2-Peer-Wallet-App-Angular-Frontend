import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GenStmntDialogContentComponent } from 'src/app/reuseable-components/gen-stmnt-dialog-content/gen-stmnt-dialog-content.component';
import { TxnRangeDialogContentComponent } from 'src/app/reuseable-components/txn-range-dialog-content/txn-range-dialog-content.component';

@Component({
  selector: 'app-transaction-page',
  templateUrl: './transaction-page.component.html',
  styleUrls: ['./transaction-page.component.css']
})
export class TransactionPageComponent implements OnInit{

  baseUrl : string = "http://localhost:7236";

  txns!: any[];
  tempTxns!: any[];

  searchText!: string;

  page: number = 1;
  count: number = 0;
  tableSize: number = 5;

  order!: string;
  reverse: boolean = false;

  constructor( private http: HttpClient, public dialog: MatDialog, ) {}

  ngOnInit() {
		this.getTxnsList();
	}

  setOrder(value: string) { 
    if (this.order === value) { 
      this.reverse = !this.reverse; 
    } 
    this.order = value; 
  }

  getCredits() {
    const credits = this.tempTxns.filter((x: any) => x.transactionType === "CREDIT");
    this.txns = credits;
  }

  getDebits() {
    const debits = this.tempTxns.filter((x: any) => x.transactionType === "DEBIT");
    this.txns = debits;
  }

  getAll() {
    const allTxns = this.tempTxns;
    this.txns = allTxns;
  }

  getTxnsList() {
    const headers = new HttpHeaders({
      "Content-Type": "application/json"
    });
    this.http.get<any[]>(`${this.baseUrl}/api/Transaction/GetTransactionList`,
    {headers: headers})
    .subscribe({
      next: (res) => {
        this.txns = res;
        this.tempTxns = res;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  onTableDataChange(event: any) {
    this.page = event;
  }
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
  }

  openTxnRangeDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(TxnRangeDialogContentComponent, {
      width: '1000px',
      height: '500px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

  openGenStmntDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(GenStmntDialogContentComponent, {
      width: '600px',
      height: '400px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }
}

