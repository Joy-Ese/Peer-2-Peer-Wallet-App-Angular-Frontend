import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginPageService {
  errorMessage : string = "";

  baseUrl : string = "http://localhost:7236";

  key : any;

  constructor(private http: HttpClient) {}

  onLogin(loginData: {
    userName: string,
    password: string
  }) {
    const headers = new HttpHeaders({
      "Content-Type": "application/json"
    })
    this.http.post(`${this.baseUrl}/api/Auth/Login`,
    loginData, {headers: headers})
    .subscribe({
      next: (res) => {
        console.log(res);
        this.key = localStorage.setItem("userData", JSON.stringify(res));
      },
      error: (err) => {
        console.log(err);
        this.errorMessage = err.error.result;
        console.log(this.errorMessage);
      },
    });
  }
}
