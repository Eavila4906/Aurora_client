import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private Router: Router) { }

  loginFalse() {
    let userData = localStorage.getItem('userData');
    if (userData === null) {
      this.Router.navigate(['/login']);
    }
  }

  loginTrue() {
    let userData = localStorage.getItem('userData');
    if (userData !== null) {
      let data = JSON.parse(userData);
      if (data.access_token) {
        this.Router.navigate(['/principal']);
      }
    }
  }
}