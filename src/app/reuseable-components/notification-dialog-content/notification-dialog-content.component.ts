import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatDialogRef } from '@angular/material/dialog';
import { Notify } from 'src/app/models/notify';
import { SignalrService } from 'src/app/services/signalr.service';

@Component({
  selector: 'app-notification-dialog-content',
  templateUrl: './notification-dialog-content.component.html',
  styleUrls: ['./notification-dialog-content.component.css']
})
export class NotificationDialogContentComponent implements OnInit, OnDestroy{

  notify: Notify[] = [];
  allNotifySubscription: any;

  constructor(private signalrService: SignalrService, public dialogRef: MatDialogRef<NotificationDialogContentComponent>,) { }

  ngOnInit() {
    this.signalrService.startConnection().then(() => {
      console.log("connected");

      this.signalrService.listenToAllNotifications();

      this.allNotifySubscription = this.signalrService.AllNotificationObservable
        .subscribe((res: Notify) => {
          this.notify.push(res);
        });
    });
  }

  ngOnDestroy() {
    (<Subscription>this.allNotifySubscription).unsubscribe();
  }

}
