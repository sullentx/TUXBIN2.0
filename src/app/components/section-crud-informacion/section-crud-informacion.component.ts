import { Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { CrudInformacionComponent } from "../crud-informacion/crud-informacion.component";
import { HeaderAdminComponent } from "../header-admin/header-admin.component";

@Component({
  selector: 'app-section-crud-informacion',
  standalone: true,
  imports: [HeaderComponent, CrudInformacionComponent, HeaderAdminComponent],
  templateUrl: './section-crud-informacion.component.html',
  styleUrl: './section-crud-informacion.component.scss'
})
export class SectionCrudInformacionComponent {

}
