import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
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

  acctDetails! : any[];

  searchInfo! : string;

  // sourceAcct! : string;

  destAcct! : any[];
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

  showEye = false;
  toggleEye() {
    this.showEye = !this.showEye;
  }

  accountLookUp(value: string) {
    const headers = new HttpHeaders({
      "Content-Type": "application/json"
    });
    const params = new URLSearchParams();
    params.append("searchInfo", value);
    this.http.post<any>(`${this.baseUrl}/api/Account/AccountLookUp?${params}`, {headers: headers})
    .subscribe({
      next: (res) => {
        console.log(res);
        this.destAcct = res.accountDetails;
        this.firstName = res.firstName;
        this.lastName = res.lastName;
        this.status = res.status;
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
    this.http.get<any>(`${this.baseUrl}/api/Dashboard/GetUserDetails`,
    {headers: headers})
    .subscribe({
      next: (res) => {
        this.acctDetails = res.accountDetails;
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
      height: '500px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }
}
