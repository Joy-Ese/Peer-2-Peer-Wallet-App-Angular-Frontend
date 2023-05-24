import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { UserDetailResponseFromBackEnd } from 'src/app/models/response-from-backend/userdetails-response';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-edit-profile-dialog-content',
  templateUrl: './edit-profile-dialog-content.component.html',
  styleUrls: ['./edit-profile-dialog-content.component.css']
})
export class EditProfileDialogContentComponent implements OnInit{

  baseUrl : string = "http://localhost:7236";

  userDetailResponseFromBackEnd! : UserDetailResponseFromBackEnd;

  responseMsg = "";
  status! : boolean;

  fname! : string;
  lname! : string;
  uname! : string;
  addr! : string;
  phnum! : string;
  em! : string;

  constructor(private http: HttpClient, public dialogRef: MatDialogRef<EditProfileDialogContentComponent>,) {}

  ngOnInit() {
		this.getDetailsInForm();
	}

  onProfileUpdate(profileData: [key: string]) {
    const headers = new HttpHeaders({
      "Content-Type": "application/json"
    });
    this.http.put<any>(`${this.baseUrl}/api/Dashboard/UpdateUserInfo`, profileData, {headers: headers})
    .subscribe({
      next: (res) => {
        this.responseMsg = res.message;
        this.status = res.status;
        Swal.fire({
          text: this.responseMsg,
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
    });
  }

  getDetailsInForm() {
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
    });
    this.http.get(`${this.baseUrl}/api/Dashboard/GetUserDetails`, {headers: headers})
    .subscribe({
      next: (res) => {
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
