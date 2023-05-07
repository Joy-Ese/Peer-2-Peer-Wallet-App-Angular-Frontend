import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, } from '@angular/core';
import { Router } from '@angular/router';
import { UserDetailResponseFromBackEnd } from 'src/app/models/response-from-backend/userdetails-response';
import Swal from 'sweetalert2/dist/sweetalert2.js';

type activeTab = "editProfile" | "updatePin" | "changePassword" | "setImage" | "updateImage";

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})

export class ProfilePageComponent implements OnInit{

  baseUrl : string = "http://localhost:7236";

  userDetailResponseFromBackEnd! : UserDetailResponseFromBackEnd;

  switchTabs: string = "editProfile";

  responseMsg = "";
  status! : boolean;

  fname! : string;
  lname! : string;
  uname! : string;
  addr! : string;
  phnum! : string;
  em! : string;

  constructor(private http: HttpClient, private router: Router,) {}

  ngOnInit() {
		this.getDetailsInForm();
	}

  changeContent(content: activeTab) {
    this.switchTabs = content;
  }

  onProfileUpdate(profileData: [key: string]) {
    const headers = new HttpHeaders({
      "Content-Type": "application/json"
    });
    this.http.put<any>(`${this.baseUrl}/api/Dashboard/UpdateUserInfo`, profileData, {headers: headers})
    .subscribe({
      next: (res) => {
        console.log(res);
        this.responseMsg = res.message;
        this.status = res.status;
        Swal.fire({
          text: "Profile edited successfully!",
          confirmButtonColor: "#003366",
          showClass: {
            popup: 'animate__animated animate__fadeInDown'
          },
          hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
          }
        })
        setTimeout(() => {
          window.location.reload();
        }, 500);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  getDetailsInForm() {
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
    })
    this.http.get(`${this.baseUrl}/api/Dashboard/GetUserDetails`, {headers: headers})
    .subscribe({
      next: (res) => {
        console.log(res);
        this.userDetailResponseFromBackEnd = res as UserDetailResponseFromBackEnd;
        this.fname = this.userDetailResponseFromBackEnd.firstName;
        this.lname = this.userDetailResponseFromBackEnd.lastName;
        this.uname = this.userDetailResponseFromBackEnd.username;
        this.phnum = this.userDetailResponseFromBackEnd.phoneNumber;
        this.em = this.userDetailResponseFromBackEnd.email;
        this.addr = this.userDetailResponseFromBackEnd.address;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
