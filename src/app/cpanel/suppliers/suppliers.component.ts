import { Component, OnInit } from '@angular/core';

import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-suppliers',
  templateUrl: './suppliers.component.html',
  styleUrls: ['./suppliers.component.css']
})
export class SuppliersComponent implements OnInit {
  constructor (private AppService: AppService) { 
    this.AppService.sidebar('suppliers-item');
  }

  ngOnInit(): void {
      
  }
}