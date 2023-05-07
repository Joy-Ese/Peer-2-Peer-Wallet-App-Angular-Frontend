import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';


export interface TableInfo {
  amount: number;
  senderInfo: string;
  recepientInfo: string;
  transactionType: string;
  currency: string;
  status: string;
  date: Date;
}

@Component({
  selector: 'app-transaction-page',
  templateUrl: './transaction-page.component.html',
  styleUrls: ['./transaction-page.component.css']
})
export class TransactionPageComponent implements OnInit, AfterViewInit{

  baseUrl : string = "http://localhost:7236";

  txns!: any[];

  searchText!: string;

  constructor(
    private http: HttpClient, 
  ) {
    this.dataSource = new MatTableDataSource(this.txns);
  }

  displayedColumns: string[] = ['amount', 'senderInfo', 'recepientInfo', 'transactionType', 'currency', 'status', 'date'];
  dataSource: MatTableDataSource<any[]>;

  @ViewChild(MatPaginator) paginator: MatPaginator| null = null;
  @ViewChild(MatSort) sort: MatSort| null = null;

  ngOnInit() {
		this.getTxnsList();
	}
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
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

