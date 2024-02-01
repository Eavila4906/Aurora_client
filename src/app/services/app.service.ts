import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor() { }

  sidebar(item: string) {
    document.getElementById(item)?.classList.add('active');
  }
}
