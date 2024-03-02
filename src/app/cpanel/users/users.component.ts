import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

import { AuthService } from 'src/app/services/auth/auth.service';
import { AppService } from 'src/app/services/app.service';
import { UserService } from 'src/app/services/cpanel/user/user.service';

interface user {
  name: string;
  lastname: string;
  username: string;
  email: string;
  roleId: number;
  status: number;
}

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  @ViewChild('ModalCreateUser') ModalCreateUser?: ModalDirective;
  @ViewChild('ModalUpdateUser') ModalUpdateUser?: ModalDirective;
  @ViewChild('ModalViewUserInformation') ModalViewUserInformation?: ModalDirective;
  @ViewChild('ModalAssignRol') ModalAssignRol?: ModalDirective;

  module: number = 3;
  permission_read: boolean = true;
  permission_create: boolean = true;
  permission_update: boolean = true;
  permission_delete: boolean = true;

  users: any[] = [];
  id: number = 0;
  name: string = '';
  lastname: string = '';
  username: string = '';
  email: string = '';
  roleId: number = 0;
  rol: string = '';
  status: number = 1;

  newUser: user = {
    name: '',
    lastname: '',
    username: '',
    email: '',
    roleId: 0,
    status: 1
  }

  roles: any[] = [];
  roles2: any[] = [];
  roles_fv: any[] = [];
  user_log: any = localStorage.getItem('rolId') ? localStorage.getItem('rolId') : null;
  userData: any = localStorage.getItem('userData') ? localStorage.getItem('userData') : null;
  userdata: any = this.userData ? JSON.parse(this.userData) : null;
  username_log: any = this.userdata ? this.userdata.username : null;

  //Search
  search: string = '';
  usersFilter: any[] = [];

  //Paginate
  currentPage = 1;
  recordPerPage = 5;

  constructor(
    private AppService: AppService, private AuthService: AuthService,
    private UserService: UserService, private toastr: ToastrService
  ) {
    this.AuthService.loginFalse();
    console.log('hols')
    this.AppService.sidebar('users-item');
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

    this.UserService.getUsers().subscribe(
      response => {
        this.users = response.users.map((item: any) => {
          item.status == 1 ? item.r_status = 'Activo' : item.r_status = 'Inactivo';

          if (item.roles && item.roles.length > 0) {
            item.rolesList = item.roles.map((role: any) => role.rol).join(', ');
          } else {
            item.rolesList = 'No asignado';
          }

          return item;
        });
        this.usersFilter = this.users;
      },
      error => {
        console.error('Error al obtener datos de la API:', error);
      }
    );
  }

  generateUsername(name: string): string {
    const firstName = name.split(' ')[0].toLowerCase();
    const randomNumber1 = Math.floor(Math.random() * 10);
    const randomNumber2 = Math.floor(Math.random() * 10);

    const date = new Date();
    const randomDateNumber1 = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    const randomDateNumber2 = date.getMonth() < 9 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1);
    const username = firstName + randomNumber1.toString() + randomNumber2.toString() + randomDateNumber1.toString() + randomDateNumber2.toString();
    return username;
  }


  resetForm() {
    this.newUser.name = '';
    this.newUser.lastname = '';
    this.newUser.email = '';
    this.newUser.roleId = 0;
    this.newUser.status = 1;
  }

  openModalCreateUser() {
    this.UserService.getRoles().subscribe(
      response => {
        this.roles2 = response.roles;
        let listRoles = this.roles2.filter(object => object.status === 1 && (this.user_log === 2 ? (object.id !== 1 && object.id !== 2) : object.id !== 1));
        this.roles_fv = listRoles;
      }
    );
    this.ModalCreateUser?.show();
  }

  createUser() {
    let username = this.generateUsername(this.newUser.name);
    let data = {
      name: this.newUser.name,
      lastname: this.newUser.lastname,
      username: username,
      rol: this.newUser.roleId,
      email: this.newUser.email,
      password: username,
      status: this.newUser.status
    }

    this.UserService.createUser(data).subscribe(
      response => {
        if (response.user) {
          this.toastr.success(response.message, '¡Listo!', { closeButton: true });
          this.ngOnInit();
          this.resetForm();
          this.ModalCreateUser?.hide();
        }
      },
      error => {
        this.toastr.warning(error, '¡Atención!', { closeButton: true });
      }
    );
  }

  openModalAssignRol(id: number) {
    this.UserService.getUserRole(id).subscribe(
      response => {
        this.id = response.userRoles.user;
        this.roles = response.userRoles.rol;
      }
    );
    this.ModalAssignRol?.show();
  }

  AssignRol() {
    let formUserRoles = document.querySelector('#form-userroles');
    this.UserService.assignRoles(formUserRoles).subscribe(
      response => {
        if (response.user_roles) {
          this.toastr.success(response.message, '¡Listo!', { closeButton: true });
          this.ngOnInit();
          this.ModalAssignRol?.hide();
        }
      },
      error => {
        this.toastr.warning(error, '¡Atención!', {closeButton: true});
      }
    );
  }

  viewUserInformation(id: number) {
    this.UserService.getUser(id).subscribe(
      response => {
        this.id = response.user.id;
        this.name = response.user.name;
        this.lastname = response.user.lastname;
        this.username = response.user.username;
        this.email = response.user.email;
        if (response.user && response.user.roles && response.user.roles.length > 0) {
          this.rol = response.user.roles.map((item: any) => {
            return item.rol;
          }).join(', ');
        } else {
          this.rol = 'No asignado';
        }
        this.status = response.user.status;
      }
    );
    this.ModalViewUserInformation?.show();
  }

  openModalUpdateUser(id: number) {
    this.UserService.getUser(id).subscribe(
      response => {
        this.id = response.user.id;
        this.name = response.user.name;
        this.lastname = response.user.lastname;
        this.email = response.user.email;
        this.status = response.user.status;
      }
    );
    this.ModalUpdateUser?.show();
  }

  updateUser() {
    let data = {
      id: this.id,
      name: this.name,
      lastname: this.lastname,
      email: this.email,
      status: this.status
    }

    this.UserService.updateUser(data).subscribe(
      response => {
        if (response.user) {
          this.toastr.success(response.message, '¡Listo!', {closeButton: true});
          this.ngOnInit();
          this.ModalUpdateUser?.hide();
          this.resetForm();
        }
      },
      error => {
        this.toastr.warning(error, '¡Atención!', {closeButton: true});
      }
    );
  }

  deleteUser(id: number) {
    Swal.fire({
      icon: 'warning',
      title: '<strong>¿Esta seguro que desea eliminar este registro?</strong>',
      showCancelButton: true,
      focusConfirm: false,
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'No, cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.UserService.deleteUser(id).subscribe(
          response => {
            if (response.user) {
              this.toastr.success(response.message, '¡Listo!', { closeButton: true });
              this.ngOnInit();
              this.resetForm();
            }
          },
          error => {
            this.toastr.error(error.message, '¡Error!', { closeButton: true });
          }
        );
      }
    });
  }

  //Search
  Search() {
    this.usersFilter = this.users.filter((user: { id: string, username: string, email: string, rolesList: string, r_status: string }) => {
      let filter = true;
      if (this.search) {
        filter = user.id.toString().toLowerCase().includes(this.search.toLowerCase()) ||
          user.username.toLowerCase().includes(this.search.toLowerCase()) ||
          user.email.toLowerCase().includes(this.search.toLowerCase()) ||
          user.rolesList.toLowerCase().includes(this.search.toLowerCase()) ||
          user.r_status.toLowerCase().startsWith(this.search.toLowerCase());
      }
      return filter;
    });
  }

  //Paginate
  countRangeRegister(): string {
    const startIndex = (this.currentPage - 1) * this.recordPerPage + 1;
    const endIndex = Math.min(startIndex + this.recordPerPage - 1, this.usersFilter.length);
    let msg;
    endIndex === 0 ? msg = 'No hay registros.' : msg = `Mostrando registros del ${startIndex} al ${endIndex}`;
    return msg;
  }
}
