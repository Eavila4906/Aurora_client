import { Component, OnInit } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

import { AppService } from 'src/app/services/app.service'; 
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-reports-mt',
  templateUrl: './reports-mt.component.html',
  styleUrls: ['./reports-mt.component.css']
})
export class ReportsMtComponent implements OnInit {

  constructor (
    private AppService: AppService, private AuthService: AuthService, private toastr:ToastrService
  ) {
    this.AuthService.loginFalse();
    this.AppService.sidebar('reportsMT-item');
  }

  ngOnInit(): void {
      
  }

}
