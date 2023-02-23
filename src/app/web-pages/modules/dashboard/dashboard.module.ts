import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { SendmoneyPageComponent } from '../../sendmoney-page/sendmoney-page.component';
import { FundaccountPageComponent } from '../../fundaccount-page/fundaccount-page.component';
import { SnackBarComponent } from 'src/app/reuseable-components/snack-bar/snack-bar.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from 'src/app/material/material.module';
import { DashboardPageComponent } from '../../dashboard-page/dashboard-page.component';
import { TransactionPageComponent } from '../../transaction-page/transaction-page.component';


@NgModule({
  declarations: [
    DashboardPageComponent,
    SendmoneyPageComponent,
    FundaccountPageComponent,
    TransactionPageComponent,
    SnackBarComponent,
  ],
  imports: [
    // BrowserModule,
    // BrowserAnimationsModule,
    MaterialModule,
    CommonModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
