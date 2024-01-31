import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthRoutingModule } from './auth/auth-routing.module';
import { CpanelRoutingModule } from './cpanel/cpanel-routing.module';

import { PageComponent } from './404/page/page.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', component: PageComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    AuthRoutingModule,
    CpanelRoutingModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
