import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageComponent } from './404/page/page.component';

import { AuthModule } from './auth/auth.module';
import { CpanelModule } from './cpanel/cpanel.module';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    PageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    SharedModule,
    CpanelModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
