import { Component } from '@angular/core';
import { HeaderAdminComponent } from "../header-admin/header-admin.component";

@Component({
  selector: 'app-section-crud-informacion',
  standalone: true,
  imports: [ HeaderAdminComponent],
  templateUrl: './section-crud-informacion.component.html',
  styleUrl: './section-crud-informacion.component.scss'
})
export class SectionCrudInformacionComponent {

}
