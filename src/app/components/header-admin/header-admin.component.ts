import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-admin',
  standalone: true,
  imports: [],
  templateUrl: './header-admin.component.html',
  styleUrl: './header-admin.component.scss'
})
export class HeaderAdminComponent {
  constructor(private route:Router){}

  irAhome(){
    this.route.navigate(['/adminHome']);

  }
  camion(){
    this.route.navigate(['/camiones']);

  }

  informacion(){
    this.route.navigate(['/informacion']);

  }
  notificaciones(){
    this.route.navigate(['/notificaciones']);

  }

  recoleccio(){
    this.route.navigate(['/recoleccion']);

  }
}
