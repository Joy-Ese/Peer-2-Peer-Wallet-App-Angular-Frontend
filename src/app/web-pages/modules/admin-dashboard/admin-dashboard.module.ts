import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BnNgIdleService } from 'bn-ng-idle';


import { AdminDashboardPageComponent } from '../../admin-dashboard-page/admin-dashboard-page.component';
import { RouterModule, Routes } from '@angular/router';
import { AdminTokenInterceptorInterceptor } from 'src/app/reuseable-components/bearer-token/admin-token-interceptor.interceptor';
import { AdminAuthorizeInterceptorInterceptor } from 'src/app/reuseable-components/bearer-token/admin-authorize-interceptor.interceptor';
import { LoadingInterceptor } from 'src/app/reuseable-components/loader/loading.interceptor';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MaterialModule } from 'src/app/material/material.module';

const routes: Routes = [
  {
    path: "",
    component: AdminDashboardPageComponent, children: [
      {
        path: "",
        redirectTo: "miniadmindashboard",
        pathMatch: "full"
      },
      // {
      //   path: "minidashboard",
      //   component: MiniDashboardPageComponent
      // },
    ]
  }
];

@NgModule({
  declarations: [
    AdminDashboardPageComponent,
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    MaterialModule,
    CommonModule,
    RouterModule,
    HttpClientModule,
  ],
  providers: [
    { 
      provide: HTTP_INTERCEPTORS, 
      useClass: AdminTokenInterceptorInterceptor, 
      multi: true
    },
    { 
      provide: HTTP_INTERCEPTORS, 
      useClass: AdminAuthorizeInterceptorInterceptor, 
      multi: true
    },
    { 
      provide: HTTP_INTERCEPTORS, 
      useClass: LoadingInterceptor, 
      multi: true
    },
    BnNgIdleService,
  ],
  exports: [RouterModule]
})
export class AdminDashboardModule { }
