import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-logout-dialog-content',
  templateUrl: './logout-dialog-content.component.html',
  styleUrls: ['./logout-dialog-content.component.css']
})
export class LogoutDialogContentComponent implements OnInit{

  constructor(private router: Router, public authService: AuthService, public dialogRef: MatDialogRef<LogoutDialogContentComponent>,) {
    console.log(router.url);
  }

  ngOnInit() {}

  backToApp() {
    // this.router.navigateByUrl(`${this.router.url}`, {skipLocationChange: true}).then(()=>
    //   this.router.navigate([`${this.router.url}`])
    // );
    setTimeout(() => {
      window.location.reload();
    }, 50);
  }
}
