import { Component } from '@angular/core';
import { MatDialogActions, MatDialogRef } from '@angular/material/dialog';
import { MatDialogContent } from '@angular/material/dialog';
import { MatSelect } from '@angular/material/select';
import { MatOption } from '@angular/material/select';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotificationService } from '../../services/notification.service';
import { LocalStorageService } from '../../services/localStorage.Service';
import { ReactiveFormsModule } from '@angular/forms'; // Importa ReactiveFormsModule

@Component({
  selector: 'app-crud-notificaciones',
  standalone: true,
  imports:[MatDialogActions,MatDialogContent,MatSelect,MatOption,ReactiveFormsModule],
  templateUrl: './crud-notificaciones.component.html',
  styleUrl: './crud-notificaciones.component.scss'
})
export class CrudNotificacionesComponent {
  notificationForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<CrudNotificacionesComponent>,
    private notificationService:NotificationService,
    private localStorage: LocalStorageService,
  ) {
    this.notificationForm = this.fb.group({
      titulo: ['', Validators.required], // Requiere un valor no vacío
      texto: ['', Validators.required],  // Requiere un valor no vacío
      tiempo_activo: ['', [Validators.required]], // Requiere un número
    });
    
  }

  save(): void {
    const id_user = this.localStorage.getItem('id');
    const name = this.localStorage.getItem('name');
  
    console.log('Formulario es válido:', this.notificationForm.valid); // Añadido para ver el estado del formulario
  
    if (this.notificationForm.valid) {
      const formValue = this.notificationForm.value;
      const notification = {
        ...formValue,
        tiempo_activo: this.calculateEndTime(formValue.tiempo_activo),
        create_at: new Date().toISOString(),
        create_by: name,
        id_usuario: id_user,
      };
  
      console.log('Datos a enviar:', notification); // Log importante
  
      this.notificationService.createNotification(notification).subscribe({
        next: (response) => {
          console.log('Notificación creada exitosamente:', response);
          this.dialogRef.close(response); 
        },
        error: (err) => {
          console.error('Error al guardar la notificación:', err);
        },
      });
    } else {
      console.warn('Formulario inválido:', this.notificationForm.errors); // Muestra los errores del formulario
    }
  }
  
  

  close(): void {
    this.dialogRef.close();
  }

  private calculateEndTime(hours: number): string {
    const now = new Date();
    now.setHours(now.getHours() + hours);
    return now.toISOString();
  }
}


