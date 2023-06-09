import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { LoginPageComponent } from './web-pages/login-page/login-page.component';
import { RegisterPageComponent } from './web-pages/register-page/register-page.component';
import { MaterialModule } from './material/material.module';
import { PageNotFoundComponent } from './web-pages/page-not-found/page-not-found.component';
import { LogoutDialogContentComponent } from './reuseable-components/logout-dialog-content/logout-dialog-content.component';
import { PreSpinnerComponent } from './reuseable-components/pre-spinner/pre-spinner.component';
import { PreLoadingInterceptor } from './reuseable-components/loader/pre-loading.interceptor';
import { NotificationDialogContentComponent } from './reuseable-components/notification-dialog-content/notification-dialog-content.component';
import { SetPinDialogContentComponent } from './reuseable-components/set-pin-dialog-content/set-pin-dialog-content.component';
import { SetSecquestDialogContentComponent } from './reuseable-components/set-secquest-dialog-content/set-secquest-dialog-content.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    RegisterPageComponent,
    PageNotFoundComponent,
    LogoutDialogContentComponent,
    PreSpinnerComponent,
    NotificationDialogContentComponent,
    SetPinDialogContentComponent,
    SetSecquestDialogContentComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
  ],
  providers: [
    { 
      provide: HTTP_INTERCEPTORS, 
      useClass: PreLoadingInterceptor, 
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
