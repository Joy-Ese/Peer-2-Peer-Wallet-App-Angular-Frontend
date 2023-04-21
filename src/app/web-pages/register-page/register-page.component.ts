import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { RegisterPageService } from 'src/app/services/register-page.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarComponent } from 'src/app/reuseable-components/snack-bar/snack-bar.component';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit{
  errorMessage : string = "";

  first_name : string = "";

  @ViewChild("regForm") form!: NgForm;

  constructor(
    @Inject(DOCUMENT) private domDocument: Document,
    private registerPageService: RegisterPageService, 
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

  ngOnInit(): void {
    this.registerPageService;
  }

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
    this.registerPageService.onRegister(registerData);
    if (this.registerPageService.status == true) {
      this.passDataToSnackComponent();
    }
    setTimeout(() => {this.domDocument.location.replace("/login")}, 6000);
  }
}
