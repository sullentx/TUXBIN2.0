import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { NotificationService } from '../../services/notification.service';
import { MatDialogContent,MatDialogActions } from '@angular/material/dialog';
import { PipesModule } from '../pipes/pipes.module';
@Component({
  selector: 'app-show-notification',
  standalone: true,
  imports: [MatDialogContent,MatDialogActions,PipesModule],
  templateUrl: './show-notification.component.html',
  styleUrl: './show-notification.component.scss'
})
export class ShowNotificationComponent implements OnInit{
  notifications: any[] = [];  // Aquí almacenaremos las notificaciones


  constructor(
    private notificationService: NotificationService, 
    public dialogRef: MatDialogRef<ShowNotificationComponent>
  ) {}

  ngOnInit(): void {
    this.loadNotifications();
  }

  // Función para cargar las notificaciones desde el servicio
  loadNotifications(): void {
    this.notificationService.getNotifications().subscribe({
      next: (data) => {
        this.notifications = data;  // Aquí cargamos las notificaciones
      },
      error: (err) => {
        console.error('Error al obtener notificaciones:', err);
      }
    });
  }

 
  close(): void {
    this.dialogRef.close();  // Cierra el modal
  }
}
