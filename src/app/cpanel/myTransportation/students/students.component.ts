import { Component, OnInit } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

import { AppService } from 'src/app/services/app.service'; 
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {

  constructor (
    private AppService: AppService, private AuthService: AuthService, private toastr:ToastrService
  ) {
    this.AuthService.loginFalse();
    this.AppService.sidebar('students-item');
  }

  ngOnInit(): void {
      
  }
}
