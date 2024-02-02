import { Component, OnInit } from '@angular/core';

import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-accounts-payable',
  templateUrl: './accounts-payable.component.html',
  styleUrls: ['./accounts-payable.component.css']
})
export class AccountsPayableComponent implements OnInit {
  constructor (private AppService: AppService) { 
    this.AppService.sidebar('accounts-payable-item');
  }

  ngOnInit(): void {
      
  }
}
