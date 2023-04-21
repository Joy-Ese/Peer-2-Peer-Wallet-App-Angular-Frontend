import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { RegisterResponseFromBackEnd } from "../models/response-from-backend/register-response";

@Injectable({
  providedIn: 'root'
})
export class RegisterPageService {
  errorMessage : string = "";
  successMsg : string = "";
  status!: boolean;

  registerResponseFromBackEnd! : RegisterResponseFromBackEnd;

  baseUrl : string = "http://localhost:7236";

  constructor(private http: HttpClient) {}

  onRegister(registerData: {
    firstName: string,
    lastName: string,
    userName: string,
    phoneNumber: string,
    password: string,
    confirmPassword: string,
    email: string,
    address: string,
  }) {
    const headers = new HttpHeaders({
      "Content-Type": "application/json"
    })
    this.http.post(`${this.baseUrl}/api/Auth/SignUp`, 
    registerData, {headers: headers})
    .subscribe({
      next: (result) => {
        console.log(result);
        this.registerResponseFromBackEnd = result as RegisterResponseFromBackEnd;
        this.successMsg = this.registerResponseFromBackEnd.message;
        this.status = this.registerResponseFromBackEnd.status;
        console.log(this.successMsg);
      },
      error: (err) => {
        // console.log(err);
        this.errorMessage = err.error.errors;
        console.log(this.errorMessage);
      },
    });
  }
}
