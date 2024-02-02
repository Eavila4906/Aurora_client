import { Component, OnInit } from '@angular/core';

import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {
  constructor (private AppService: AppService) { 
    this.AppService.sidebar('reports-item');
  }

  ngOnInit(): void {
      
  }
}