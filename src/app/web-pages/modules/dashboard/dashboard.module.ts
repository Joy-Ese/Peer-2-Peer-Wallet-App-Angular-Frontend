import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SendmoneyPageComponent } from '../../sendmoney-page/sendmoney-page.component';
import { FundaccountPageComponent } from '../../fundaccount-page/fundaccount-page.component';
import { SnackBarComponent } from 'src/app/reuseable-components/snack-bar/snack-bar.component';
import { MaterialModule } from 'src/app/material/material.module';
import { DashboardPageComponent } from '../../dashboard-page/dashboard-page.component';
import { TransactionPageComponent } from '../../transaction-page/transaction-page.component';
import { RouterModule, Routes } from '@angular/router';
import { MiniDashboardPageComponent } from '../../mini-dashboard-page/mini-dashboard-page.component';

const routes: Routes = [
  {
    path: "",
    component: DashboardPageComponent, children: [
      {
        path: "",
        redirectTo: "minidashboard",
        pathMatch: "full"
      },
      {
        path: "minidashboard",
        component: MiniDashboardPageComponent
      },
      {
        path: "sendmoney", 
        component: SendmoneyPageComponent
      },
      {
        path: "fundaccount",
        component: FundaccountPageComponent
      },
      {
        path: "transactions",
        component: TransactionPageComponent
      },
    ]
  }
];

@NgModule({
  declarations: [
    DashboardPageComponent,
    MiniDashboardPageComponent,
    SendmoneyPageComponent,
    FundaccountPageComponent,
    TransactionPageComponent,
    SnackBarComponent,
  ],
  imports: [
    RouterModule.forChild(routes),
    MaterialModule,
    CommonModule,
    RouterModule,
  ],
  exports: [RouterModule]
})
export class DashboardModule { }
