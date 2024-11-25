import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ShowNotificationComponent } from '../show-notification/show-notification.component';
import { NotificationService } from '../../services/notification.service';
import { LocalStorageService } from '../../services/localStorage.Service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit{
  hasNotifications: boolean = false; // Para indicar si hay notificaciones

  constructor(private route:Router,public dialog: MatDialog,private notificationService: NotificationService, private localStoreService: LocalStorageService, private snackBar:MatSnackBar){}
  isLoggedIn: boolean = false
  
  irAhome(){
    this.route.navigate(['/home']);

  }
  goLogin(){
    this.route.navigate(['/login']);

  }

  goRegister(){
    this.route.navigate(['/register']);

  }
  goInfo(){
    this.route.navigate(['/TuxBinInformate']);

  }
  goMapa(){
    if(this.localStoreService.hasToken()){
      this.route.navigate(['/TuxMapa']);
    }else{
      this.snackBar.open('Debes de Iniciar Sesion para poder ver tus notificaciones', 'Cerrar', {
        duration: 3000
      });
    }

  }
  ngOnInit() {
    this.checkNotifications();
    this.isLoggedIn = this.localStoreService.hasToken();

  }

  checkNotifications() {
    // Llama al servicio de notificaciones para ver si hay notificaciones pendientes
    this.notificationService.getNotifications().subscribe(notifications => {
      this.hasNotifications = notifications.length > 0; // Si hay notificaciones, muestra el badge
    });
  }

  openNotifications(): void {
    if(this.localStoreService.hasToken()){
    this.dialog.open(ShowNotificationComponent, {
      width: '400px', // Puedes ajustar el tamaño del modal
    });
  } else{
    this.snackBar.open('Debes de Iniciar Sesion para poder ver tus notificaciones', 'Cerrar', {
      duration: 3000
    });
  }
}

}
