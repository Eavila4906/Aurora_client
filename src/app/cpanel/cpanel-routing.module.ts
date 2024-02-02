import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CpanelComponent } from './cpanel.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SalesComponent } from './sales/sales.component';

const routes: Routes = [
  { path: 'principal', component: CpanelComponent,
    children: [
      { path: '', component: DashboardComponent }
    ]
  },

  { path: 'mi_negocio', component: CpanelComponent,
    children: [
      { path: 'ventas', component: SalesComponent }
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
