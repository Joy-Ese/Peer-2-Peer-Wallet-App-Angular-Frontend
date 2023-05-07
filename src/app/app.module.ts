import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { LoginPageComponent } from './web-pages/login-page/login-page.component';
import { RegisterPageComponent } from './web-pages/register-page/register-page.component';
import { MaterialModule } from './material/material.module';
import { PageNotFoundComponent } from './web-pages/page-not-found/page-not-found.component';
import { LogoutDialogContentComponent } from './reuseable-components/logout-dialog-content/logout-dialog-content.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    RegisterPageComponent,
    PageNotFoundComponent,
    LogoutDialogContentComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
