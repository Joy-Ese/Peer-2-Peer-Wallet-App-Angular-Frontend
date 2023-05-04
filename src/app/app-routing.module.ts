import { inject, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { RegisterPageComponent } from './web-pages/register-page/register-page.component';
import { LoginPageComponent } from './web-pages/login-page/login-page.component';
import { AuthService } from './auth/auth.service';
import { PageNotFoundComponent } from './web-pages/page-not-found/page-not-found.component';

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
    path: "notfound",
    component: PageNotFoundComponent
  },
  {
    path: "dashboard",
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
