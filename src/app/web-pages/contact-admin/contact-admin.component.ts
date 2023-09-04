import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PreOutChatDialogContentComponent } from 'src/app/reuseable-components/pre-out-chat-dialog-content/pre-out-chat-dialog-content.component';


@Component({
  selector: 'app-contact-admin',
  templateUrl: './contact-admin.component.html',
  styleUrls: ['./contact-admin.component.css']
})
export class ContactAdminComponent implements OnInit{

  panelOpenState = false;

  constructor(public dialog: MatDialog) {}

  ngOnInit() {}

  openPreOutChatDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(PreOutChatDialogContentComponent, {
      width: '600px',
      height: '450px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

}
