import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

import { AppService } from 'src/app/services/app.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { RolesService } from 'src/app/services/cpanel/roles/roles.service';

interface role {
  rol: string;
  description: string;
  status: number;
}

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit {
  @ViewChild('ModalCreateRol') ModalCreateRol?: ModalDirective;
  @ViewChild('ModalUpdateRol') ModalUpdateRol?: ModalDirective;
  @ViewChild('ModalViewRolInformation') ModalViewRolInformation?: ModalDirective;
  @ViewChild('ModalPermissions') ModalPermissions?: ModalDirective;

  module: number = 4;
  modules: any[] = [];
  permission_read: boolean = true;
  permission_create: boolean = true;
  permission_update: boolean = true;
  permission_delete: boolean = true;

  roles: any[] = [];
  id: number = 0;
  rol: string = '';
  description: string = '';
  status: number = 1;

  newRole: role = {
    rol: '',
    description: '',
    status: 1
  };

  //Search
  search: string = '';
  rolesFilter: any[] = [];

  //Paginate
  currentPage = 1;
  recordPerPage = 5;

  constructor (
    private AppService: AppService, private AuthService: AuthService,
    private RolesService: RolesService, private toastr:ToastrService
  ) {
    this.AuthService.loginFalse();
    this.AppService.sidebar('roles-item');
  }

  resetForm() {
    this.newRole.rol = '';
    this.newRole.description = '';
    this.newRole.status = 1;
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

    this.RolesService.getRoles().subscribe( 
      response => {
        this.roles = response.roles.map((item: any) => {
          item.status == 1 ? item.r_status = 'Activo' : item.r_status = 'Inactivo';
          return item;
        });
        this.rolesFilter = this.roles;
      },
      error => {
        console.error('Error al obtener datos de la API:', error);
      }
    );  
  }

  getRole(id: number) {
    this.RolesService.getRole(id).subscribe(
      response => {
        this.id = response.role.id;
        this.rol = response.role.rol;
        this.description = response.role.description;
        this.status = response.role.status;
      }
    );
  }

  openModalCreateRol() {
    this.ModalCreateRol?.show();
  }

  createRol() {
    let data = {rol: this.newRole.rol, description: this.newRole.description, status: this.newRole.status};
    this.RolesService.createRol(data).subscribe(
      response => {
        if (response.role) {
          this.toastr.success(response.message, '¡Listo!', {closeButton: true});
          this.ngOnInit();
          this.resetForm();
          this.ModalCreateRol?.hide();
        }
      },
      error => {
        this.toastr.warning(error, '¡Atención!', {closeButton: true});
      }
    );
  }

  openModalUpdateRol(id: number) {
    this.getRole(id);
    this.ModalUpdateRol?.show();
  }

  updateRol(id: number) {
    let data = {id: id, rol: this.rol, description: this.description, status: this.status};
    this.RolesService.updateRol(data).subscribe(
      response => {
        if (response.role) {
          this.toastr.success(response.message, '¡Listo!', {closeButton: true});
          this.ngOnInit();
          this.ModalUpdateRol?.hide();
          this.resetForm();
        }
      },
      error => {
        this.toastr.warning(error, '¡Atención!', {closeButton: true});
      }
    );
  }

  assignPermissions() {
    let formPermissions = document.querySelector('#form-Permissions');
    this.RolesService.assignPermissions(formPermissions).subscribe(
      response => {
        if (response.permissions) {
          this.toastr.success(response.message, '¡Listo!', {closeButton: true});
        }
      },
      error => {
        this.toastr.warning(error, '¡Atención!', {closeButton: true});
      }
    );
  }

  permissionsRol(id: number) {
    this.RolesService.getPermissions(id).subscribe(
      response => {
        this.id = response.data.role;
        this.modules = response.data.modules;
      }
    );
    this.ModalPermissions?.show();
  }

  viewRolInformation(id: number) {
    this.getRole(id);
    this.ModalViewRolInformation?.show();
  }

  deleteRol(id: number) {
    Swal.fire({
      icon: 'warning',
      title: '<strong>¿Esta seguro que desea eliminar este registro?</strong>',
      showCancelButton: true,
      focusConfirm: false,
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'No, cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.RolesService.deleteRol(id).subscribe(
          response => {
            if (response.role) {
              this.toastr.success(response.message, '¡Listo!', {closeButton: true});
              this.ngOnInit();
              this.resetForm();
            }
          },
          error => {
            this.toastr.warning(error, '¡Atención!', {closeButton: true});
          }
        ); 
      }
    });
  }

  //Search
  Search() {
    this.rolesFilter = this.roles.filter((rol: { id: string, rol: string, r_status: string }) => {
      let filter = true;
      if (this.search) {
        filter = rol.id.toString().toLowerCase().includes(this.search.toLowerCase()) ||
        rol.rol.toLowerCase().includes(this.search.toLowerCase()) || 
        rol.r_status.toLowerCase().startsWith(this.search.toLowerCase());
      }
      return filter;
    });
  }

  //Paginate
  countRangeRegister(): string {
    const startIndex = (this.currentPage - 1) * this.recordPerPage + 1;
    const endIndex = Math.min(startIndex + this.recordPerPage - 1, this.rolesFilter.length);
    let msg;
    endIndex === 0 ? msg = 'No hay registros.' : msg = `Mostrando registros del ${startIndex} al ${endIndex}`;
    return msg;
  }
}
