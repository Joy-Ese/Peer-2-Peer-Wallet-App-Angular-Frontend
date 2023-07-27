import { Injectable } from '@angular/core';
import * as signalR  from '@microsoft/signalr';

@Injectable({
  providedIn: 'root'
})
export class SignalrService {

  baseUrl : string = "http://localhost:7236";

  private hubConnection!: signalR.HubConnection;

  constructor() { }

  public startConnection() {
    return new Promise((resolve, reject) => {
      this.hubConnection = new signalR.HubConnectionBuilder()
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

onReceiveAlert(callback: (user:string, message: string) => void) {
  this.hubConnection.on("RecieveTransferAlert", callback);
  }


  onUpdateNotifications(callback: (user:string) => void) {
    this.hubConnection.on("UpdateNotification", callback);
    }



}
