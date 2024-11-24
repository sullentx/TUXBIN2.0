import { Component } from '@angular/core';
import { HeaderAdminComponent } from "../header-admin/header-admin.component";
import { ContCardComponent } from "../cont-card/cont-card.component";
import { HeaderComponent } from "../header/header.component";

@Component({
  selector: 'app-content-page',
  standalone: true,
  imports: [ ContCardComponent, HeaderComponent],
  templateUrl: './content-page.component.html',
  styleUrl: './content-page.component.scss'
})
export class ContentPageComponent {

}
