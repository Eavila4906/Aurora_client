import { Component, OnInit } from '@angular/core';

import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-accounts-receivable',
  templateUrl: './accounts-receivable.component.html',
  styleUrls: ['./accounts-receivable.component.css']
})
export class AccountsReceivableComponent implements OnInit {
  constructor (private AppService: AppService) { 
    this.AppService.sidebar('accounts-receivable-item');
  }

  ngOnInit(): void {
      
  }
}
