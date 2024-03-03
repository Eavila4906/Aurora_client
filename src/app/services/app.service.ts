import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  rol: any;
  constructor(
    private http: HttpClient, private toastr: ToastrService, private router: Router,
  ) { }

  environment() {
    return 'production';
  }

  token() {
    const userData = localStorage.getItem('userData');
    if (userData !== null) {
      let userdata = JSON.parse(userData);
      return userdata.access_token;
    }
  }

  httpHeader() {
    return {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.token()}`
      })
    };
  }

  urlBase() {
    const urlBase = 'http://127.0.0.1:8000/api';
    return urlBase;
  }

  sidebar(item: string) {
    document.getElementById(item)?.classList.add('active');
  }

  getPermissions(mId: number) {
    const rId = this.validateRole();
    const url = this.urlBase() + `/permissions/module/${mId}/role/${rId}`;
    return this.http.get<any>(url);
  }

  getPermissionsModules() {
    const id = this.validateRole();
    const url = this.urlBase() + `/permissions/modules/${id}`;
    return this.http.get<any>(url);
  }

  getMessageRequest(status: number, message: string) {
    let errorMessage = '';

    if (status === 422) {
      if (message === 'All fields are required') {
        errorMessage = 'Todos los campos son obligatorios.';
      } else if (message === 'This record already exists.') {
        errorMessage = 'Este registro ya existe.';
      } else if (message === 'Please change the username.') {
        errorMessage = 'Por favor, cambie el nombre de usuario.';
      } else if (message === 'Please change the email.') {
        errorMessage = 'Por favor, cambie el correo electrónico.';
      } else if (message === 'The password must have at least 6 characters.') {
        errorMessage = 'La contraseña debe tener al menos 6 caracteres.';
      } else if (message === 'You cannot delete a role that has permissions assigned to it.') {
        errorMessage = 'No puede eliminar un rol que tenga permisos asignados.';
      } else if (message === 'You cannot delete a role that is assigned to a user.') {
        errorMessage = 'No puede eliminar un rol asignado a un usuario.';
      } else {
        errorMessage = 'Error, intentelo mas tarde.';
      }
    } else {
      errorMessage = 'Error en la solicitud.';
    }

    return errorMessage;
  }

  userData() {
    const url = this.urlBase() + `/authenticated/user`;
    return this.http.get<any>(url)
  }

  validateRole(): any {
    var userDataString: any = [];
    const role = localStorage.getItem('rolId');

    this.userData().subscribe(response => {
      userDataString = response;

      if (userDataString !== null) {
        const userData = userDataString;
  
        if (userData.user.roles && Array.isArray(userData.user.roles)) {
          let roleExists = userData.user.roles.some(function (roleObj: any) {
            return roleObj.id == role;
          });
  
          if (roleExists) {
            return role;
          } else {
            const url = this.urlBase() + '/logout';
            this.http.post(url, null, this.httpHeader()).pipe(
              catchError(error => {
                return throwError("Ha ocurrido un error, intentelo mas tarde.");
              })
            ).subscribe(response => {
              if (response) {
                this.toastr.warning('Se ha cerrado la sessión porque se detectó una acción mal intencionada.', '¡Atención!', { closeButton: true, timeOut: 12000 });
                this.toastr.error('Usted no cuenta con este rol asignado.', '¡Error!', { closeButton: true, timeOut: 12000 });
                localStorage.clear();
                this.router.navigate(['/login']);
              }
            });
          }
  
        } else {
          this.toastr.error('El usuario no tiene roles definidos.', '¡Error!', { closeButton: true });
        }
      } else {
        this.toastr.error('No existe una sesión activa.', '¡Error!', { closeButton: true });
      }

      return role;

    });
    
    return role;
    
  }
}
