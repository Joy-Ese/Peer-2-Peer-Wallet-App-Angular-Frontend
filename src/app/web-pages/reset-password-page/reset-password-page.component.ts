import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-reset-password-page',
  templateUrl: './reset-password-page.component.html',
  styleUrls: ['./reset-password-page.component.css']
})
export class ResetPasswordPageComponent implements OnInit{

  baseUrl : string = "http://localhost:7236";

  tokeN!: string;
  emaiL!: string;

  status!: boolean;
  message!: string;

  constructor(
    private http: HttpClient,
    private router: Router,
    private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.queryParams
    .subscribe((params) => {
      this.emaiL = params["email"];
      this.tokeN = params["token"];
      console.log(this.emaiL, this.tokeN);
    })
  }

  onResetPass(resetPassForm: [key: string]) {
    const headers = new HttpHeaders({
      "Content-Type": "application/json"
    });
    this.http.post<any>(`${this.baseUrl}/api/Auth/ResetPassword`, resetPassForm, {headers: headers})
    .subscribe({
      next: (res) => {
        console.log(res);
        this.status = res.status;
        this.message = res.message;
        if (this.status == true) {
          Swal.fire({
            text: this.message,
            confirmButtonColor: "#003366",
            showClass: {
              popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
              popup: 'animate__animated animate__fadeOutUp'
            }
          })
          setTimeout(() => {this.router.navigate(['/login'])}, 2000);
        } else {
          Swal.fire({
            text: this.message,
            confirmButtonColor: "#FF0033",
            showClass: {
              popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
              popup: 'animate__animated animate__fadeOutUp'
            }
          })
        }
        setTimeout(() => {
          window.location.reload();
        }, 2500);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

}
