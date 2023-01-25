import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RegisterPageService {
  errorMessage : string = "";

  baseUrl : string = "http://localhost:7236";

  constructor(private http: HttpClient) {}

  onRegister(registerData: {
    firstName: string,
    lastName: string,
    userName: string,
    password: string,
    email: string,
    phoneNumber: string,
    address: string,
    pin: string,
    confirmPin: string
  }) {
    const headers = new HttpHeaders({
      "Content-Type": "application/json"
    })
    this.http.post(`${this.baseUrl}/api/Auth/SignUp`, 
    registerData, {headers: headers})
    .subscribe({
      next: (result) => {
        console.log(result);
      },
      error: (err) => {
        console.log(err);
        this.errorMessage = err.error.errors;
        console.log(this.errorMessage);
      },
    });
  }
}
