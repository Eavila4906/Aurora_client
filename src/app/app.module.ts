import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageComponent } from './404/page/page.component';

import { SpinnerInterceptor } from './spinner/interceptor/spinner.interceptor';

import { AuthModule } from './auth/auth.module';
import { CpanelModule } from './cpanel/cpanel.module';
import { SharedModule } from './shared/shared.module';
import { SpinnerComponent } from './spinner/spinner.component';

@NgModule({
  declarations: [
    AppComponent,
    PageComponent,
    SpinnerComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    AppRoutingModule,
    AuthModule,
    SharedModule,
    CpanelModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: SpinnerInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
