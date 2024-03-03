import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

import { AppService } from '../../app.service';
import { RolesService } from '../roles/roles.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private AppService: AppService, private http: HttpClient, private RolesServices: RolesService
  ) { }

  getUsers() {
    const url = this.AppService.urlBase() + '/users';
    return this.http.get<any>(url, this.AppService.httpHeader());
  }

  getUser(id: number) {
    const url = this.AppService.urlBase() + `/user/${id}`;
    return this.http.get<any>(url);
  }

  getUserRole(id: number) {
    const url = this.AppService.urlBase() + `/user_roles/role/${id}`;
    return this.http.get<any>(url, this.AppService.httpHeader());
  }

  assignRoles(data: any) {
    const url = this.AppService.urlBase() + `/user_roles/assign`;
    const body = new FormData(data);
    return this.http.post<any>(url, body).pipe(
      catchError(error => {
        return throwError(this.AppService.getMessageRequest(error.status, error.error.message));
      })
    );
  }

  getRoles() {
    return this.RolesServices.getRoles();
  }

  createUser(data: any) {
    const url = this.AppService.urlBase() + `/user/create`;
    return this.http.post<any>(url, data).pipe(
      catchError(error => {
        return throwError(this.AppService.getMessageRequest(error.status, error.error.message));
      })
    );
  }

  updateUser(data: any) {
    const url = this.AppService.urlBase() + `/user/update/${data.id}`;
    return this.http.put<any>(url, data).pipe(
      catchError(error => {
        if (error.status === 422) {
          let msg = error.message === 'All fields are required' 
            ? 'Todos los campos son obligatorios.' : 'Este registro ya existe.';
          return throwError(msg);
        } else {
          return throwError("Error en la solicitud.");
        }
      })
    );
  }

  deleteUser(id: number) {
    const url = this.AppService.urlBase() + `/user/delete/${id}`;
    return this.http.delete<any>(url);
  }
}