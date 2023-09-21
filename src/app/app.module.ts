import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';


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
import { ContactAdminComponent } from './web-pages/contact-admin/contact-admin.component';
import { SignalrService } from './services/signalr.service';
import { UserDataService } from './services/user-data.service';
import { PreOutChatDialogContentComponent } from './reuseable-components/pre-out-chat-dialog-content/pre-out-chat-dialog-content.component';
import { OutChatDialogContentComponent } from './reuseable-components/out-chat-dialog-content/out-chat-dialog-content.component';
import { ResetPasswordPageComponent } from './web-pages/reset-password-page/reset-password-page.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    RegisterPageComponent,
    PageNotFoundComponent,
    LogoutDialogContentComponent,
    PreSpinnerComponent,
    NotificationDialogContentComponent,
    ContactAdminComponent,
    PreOutChatDialogContentComponent,
    OutChatDialogContentComponent,
    ResetPasswordPageComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    MatExpansionModule,
    MatCardModule,
    MatDialogModule,
  ],
  providers: [
    { 
      provide: HTTP_INTERCEPTORS, 
      useClass: PreLoadingInterceptor, 
      multi: true
    },
    SignalrService,
    UserDataService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
