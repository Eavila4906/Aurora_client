import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';
import { ModalModule } from 'ngx-bootstrap/modal';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';

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
import { StudentsComponent } from './myTransportation/students/students.component';
import { ChargeComponent } from './myTransportation/charge/charge.component';
import { VehiclesComponent } from './myTransportation/vehicles/vehicles.component';
import { ReportsMtComponent } from './myTransportation/reports-mt/reports-mt.component';

@NgModule({
  declarations: [
    CpanelComponent,
    DashboardComponent,
    SalesComponent,
    AccountsPayableComponent,
    AccountsReceivableComponent,
    ReportsComponent,
    CustomersComponent,
    SuppliersComponent,
    SettingsComponent,
    RolesComponent,
    UsersComponent,
    StudentsComponent,
    ChargeComponent,
    VehiclesComponent,
    ReportsMtComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ModalModule.forRoot(),
    ToastrModule.forRoot(),
    SharedModule,
    FormsModule,
    NgxPaginationModule
  ], 
  exports: [
    CpanelComponent,
    DashboardComponent,
    SalesComponent,
    AccountsPayableComponent,
    AccountsReceivableComponent,
    ReportsComponent,
    CustomersComponent,
    SuppliersComponent,
    SettingsComponent,
    RolesComponent,
    UsersComponent,
    StudentsComponent,
    ChargeComponent,
    VehiclesComponent,
    ReportsMtComponent
  ]
})
export class CpanelModule { }
