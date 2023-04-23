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
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { TokenInterceptorInterceptor } from 'src/app/reuseable-components/bearer-token/token-interceptor.interceptor';
import { AuthorizeInterceptorInterceptor } from 'src/app/reuseable-components/bearer-token/authorize-interceptor.interceptor';
import { ProfilePageComponent } from '../../profile-page/profile-page.component';
import { FormsModule } from '@angular/forms';
import { FilterPipe } from 'src/app/models/filter.pipe';

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
      {
        path: "profile",
        component: ProfilePageComponent
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
    FilterPipe,
  ],
  imports: [
    RouterModule.forChild(routes),
    MaterialModule,
    CommonModule,
    RouterModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [
    { 
      provide: HTTP_INTERCEPTORS, 
      useClass: TokenInterceptorInterceptor, 
      multi: true
    },
    { 
      provide: HTTP_INTERCEPTORS, 
      useClass: AuthorizeInterceptorInterceptor, 
      multi: true
    },
  ],
  exports: [RouterModule]
})
export class DashboardModule { }
