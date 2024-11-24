import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ShowNotificationComponent } from '../show-notification/show-notification.component';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit{
  hasNotifications: boolean = false; // Para indicar si hay notificaciones

  constructor(private route:Router,public dialog: MatDialog,private notificationService: NotificationService){}

  irAhome(){
    this.route.navigate(['/home']);

  }

  ngOnInit() {
    this.checkNotifications();
  }

  checkNotifications() {
    // Llama al servicio de notificaciones para ver si hay notificaciones pendientes
    this.notificationService.getNotifications().subscribe(notifications => {
      this.hasNotifications = notifications.length > 0; // Si hay notificaciones, muestra el badge
    });
  }

  openNotifications(): void {
    this.dialog.open(ShowNotificationComponent, {
      width: '400px', // Puedes ajustar el tamaño del modal
    });
  }
}
