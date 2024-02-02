import { Component, OnInit } from '@angular/core';

import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css']
})
export class SalesComponent {
  constructor (private AppService: AppService) {
    this.AppService.sidebar('sales-item');
  }

  ngOnInit(): void {
      
  }
}
