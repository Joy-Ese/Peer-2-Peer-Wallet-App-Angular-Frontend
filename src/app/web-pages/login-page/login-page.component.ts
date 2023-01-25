import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginPageService } from 'src/app/services/login-page.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  errorMessage : string = "";

  @ViewChild("logForm") form!: NgForm;

  constructor(private loginPageService : LoginPageService) {
  }

  ngOnInit(): void {
    this.loginPageService;
  }

  onLogin(loginData: {
    userName: string,
    password: string
  }) {
    this.loginPageService.onLogin(loginData);
  }

  get errorMsg(): string {
    return this.loginPageService.errorMessage;
  }
  set errorMsg(value: string) {
    this.loginPageService.errorMessage = value;
    console.log("In setter:", value);
  }
}
