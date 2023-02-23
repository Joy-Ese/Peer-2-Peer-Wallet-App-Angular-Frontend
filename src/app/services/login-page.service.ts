import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { LoginResponseFromBackEnd } from '../models/response-from-backend/login-response';

@Injectable({
  providedIn: 'root'
})
export class LoginPageService {
  errorMessage : string = "";

  result : object = {};

  loginResponseFromBackEnd! : LoginResponseFromBackEnd;

  baseUrl : string = "http://localhost:7236";

  key : any;

  constructor(
    private http: HttpClient, 
    private router: Router,
    ) {}

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
        this.loginResponseFromBackEnd = res as LoginResponseFromBackEnd;
        console.log(this.loginResponseFromBackEnd);
        this.key = localStorage.setItem("userData", JSON.stringify(this.loginResponseFromBackEnd));
        localStorage.setItem("token", this.loginResponseFromBackEnd.result);
        this.router.navigateByUrl('/dashboard');
      },
      error: (err) => {
        console.log(err);
        this.errorMessage = err.error.result;
        console.log(this.errorMessage);
      },
    });
  }
}
