import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { TruckService } from '../../services/truck.service';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { Truck } from '../../models/truck';
import { DialogEditTruckComponent } from '../dialog-edit-truck/dialog-edit-truck.component';
import { MatDialog } from '@angular/material/dialog';
import { DialogDeleteTruckComponent } from '../dialog-delete-truck/dialog-delete-truck.component';
import { DialogDetailsTruckComponent } from '../dialog-details-truck/dialog-details-truck.component';
import { PipesModule } from '../pipes/pipes.module';
import { MatSnackBar } from '@angular/material/snack-bar'; // Importar MatSnackBar
import { TruckStore } from '../../Stores/Truck.Store'; // Importa TruckStore
import { inject } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatSortModule, PipesModule],
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'matricula',
    'Numero de Unidad',
    'actions',
    'details',
  ];
  dataSource = new MatTableDataSource<Truck>();

  private store = inject(TruckStore); // Inyecta la tienda

  constructor(
    private truckService: TruckService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar // Inyectar MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getCamiones();
  }

  getCamiones(): void {
    this.truckService.getAllTrucks().then(() => {
      // Accediendo al estado directamente de la señal
      this.dataSource.data = this.store.trucks();  // Accede a la señal 'trucks'
    });
  }

  openDialog(truck: Truck): void {
    const dialogRef = this.dialog.open(DialogEditTruckComponent, {
      data: truck,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.truckService.updateTruck(result).
        then(() => {
          this.getCamiones();
          this.snackBar.open('Camión modificado con éxito', 'Cerrar', {
            duration: 3000, // Duración en milisegundos
          });
        });
      }
    });
  }

  deleteTruck(truck: Truck): void {
    const dialogRef = this.dialog.open(DialogDeleteTruckComponent, {
      data: truck,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.truckService.deleteTruck(result.id).then(() => {
          this.getCamiones();
          this.snackBar.open('Camión eliminado con éxito', 'Cerrar', {
            duration: 3000, // Duración en milisegundos
          });
        });
      }
    });
  }

  async viewDetails(truck: Truck): Promise<void> {
    try {
      const data = await this.truckService.getTruckById(truck.id|| ''); // Ahora retorna un Truck
      this.openDetailsDialog(data); // Pasar el Truck al diálogo
    } catch (error) {
      this.snackBar.open('Error al obtener el camion', 'Cerrar', {
        duration: 3000, // Duración en milisegundos
      });

    }
  }
  

  openDetailsDialog(truck: Truck): void {
    this.dialog.open(DialogDetailsTruckComponent, {
      data: truck,
    });
  }
}
