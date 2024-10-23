import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { TruckService } from '../services/truck.service';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { Truck } from '../models/truck';
import { DialogEditTruckComponent } from '../dialog-edit-truck/dialog-edit-truck.component';
import { MatDialog } from '@angular/material/dialog';
import { DialogDeleteTruckComponent } from '../dialog-delete-truck/dialog-delete-truck.component';
import { DialogDetailsTruckComponent } from '../dialog-details-truck/dialog-details-truck.component';
import { PipesModule } from '../pipes/pipes.module';
import { CurrencyPipe } from '@angular/common';
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatSortModule,PipesModule,CurrencyPipe],
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  displayedColumns: string[] = ['id', 'matricula', 'num_serie','distancia','actions','details']; 
  dataSource = new MatTableDataSource<Truck>();

  constructor(private truckService: TruckService,private dialog: MatDialog) {}

  ngOnInit(): void {
    this.getCamiones();
  }

  getCamiones(): void {
    this.truckService.getTruck().subscribe(data => {
      this.dataSource.data = data;
    });
  }
  openDialog(truck: Truck): void {
    const dialogRef = this.dialog.open(DialogEditTruckComponent, {
      data: truck
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.truckService.updateTruck(result).subscribe(() => {
          this.getCamiones(); 
        });
      }
    });
  }

  deleteTruck(truck: Truck): void {
    const dialogRef = this.dialog.open(DialogDeleteTruckComponent, {
      data: truck 
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
      
        this.truckService.deleteTruck(result.id).subscribe(() => {
          this.getCamiones(); 
        });
      }
    });
  }

  viewDetails(truck: Truck) {
    this.truckService.getTruckById(truck.id).subscribe({
      next: (data) => {
        this.openDetailsDialog(data);
      },
      error: (error) => {
        console.error('Error al obtener detalles del camión:', error);
      }
    });
  }

  openDetailsDialog(truck: Truck) {
    const dialogRef = this.dialog.open(DialogDetailsTruckComponent, {
      data: truck 
    });
  
    dialogRef.afterClosed().subscribe(result => {
    });
  }
  
}
