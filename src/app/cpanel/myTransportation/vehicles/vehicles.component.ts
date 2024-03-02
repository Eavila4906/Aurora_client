import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

import { AppService } from 'src/app/services/app.service';
import { AuthService } from 'src/app/services/auth/auth.service';

interface vehicle {
  name: string;
  ability: number;
  availability: number;
  status: number;
}

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.css']
})
export class VehiclesComponent implements OnInit {
  @ViewChild('ModalCreateVehicle') ModalCreateVehicle?: ModalDirective;
  @ViewChild('ModalUpdateRol') ModalUpdateRol?: ModalDirective;
  @ViewChild('ModalViewRolInformation') ModalViewRolInformation?: ModalDirective;
  @ViewChild('ModalPermissions') ModalPermissions?: ModalDirective;

  module: number = 6;
  permission_read: boolean = true;
  permission_create: boolean = true;
  permission_update: boolean = true;
  permission_delete: boolean = true;

  vehicles: any[] = [];
  id: number = 0;
  name: string = '';
  ability: number = 0;
  availability: number = 0;
  status: number = 1;

  newVehicle: vehicle = {
    name: '',
    ability: 0,
    availability: 0,
    status: 1
  }

  frequency: any[] = [{ id: 1, frequency: 'Mensual' }, { id: 2, frequency: 'Quincenal' }, { id: 2, frequency: 'Semanal' }];
  cost: number = 0.00;

  //Search
  search: string = '';
  vehiclesFilter: any[] = [
    {id: 1, name: 'Furgoneta Mazda', ability: 11, availability: 8, status: 1, r_status: 'Activo'}
  ];

  //Paginate
  currentPage = 1;
  recordPerPage = 5;

  constructor (
    private AppService: AppService, private AuthService: AuthService, private toastr:ToastrService
  ) {
    this.AuthService.loginFalse();
    this.AppService.sidebar('vehicle-item');
  }

  ngOnInit(): void {
    this.AppService.getPermissions(this.module).subscribe( 
      response => {
        this.permission_read = response.permissions.r == 1 ? true : false;
        this.permission_create = response.permissions.w == 1 ? true : false;
        this.permission_update = response.permissions.u == 1 ? true : false;
        this.permission_delete = response.permissions.d == 1 ? true : false;
      },
      error => {
        console.error('Error al obtener datos de la API:', error);
      }
    );
      
  }

  /**
   * Modals
   */
  openModalCreateVehicle() {
    this.ModalCreateVehicle?.show();
  }
  openModalEnrollStudent(id: number) {}
  openModalInfoVehicle(id: number) {}
  openModalUpdateVehicle(id: number) {}
  deleteVehicle(id: number) {}

  /**
   * Data processing
   */
  createVehicle() {}


  /**
   * Additional functions
   */
  Search() {
    this.vehiclesFilter = this.vehicles.filter((vehicle: { id: string, name: string, r_status: string }) => {
      let filter = true;
      if (this.search) {
        filter = vehicle.id.toString().toLowerCase().includes(this.search.toLowerCase()) ||
        vehicle.name.toLowerCase().includes(this.search.toLowerCase()) || 
        vehicle.r_status.toLowerCase().startsWith(this.search.toLowerCase());
      }
      return filter;
    });
  }

  countRangeRegister(): string {
    const startIndex = (this.currentPage - 1) * this.recordPerPage + 1;
    const endIndex = Math.min(startIndex + this.recordPerPage - 1, this.vehiclesFilter.length);
    let msg;
    endIndex === 0 ? msg = 'No hay registros.' : msg = `Mostrando registros del ${startIndex} al ${endIndex}`;
    return msg;
  }
  
}
