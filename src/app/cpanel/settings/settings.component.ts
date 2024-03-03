import { Component, OnInit } from '@angular/core';

import { AppService } from 'src/app/services/app.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  constructor (private AppService: AppService, private AuthService: AuthService) { 
    this.AuthService.loginFalse();
    this.AppService.sidebar('settings-item');
  }

  ngOnInit(): void {
      
  }
}