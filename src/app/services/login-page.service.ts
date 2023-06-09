import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { LoginResponseFromBackEnd } from '../models/response-from-backend/login-response';
import { AuthService } from "../auth/auth.service";

@Injectable({
  providedIn: 'root'
})
export class LoginPageService {
  errorMessage : string = "";

  loginResponseFromBackEnd! : LoginResponseFromBackEnd;

  baseUrl : string = "http://localhost:7236";

  key : any;

  constructor(
    private http: HttpClient, 
    private router: Router,
    public authService: AuthService,
    ) {}

  onLogin(loginData: {
    userName: string,
    password: string
  }) {
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
    });
    this.http.post(`${this.baseUrl}/api/Auth/Login`,
    loginData, {headers: headers})
    .subscribe({
      next: (res) => {
        this.loginResponseFromBackEnd = res as LoginResponseFromBackEnd;
        console.log(this.loginResponseFromBackEnd);
        this.key = localStorage.setItem("loginResponse", JSON.stringify(this.loginResponseFromBackEnd));
        localStorage.setItem("token", this.loginResponseFromBackEnd.result);
        const headers2 = new HttpHeaders({
          "Content-Type": "application/json",
          "Authorization": `Bearer ${this.loginResponseFromBackEnd.result}`
        });
          this.http.get(`${this.baseUrl}/api/Dashboard/GetUserDetails`, {headers: headers2})
          .subscribe({
            next: (res) => {
              localStorage.setItem("userDetails", JSON.stringify(res))
              this.authService.setUserLoggedIn(true);
              this.router.navigate(['/dashboard']);
            },
            error: (err) => {
              console.log(err);
            },
          });
      },
      error: (err) => {
        console.log(err);
        this.errorMessage = err.error.result;
        console.log(this.errorMessage);
      },
    });
  }
}
