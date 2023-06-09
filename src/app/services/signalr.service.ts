import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { Observable, Subject } from 'rxjs';
import { Notify } from '../models/notify';

@Injectable({
  providedIn: 'root'
})
export class SignalrService {

  baseUrl : string = "http://localhost:7236";

  private hubConnection: any;

  public startConnection() {
    return new Promise((resolve, reject) => {
      this.hubConnection = new HubConnectionBuilder()
        .withUrl(`${this.baseUrl}/notification`).build();
      
      this.hubConnection.start()
        .then(() => {
          console.log("Connection Established");
          return resolve(true);
        })
        .catch((err: any) => {
          console.log("Error Occured" + err);
          reject(err);
        });
    });
  }

  private $allNoti: Subject<Notify> = new Subject<Notify>();
  public get AllNotificationObservable(): Observable<Notify> {
    return this.$allNoti.asObservable();
  }

  public listenToAllNotifications() {
    (<HubConnection>this.hubConnection).on("GetNotification", (data: Notify) => {
      console.log(data);
      this.$allNoti.next(data);
    });
  }

  constructor() { }
}
