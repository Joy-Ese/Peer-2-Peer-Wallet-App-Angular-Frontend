import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PreOutChatDialogContentComponent } from 'src/app/reuseable-components/pre-out-chat-dialog-content/pre-out-chat-dialog-content.component';
import Swal from 'sweetalert2/dist/sweetalert2.js';


@Component({
  selector: 'app-contact-admin',
  templateUrl: './contact-admin.component.html',
  styleUrls: ['./contact-admin.component.css']
})
export class ContactAdminComponent implements OnInit{

  baseUrl : string = "http://localhost:7236";

  panelOpenState = false;

  status!: boolean;
  message!: string;

  constructor(private http: HttpClient, public dialog: MatDialog) {}

  ngOnInit() {}

  onForgetPass(fPassData: [key: string]) {
    const headers = new HttpHeaders({
      "Content-Type": "application/json"
    });
    this.http.post<any>(`${this.baseUrl}/api/Auth/ForgetPassword`, fPassData, {headers: headers})
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
        }, 2000);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  openPreOutChatDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(PreOutChatDialogContentComponent, {
      width: '600px',
      height: '450px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

}
