import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';

import { LoginService } from 'src/app/services/auth/login.service';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  userData: any = localStorage.getItem('userData');
  id_user: number = 0;
  user: string = '';
  username: string = '';
  rolId: any;
  rol: any;

  constructor(
    private router:Router,
    private AppService: AppService,
    private LoginService: LoginService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    if (this.userData !== null) {
      let userdata = JSON.parse(this.userData);
      this.username = userdata.user.username;
      this.rol = localStorage.getItem('rol') !== null ? localStorage.getItem('rol') : null;
    }
  }

  logout() {
    Swal.fire({
      icon: 'warning',
      title: '<strong>¿Desea cerrar la sesión?</strong>',
      showCancelButton: true,
      focusConfirm: false,
      confirmButtonText: 'Si',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed) {
        this.LoginService.logout().subscribe(
          response => {
            if (response) {
              this.toastr.success('', '¡Hasta pronto!', { closeButton: true });
              localStorage.clear();
              this.router.navigate(['/login']);
            }
          },
          error => {
            this.toastr.error(error.message, '¡Error!', { closeButton: true });
          }
        );
      }
    });
  }
}
