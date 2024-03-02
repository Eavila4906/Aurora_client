import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

import { AppService } from '../../app.service'; 

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  constructor(
    private AppService: AppService, private http: HttpClient
  ) { }

  getRoles() {
    const url = this.AppService.urlBase() + '/roles';
    return this.http.get<any>(url);
  }

  getRole(id: number) {
    const url = this.AppService.urlBase() + '/role/'+id;
    return this.http.get<any>(url);
  }

  getPermissions(id: number) {
    const url = this.AppService.urlBase() + `/permissions/role/${id}`;
    return this.http.get<any>(url);
  }

  assignPermissions(data: any) {
    const url = this.AppService.urlBase() + '/permissions/assign';
    const body = new FormData(data);
    return this.http.post<any>(url, body).pipe(
      catchError(error => {
        return throwError(this.AppService.getMessageRequest(error.status, error.error.message));
      })
    );
  }

  createRol(data: any) {
    const url = this.AppService.urlBase() + '/role/create';
    return this.http.post<any>(url, data).pipe(
      catchError(error => {
        return throwError(this.AppService.getMessageRequest(error.status, error.error.message));
      })
    );
  }

  updateRol(data: any) {
    const url = this.AppService.urlBase() + `/role/update/${data.id}`;
    return this.http.put<any>(url, data).pipe(
      catchError(error => {
        return throwError(this.AppService.getMessageRequest(error.status, error.error.message));
      })
    );
  }

  deleteRol(id: number) {
    const url = this.AppService.urlBase() + `/role/delete/${id}`;
    return this.http.delete<any>(url).pipe(
      catchError(error => {
        return throwError(this.AppService.getMessageRequest(error.status, error.error.message));
      })
    );
  }
  
}
