import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { RegisterPageService } from 'src/app/services/register-page.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit{
  errorMessage : string = "";

  @ViewChild("regForm") form!: NgForm;

  constructor(private registerPageService: RegisterPageService) {
  }

  ngOnInit(): void {
    this.registerPageService;
  }

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
    this.registerPageService.onRegister(registerData);
  }
}
