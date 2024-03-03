import { Component, OnInit } from '@angular/core';
import { AppService } from './services/app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private AppService: AppService) {}

  ngOnInit(): void {
    this.AppService.validateRole();
    console.log(this.AppService.validateRole())
  }
}
