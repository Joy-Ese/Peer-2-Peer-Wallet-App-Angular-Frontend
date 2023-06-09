import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-set-secquest-dialog-content',
  templateUrl: './set-secquest-dialog-content.component.html',
  styleUrls: ['./set-secquest-dialog-content.component.css']
})
export class SetSecquestDialogContentComponent {

  constructor(public dialogRef: MatDialogRef<SetSecquestDialogContentComponent>,) {}

}
