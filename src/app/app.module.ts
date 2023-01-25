import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { LoginPageComponent } from './web-pages/login-page/login-page.component';
import { RegisterPageComponent } from './web-pages/register-page/register-page.component';
import { DashboardPageComponent } from './web-pages/dashboard-page/dashboard-page.component';
import { SendmoneyPageComponent } from './web-pages/sendmoney-page/sendmoney-page.component';
import { FundaccountPageComponent } from './web-pages/fundaccount-page/fundaccount-page.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    RegisterPageComponent,
    DashboardPageComponent,
    SendmoneyPageComponent,
    FundaccountPageComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
