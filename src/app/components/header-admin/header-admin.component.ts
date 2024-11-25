import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CrudNotificacionesComponent } from '../crud-notificaciones/crud-notificaciones.component';
import { CrudInformacionComponent } from '../crud-informacion/crud-informacion.component';
import { LocalStorageService } from '../../services/localStorage.Service';
@Component({
  selector: 'app-header-admin',
  standalone: true,
  imports: [],
  templateUrl: './header-admin.component.html',
  styleUrl: './header-admin.component.scss'
})
export class HeaderAdminComponent implements OnInit{
  constructor(private route:Router,private dialog: MatDialog,private localStoreService:LocalStorageService){}
  isLoggedIn: boolean = false
  ngOnInit(): void {
    this.isLoggedIn = this.localStoreService.hasToken();
  }

  irAhome(){
    this.route.navigate(['/adminHome']);

  }

  camion(){
    this.route.navigate(['/camiones']);
  }

  irInfo(): void {
    const dialogRef = this.dialog.open(CrudInformacionComponent, {
      width: '1000px', 
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
      }
    });
  }

  irNotis(): void {
    const dialogRef = this.dialog.open(CrudNotificacionesComponent, {
      width: '1000px', 
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
      }
    });
  }

  recoleccion(){
    this.route.navigate(['/TuxMapaAdmin']);

  }

  rutas(){
    this.route.navigate(['/TuxRutas']);

  }
}
