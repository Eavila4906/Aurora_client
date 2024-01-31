import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CpanelComponent } from './cpanel.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  { path: 'principal', component: CpanelComponent,
    children: [
      { path: '', component: DashboardComponent },
      /*{ path: 'eventos', component: EventsComponent },
      { path: 'sitio_web', component: WebsiteComponent },
      { path: 'usuarios', component: UsersComponent }*/
    ]
  },
];
@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes, { useHash: true })
  ], 
  exports: [
    RouterModule
  ]
})
export class CpanelRoutingModule { }
