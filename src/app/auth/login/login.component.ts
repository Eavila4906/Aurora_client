import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';

import { AuthService } from 'src/app/services/auth/auth.service';
import { LoginService } from 'src/app/services/auth/login.service';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(
    private router:Router, 
    private LoginService: LoginService, 
    private AuthService: AuthService,
    private AppService: AppService,
    private toastr: ToastrService
  ) { 
    this.AuthService.loginTrue();
    //this.base_url = AppService.urlBase();
  }

  login() {
    let formData = document.querySelector('#form-login');
    this.LoginService.login(formData).subscribe(
      response => {
        if (response.access_token) {
          let rolId = response.user.roles[0].id;
          let rol = response.user.roles[0].rol;

          this.router.navigate(['/principal']);

          let userData = {
            access_token: response.access_token,
            user: {
              id: response.user.id,
              username: response.user.username,
              name: response.user.name,
              lastname: response.user.lastname
            }
          }

          localStorage.setItem('userData', JSON.stringify(userData));
          localStorage.setItem('rolId', rolId);
          localStorage.setItem('rol', rol);

          this.toastr.success('Aurora Computer System', '¡Bienvenido!', {closeButton: true});
        }
      },
      error => {
        this.toastr.warning(error, '¡Atención!', {closeButton: true});
      }
    );
  }

}



