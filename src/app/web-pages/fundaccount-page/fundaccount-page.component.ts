import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-fundaccount-page',
  templateUrl: './fundaccount-page.component.html',
  styleUrls: ['./fundaccount-page.component.css']
})
export class FundaccountPageComponent implements OnInit{

  baseUrl : string = "http://localhost:7236";

  acctDetails! : any[];

  initializeRespMsg = "";
  initializeStatus! : boolean;

  iFrameUrl!: SafeResourceUrl;
  displayIFrame: boolean = false;

  constructor(private http: HttpClient, public sanitizer: DomSanitizer) {}

  ngOnInit() {
    this.getUserDetails();
	}

  showEye = false;
  toggleEye() {
    this.showEye = !this.showEye;
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

  onPaystackInit(initializeData: [key: number]) {
    const headers = new HttpHeaders({
      "Content-Type": "application/json"
    });
    this.http.post<any>(`${this.baseUrl}/api/Payment/InitializePaystackPayment`, initializeData, {headers: headers})
    .subscribe({
      next: (res) => {
        console.log(res);
        this.initializeRespMsg = res.message;
        this.initializeStatus = res.status;
        this.iFrameUrl = this.sanitizer.bypassSecurityTrustResourceUrl(res.data.authorization_url);
        this.displayIFrame = true;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
}
