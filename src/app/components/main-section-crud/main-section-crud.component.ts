import { Component, ViewChild } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { CrudCamionComponent } from "../crud-camion/crud-camion.component";
import { FooterComponent } from "../footer/footer.component";
import { TableComponent } from '../table/table.component';
import { MatTableModule } from '@angular/material/table'; // Importa el MatTableModule
import { MatPaginatorModule } from '@angular/material/paginator'; // Si tienes paginación
import { MatSortModule } from '@angular/material/sort';
import { HeaderAdminComponent } from "../header-admin/header-admin.component"; // Si usas sorting

@Component({
  selector: 'app-main-section-crud',
  standalone: true,
  imports: [
    HeaderComponent,
    CrudCamionComponent,
    FooterComponent,
    TableComponent,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    HeaderAdminComponent
],
  templateUrl: './main-section-crud.component.html',
  styleUrls: ['./main-section-crud.component.scss']
})
export class MainSectionCrudComponent { 
  @ViewChild(TableComponent) tableComponent!: TableComponent;

  onTruckAdded() {
    this.tableComponent.getCamiones(); 
  }
}
