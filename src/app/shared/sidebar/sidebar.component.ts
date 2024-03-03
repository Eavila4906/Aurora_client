import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  base_url: string = '';

  module_dashboard: boolean = true;
  module_settings: boolean = true;
  module_users: boolean = true;
  module_roles: boolean = true;

  section_myTransportation: boolean = true;

  section_myBusiness: boolean = true;


  constructor(private AppService: AppService, private cdr: ChangeDetectorRef) {
    this.base_url = AppService.urlBase();
  }

  ngOnInit(): void {
    this.AppService.getPermissionsModules().subscribe(
      response => {
        this.module_dashboard = response.permissions[1].r == 1 ? true : false;
        this.module_settings = response.permissions[2].r == 1 ? true : false;
        this.module_users = response.permissions[3].r == 1 ? true : false;
        this.module_roles = response.permissions[4].r == 1 ? true : false;

        this.section_myTransportation = response.permissions[5].r == 1 ? true : false;
        this.section_myBusiness = response.permissions[10].r == 1 ? true : false;
      },
      error => {
        console.error('Error al obtener datos de la API:', error);
      }
    );
  }
}
