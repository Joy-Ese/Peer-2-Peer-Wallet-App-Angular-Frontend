import { Component, OnDestroy, OnInit } from '@angular/core';
import { SignalrService } from './services/signalr.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy{

  title = 'Wallet-App';

  constructor(private signalrService : SignalrService) {
  }

  ngOnInit() {
    this.signalrService.startConnection();
  }

  ngOnDestroy() {
    this.signalrService.hubConnection.off("askServerResponse");
  }

}
