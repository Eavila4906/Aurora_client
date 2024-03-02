import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CpanelComponent } from './cpanel.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SalesComponent } from './sales/sales.component';
import { AccountsPayableComponent } from './accounts-payable/accounts-payable.component';
import { AccountsReceivableComponent } from './accounts-receivable/accounts-receivable.component';
import { ReportsComponent } from './reports/reports.component';
import { CustomersComponent } from './customers/customers.component';
import { SuppliersComponent } from './suppliers/suppliers.component';
import { SettingsComponent } from './settings/settings.component';
import { RolesComponent } from './roles/roles.component';
import { UsersComponent } from './users/users.component';
import { ChargeComponent } from './myTransportation/charge/charge.component';
import { ReportsMtComponent } from './myTransportation/reports-mt/reports-mt.component';
import { VehiclesComponent } from './myTransportation/vehicles/vehicles.component';
import { StudentsComponent } from './myTransportation/students/students.component';

const routes: Routes = [
  { 
    path: 'principal', component: CpanelComponent,
    children: [
      { path: '', component: DashboardComponent }
    ]
  },

  { 
    path: 'mi_negocio', component: CpanelComponent,
    children: [
      { path: 'ventas', component: SalesComponent },
      { path: 'cuentas_por_pagar', component: AccountsPayableComponent },
      { path: 'cuentas_por_cobrar', component: AccountsReceivableComponent },
      { path: 'reportes', component: ReportsComponent },
      { path: 'clientes', component: CustomersComponent },
      { path: 'proovedores', component: SuppliersComponent }
    ]
  },

  { 
    path: 'mi_transporte', component: CpanelComponent,
    children: [
      { path: 'cobrar', component: ChargeComponent },
      { path: 'reportes', component: ReportsMtComponent },
      { path: 'vehiculo', component: VehiclesComponent },
      { path: 'estudiantes', component: StudentsComponent }
    ]
  },

  {
    path: 'sistema', component: CpanelComponent,
    children: [
      { path: 'roles&permisos', component: RolesComponent },
      { path: 'usuarios', component: UsersComponent },
      { path: 'configuraciones', component: SettingsComponent }
    ]
  }
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
