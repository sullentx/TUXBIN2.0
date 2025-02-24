import { Component, effect, inject, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';  // Asegúrate de importar MatDialog
import { CrudInformacionComponent } from '../crud-informacion/crud-informacion.component';
import { CrudNotificacionesComponent } from '../crud-notificaciones/crud-notificaciones.component';
import { TruckStore } from '../../Stores/Truck.Store';
import { TruckService } from '../../services/truck.service';
import { HeaderAdminComponent } from "../header-admin/header-admin.component";
import { PuntoRecoleccionService } from '../../services/PuntoRecoleccion.Service';
import PuntoRecoleccion from '../../models/puntoRecoleccion';
import Ruta from '../../models/Ruta';
import { RutaService } from '../../services/Rutas.service';
import { LocalStorageService } from '../../services/localStorage.Service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { debounceTime } from 'rxjs';
@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.component.html',
  standalone: true,
  styleUrls: ['./home-admin.component.scss'],
  imports: [HeaderAdminComponent]
})

export class HomeAdminComponent implements OnInit {
truckCount: number = 0;
puntoCount: PuntoRecoleccion[] =[]
rutaCount: Ruta[] =[]

readonly store = inject(TruckStore)
  constructor(private router: Router, private dialog: MatDialog,
    private truckService: TruckService,
    private punto:PuntoRecoleccionService,
    private ruta: RutaService,
    private localStorageService: LocalStorageService,
    private snackBar:MatSnackBar
  ) {
  }

  

  ngOnInit(): void {
  this.truckService.TruckCount().then((trucks) => {
    this.truckCount = trucks.length; 
  }).catch((error) => {
  });
  this.punto.obtenerPuntos().subscribe((puntos) => {
    this.puntoCount = puntos;
  });
  this.ruta.getRutas().subscribe((ruta) => {
    this.rutaCount = ruta;
  });
  }

  logOut() {
    // Elimina el token
    this.localStorageService.removeToken();
  
    // Muestra un mensaje con el Snackbar
    this.snackBar.open('Cerrando Sesión', 'Espere', {
      duration: 3000, // Duración del mensaje
      horizontalPosition: 'center', // Opcional: Posición horizontal
    });
  
    // Redirige al usuario a la página de login después de un pequeño retraso
    setTimeout(() => {
      this.router.navigate(['/login']);
    }, 3000); // Espera el tiempo necesario antes de redirigir
  }
  

  rutas() {
    this.router.navigate(['/TuxRutas']);
  }


  irACamiones() {
    this.router.navigate(['/camiones']);
  }

  irPuntos() {
    this.router.navigate(['/TuxMapaAdmin']);
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

  irInfo(): void {
    const dialogRef = this.dialog.open(CrudInformacionComponent, {
      width: '1000px', 
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
      }
    });
  }
}
