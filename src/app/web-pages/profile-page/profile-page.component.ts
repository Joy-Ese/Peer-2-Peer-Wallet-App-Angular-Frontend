import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UserDetailResponseFromBackEnd } from 'src/app/models/response-from-backend/userdetails-response';
import { EditProfileDialogContentComponent } from 'src/app/reuseable-components/edit-profile-dialog-content/edit-profile-dialog-content.component';
import Swal from 'sweetalert2/dist/sweetalert2.js';

type activeTab = "editProfile" | "updatePin" | "changePassword" | "profileImage";

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})

export class ProfilePageComponent implements OnInit{

  baseUrl : string = "http://localhost:7236";

  imageFile: any;

  userDetailResponseFromBackEnd! : UserDetailResponseFromBackEnd;

  switchTabs: string = "editProfile";

  responseMsg = "";
  status! : boolean;

  updatePinRespMsg = "";
  updatePinStatus! : boolean;

  changePassRespMsg = "";
  changePassStatus! : boolean;

  profileImageRespMsg = "";
  profileImageStatus! : boolean;

  fname! : string;
  lname! : string;
  uname! : string;
  addr! : string;
  phnum! : string;
  em! : string;

  securityQues! : string;

  userHaveImage! : boolean;

  constructor(private http: HttpClient, private router: Router, public dialog: MatDialog,) {}

  ngOnInit() {
		this.getDetailsInForm();
    this.getSecurityQuestion();
    this.doesUserHaveImage();
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

  onPinUpdate(updatePinData: [key: string]) {
    const headers = new HttpHeaders({
      "Content-Type": "application/json"
    });
    this.http.put<any>(`${this.baseUrl}/api/Auth/UpdateUserPin`, updatePinData, {headers: headers})
    .subscribe({
      next: (res) => {
        this.updatePinRespMsg = res.message;
        this.updatePinStatus = res.status;
        if (this.updatePinStatus == true) {
          Swal.fire({
            text: this.updatePinRespMsg,
            confirmButtonColor: "#003366",
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
        }, 500);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  onPasswordChange(changePassData: [key: string]) {
    const headers = new HttpHeaders({
      "Content-Type": "application/json"
    });
    this.http.post<any>(`${this.baseUrl}/api/Auth/ChangePassword`, changePassData, {headers: headers})
    .subscribe({
      next: (res) => {
        this.changePassRespMsg = res.message;
        this.changePassStatus = res.status;
        if (this.changePassStatus == true) {
          Swal.fire({
            text: this.changePassRespMsg,
            confirmButtonColor: "#003366",
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
        }, 1000);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  handleFile(event: any){
    this.imageFile = event.target.files[0];
  }

  onImageUpload(imageData: any) {
    const file:File = imageData;
    if (file) {
      const formData = new FormData();
      formData.append('ImageDetails', this.imageFile);

      this.http.post<any>(`${this.baseUrl}/api/Dashboard/UploadNewImage`, formData)
      .subscribe({
        next: (res) => {
          this.profileImageRespMsg = res.message;
          this.profileImageStatus = res.status;
          if (this.profileImageStatus == true) {
            Swal.fire({
              text: this.profileImageRespMsg,
              confirmButtonColor: "#003366",
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
          }, 500);
        },
        error: (err) => {
          console.log(err);
        }
      });
    }
  }

  onImageUpdate(imageData: any) {
    const file:File = imageData;
    if (file) {
      const formData = new FormData();
      formData.append('ImageDetails', this.imageFile);

      this.http.put<any>(`${this.baseUrl}/api/Dashboard/UpdateImage`, formData)
      .subscribe({
        next: (res) => {
          this.profileImageRespMsg = res.message;
          this.profileImageStatus = res.status;
          if (this.profileImageStatus == true) {
            Swal.fire({
              text: this.profileImageRespMsg,
              confirmButtonColor: "#003366",
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
          }, 1000);
        },
        error: (err) => {
          console.log(err);
        }
      });
    }
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

  getSecurityQuestion() {
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
    });
    this.http.get<any>(`${this.baseUrl}/api/Dashboard/GetUserSecurityQuestion`, {headers: headers})
    .subscribe({
      next: (res) => {
        this.securityQues = res.question;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  doesUserHaveImage() {
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
    });
    this.http.get<any>(`${this.baseUrl}/api/Dashboard/DoesUserHaveImage`, {headers: headers})
    .subscribe({
      next: (res) => {
        this.userHaveImage = res;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  openEditProfileDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(EditProfileDialogContentComponent, {
      width: '900px',
      height: '500px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }
}
