import { Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { ActivatedRoute, Router } from '@angular/router';
import { FooterComponent } from "../footer/footer.component";
import { LocalStorageService } from '../../services/localStorage.Service';
import { MatDialog } from '@angular/material/dialog';
import { ShowNotificationComponent } from '../show-notification/show-notification.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  constructor(private route:Router,private localStoreService:LocalStorageService,private dialog:MatDialog,private snackBar:MatSnackBar){}
  irRutas(){
    this.route.navigate(['/TuxMapa']);

  }
  puntos(){
    this.route.navigate(['/TuxMapa']);

  }

  notis(){
    if(this.localStoreService.hasToken()){
      const dialogRef = this.dialog.open(ShowNotificationComponent, {
        width: '1000px', 
      });
  
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
        }
      });
    }
    else{
      this.snackBar.open('Debes de Iniciar Sesion para poder ver tus notificaciones', 'Cerrar', {
        duration: 3000
      });
    }
  }
}