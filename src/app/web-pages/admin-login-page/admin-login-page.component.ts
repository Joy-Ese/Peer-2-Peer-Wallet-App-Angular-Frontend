import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AdminLoginResponseFromBackEnd } from 'src/app/models/response-from-backend/admin-login-response';

@Component({
  selector: 'app-admin-login-page',
  templateUrl: './admin-login-page.component.html',
  styleUrls: ['./admin-login-page.component.css']
})
export class AdminLoginPageComponent implements OnInit{

  baseUrl : string = "http://localhost:7236";

  responseMsg! : string;
  status! : boolean;

  showPassword: boolean = false;

  adminLoginResponseFromBackEnd! : AdminLoginResponseFromBackEnd;

  key! : any;

  constructor(private http: HttpClient,) { }

  ngOnInit(): void { }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  onAdminLogin(adminLoginData: [key: string]) {
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
    });
    this.http.post<any>(`${this.baseUrl}/api/Auth/AdminLogin`, adminLoginData, {headers: headers})
    .subscribe({
      next: (res) => {
        this.adminLoginResponseFromBackEnd = res as AdminLoginResponseFromBackEnd;
        this.status = this.adminLoginResponseFromBackEnd.status;
        this.responseMsg = this.adminLoginResponseFromBackEnd.result;
        console.log(this.adminLoginResponseFromBackEnd);
        this.key = localStorage.setItem("adminLoginResponse", JSON.stringify(this.adminLoginResponseFromBackEnd));
        localStorage.setItem("adminToken", this.adminLoginResponseFromBackEnd.result);
      },
      error: (err) => {
        console.log(err);
      }
    });

    // .subscribe({
    //   next: (res) => {
    //     this.loginResponseFromBackEnd = res as LoginResponseFromBackEnd;
    //     console.log(this.loginResponseFromBackEnd);
    //     this.key = localStorage.setItem("loginResponse", JSON.stringify(this.loginResponseFromBackEnd));
    //     localStorage.setItem("token", this.loginResponseFromBackEnd.result);
    //     const headers2 = new HttpHeaders({
    //       "Content-Type": "application/json",
    //       "Authorization": `Bearer ${this.loginResponseFromBackEnd.result}`
    //     });
    //       this.http.get(`${this.baseUrl}/api/Dashboard/GetUserDetails`, {headers: headers2})
    //       .subscribe({
    //         next: (res) => {
    //           localStorage.setItem("userDetails", JSON.stringify(res))
    //           this.authService.setUserLoggedIn(true);
    //           this.router.navigate(['/dashboard']);
    //         },
    //         error: (err) => {
    //           console.log(err);
    //         },
    //       });
    //   },
    //   error: (err) => {
    // console.log(err);
    // this.errorMessage = err.error.result;
    // console.log(this.errorMessage);
    //   },
    // });
  }

}
