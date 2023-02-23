import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardPageComponent } from '../../dashboard-page/dashboard-page.component';
import { FundaccountPageComponent } from '../../fundaccount-page/fundaccount-page.component';
import { SendmoneyPageComponent } from '../../sendmoney-page/sendmoney-page.component';
import { TransactionPageComponent } from '../../transaction-page/transaction-page.component';

const routes: Routes = [
  {
    path: "",
    component: DashboardPageComponent, children: [
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
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
