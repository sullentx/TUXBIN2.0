import { Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";
import { Router } from '@angular/router';
import { HeaderAdminComponent } from "../header-admin/header-admin.component";

@Component({
  selector: 'app-home-admin',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, HeaderAdminComponent],
  templateUrl: './home-admin.component.html',
  styleUrl: './home-admin.component.scss'
})
export class HomeAdminComponent {
  constructor(private router: Router) { }

  irACamiones() {
    this.router.navigate(['/camiones']);
  }
  irNotis() {
    this.router.navigate(['/notificaciones']);
  }
  irInfo() {
    this.router.navigate(['/informacion']);
  }
}
