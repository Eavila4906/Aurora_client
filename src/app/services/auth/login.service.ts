import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

import { AppService } from '../app.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private AppService: AppService, private http: HttpClient) { }

  login(data: any) {
    const url = this.AppService.urlBase() + '/login';
    const body =new FormData(data);
    return this.http.post<any>(url, body).pipe(
      catchError(error => {
        if (error.status === 401) {
          return throwError("Credenciales incorrectas");
        } else {
          return throwError(this.AppService.getMessageRequest(error.status, error.error.message));
        }
      })
    );
  }

  logout() {
    const url = this.AppService.urlBase() + '/logout';
    return this.http.post(url, null).pipe(
      catchError(error => {
        return throwError("Ha ocurrido un error, intentelo mas tarde.");
      })
    );
  }
}
