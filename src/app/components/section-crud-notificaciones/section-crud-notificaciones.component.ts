import { Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { CrudNotificacionesComponent } from "../crud-notificaciones/crud-notificaciones.component";
import { HeaderAdminComponent } from "../header-admin/header-admin.component";

@Component({
  selector: 'app-section-crud-notificaciones',
  standalone: true,
  imports: [HeaderComponent, CrudNotificacionesComponent, HeaderAdminComponent],
  templateUrl: './section-crud-notificaciones.component.html',
  styleUrl: './section-crud-notificaciones.component.scss'
})
export class SectionCrudNotificacionesComponent {

}
