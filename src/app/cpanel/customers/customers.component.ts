import { Component, OnInit } from '@angular/core';

import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {
  constructor (private AppService: AppService) { 
    this.AppService.sidebar('customers-item');
  }

  ngOnInit(): void {
      
  }
}
