import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarComponent } from 'src/app/reuseable-components/snack-bar/snack-bar.component';
import { DOCUMENT } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit{

  baseUrl : string = "http://localhost:7236";

  first_name : string = "";

  responseMsg : string = "";
  status! : boolean;

  @ViewChild("regForm") form!: NgForm;

  constructor(
    @Inject(DOCUMENT) private domDocument: Document,
    private http: HttpClient,
    private matSnackBar: MatSnackBar) { }

  passDataToSnackComponent() {
    const hiName = this.first_name = (<HTMLInputElement>document.getElementById("first_name")).value;
    this.matSnackBar.openFromComponent(SnackBarComponent, {
      data: `Hi ${hiName}, Check email to verify your registration!`,
      duration: 5000,
      panelClass: ["snack-notification"],
      horizontalPosition: "center",
      verticalPosition: "top",
    })
  }

  ngOnInit() {}

  onRegister(registerData: [key: string]) {
    const headers = new HttpHeaders({
      "Content-Type": "application/json"
    });
    this.http.post<any>(`${this.baseUrl}/api/Auth/SignUp`, registerData, {headers: headers})
    .subscribe({
      next: (res) => {
        console.log(res);
        this.responseMsg = res.message;
        this.status = res.status;
        if (this.status == true) {
          this.passDataToSnackComponent();
          setTimeout(() => {this.domDocument.location.replace("/login")}, 3000);
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
