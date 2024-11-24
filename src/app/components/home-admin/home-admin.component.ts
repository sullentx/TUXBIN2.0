import { Component, effect, inject, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';  // Asegúrate de importar MatDialog
import { CrudInformacionComponent } from '../crud-informacion/crud-informacion.component';
import { CrudNotificacionesComponent } from '../crud-notificaciones/crud-notificaciones.component';
import { TruckStore } from '../../Stores/Truck.Store';
import { TruckService } from '../../services/truck.service';
@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.component.html',
  styleUrls: ['./home-admin.component.scss']
})
export class HomeAdminComponent implements OnInit {
truckCount: number = 0;
readonly store = inject(TruckStore)
  constructor(private router: Router, private dialog: MatDialog,
    private truckService: TruckService
  ) {
  }

  

  ngOnInit(): void {
  this.truckService.TruckCount().then((trucks) => {
    this.truckCount = trucks.length; 
  }).catch((error) => {
    console.error('Error al obtener los camiones:', error);
  });

  }


  irACamiones() {
    this.router.navigate(['/camiones']);
  }

 
  irNotis(): void {
    const dialogRef = this.dialog.open(CrudNotificacionesComponent, {
      width: '1000px', 
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Comunicado guardado:', result); 
      }
    });
  }

  irInfo(): void {
    const dialogRef = this.dialog.open(CrudInformacionComponent, {
      width: '1000px', 
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Comunicado guardado:', result);  
      }
    });
  }
}
