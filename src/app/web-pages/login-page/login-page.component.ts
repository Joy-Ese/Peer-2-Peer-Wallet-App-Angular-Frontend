import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginPageService } from 'src/app/services/login-page.service';
import { SignalrService } from 'src/app/services/signalr.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit{
  errorMessage : string = "";

  showPassword: boolean = false;

  @ViewChild("logForm") form!: NgForm;

  constructor(private loginPageService : LoginPageService, private signalrService : SignalrService) {
  }

  ngOnInit(): void {
    this.loginPageService;
    // this.AuthLoginSuccess();
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  onLogin(loginData: {
    userName: string,
    password: string
  }) {
    this.loginPageService.onLogin(loginData);
    // this.AuthLoginUser(loginData.userName, loginData.password);
  }

  // async AuthLoginUser(user: string, pass: string) {
  //   let personUser = {userName: user, password: pass};

  //   await this.signalrService.hubConnection.invoke("AuthLoginUser", personUser)
  //   .finally(() => {
  //     this.AuthLoginSuccess();
  //     console.log("Login attempted")
  //   })
  //   .catch(err => console.error(err));
  // }

  // public AuthLoginSuccess() {
  //   this.signalrService.hubConnection.on("AuthLoginSuccess", (users: userLoggedIn) => {
  //     console.log(users);
  //     this.signalrService.userData = {...users};

  //     localStorage.setItem("userId", users.id);
  //     localStorage.setItem("signalrUserLoginDetails", JSON.stringify(users));
  //   });
  // }

  get errorMsg(): string {
    return this.loginPageService.errorMessage;
  }
  set errorMsg(value: string) {
    this.loginPageService.errorMessage = value;
    console.log("In setter:", value);
  }
}
