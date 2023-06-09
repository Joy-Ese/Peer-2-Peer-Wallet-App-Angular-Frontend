import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-set-pin-dialog-content',
  templateUrl: './set-pin-dialog-content.component.html',
  styleUrls: ['./set-pin-dialog-content.component.css']
})
export class SetPinDialogContentComponent {

  constructor(public dialogRef: MatDialogRef<SetPinDialogContentComponent>,) {}

}
