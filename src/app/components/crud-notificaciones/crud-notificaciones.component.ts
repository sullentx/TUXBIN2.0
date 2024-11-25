import { Component } from '@angular/core';
import { MatDialogActions, MatDialogRef } from '@angular/material/dialog';
import { MatDialogContent } from '@angular/material/dialog';
import { MatSelect } from '@angular/material/select';
import { MatOption } from '@angular/material/select';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotificationService } from '../../services/notification.service';
import { LocalStorageService } from '../../services/localStorage.Service';
import { ReactiveFormsModule } from '@angular/forms'; // Importa ReactiveFormsModule
import { MatSnackBar } from '@angular/material/snack-bar';

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
    private snackBar:MatSnackBar
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
  
  
    if (this.notificationForm.valid) {
      const formValue = this.notificationForm.value;
      const notification = {
        ...formValue,
        tiempo_activo: this.calculateEndTime(formValue.tiempo_activo),
        create_at: new Date().toISOString(),
        create_by: name,
        id_usuario: id_user,
      };
  
  
      this.notificationService.createNotification(notification).subscribe({
        next: (response) => {
          this.snackBar.open('Notifiacion Creada Exitosamente', 'Cerrar', {
            duration: 2000,
          });
          this.dialogRef.close(response); 

        },
        error: (err) => {
        },
      });
    } else {
      this.snackBar.open('Por favor rellene todo los campos', 'Cerrar', {
        duration: 2000,
      });}
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


