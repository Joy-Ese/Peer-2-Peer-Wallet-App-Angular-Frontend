import { inject, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { RegisterPageComponent } from './web-pages/register-page/register-page.component';
import { LoginPageComponent } from './web-pages/login-page/login-page.component';
import { AuthService } from './auth/auth.service';
import { PageNotFoundComponent } from './web-pages/page-not-found/page-not-found.component';
import { ContactAdminComponent } from './web-pages/contact-admin/contact-admin.component';
import { ResetPasswordPageComponent } from './web-pages/reset-password-page/reset-password-page.component';

const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    redirectTo: "notfound"
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
    path: "contactadmin",
    component: ContactAdminComponent
  },
  {
    path: "notfound",
    component: PageNotFoundComponent
  },
  {
    path: "resetpass",
    component: ResetPasswordPageComponent
  },
  {
    path: "dashboard",
    canMatch: [() => inject(AuthService).isAuthenticated()],
    // canActivate: [AuthGuard],
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
