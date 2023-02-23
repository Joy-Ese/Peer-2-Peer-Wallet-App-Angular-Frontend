import { inject, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { RegisterPageComponent } from './web-pages/register-page/register-page.component';
import { LoginPageComponent } from './web-pages/login-page/login-page.component';
import { DashboardPageComponent } from './web-pages/dashboard-page/dashboard-page.component';
import { AuthGuard } from './auth/auth.guard';
import { AuthService } from './auth/auth.service';

const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    redirectTo: "login"
  },
  {
    path: "register",
    component: RegisterPageComponent,
  },
  {
    path: "login",
    component: LoginPageComponent
  },
  {
    path: "dashboard",
    // component: DashboardPageComponent,  
    // canActivate: [AuthGuard],
    canMatch: [() => inject(AuthService).isAuthenticated()],
    loadChildren: () => import("./web-pages/modules/dashboard/dashboard.module").then(d => d.DashboardModule)
  },
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
