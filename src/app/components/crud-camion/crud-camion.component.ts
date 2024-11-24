import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TruckService } from '../../services/truck.service';
import { Truck } from '../../models/truck';
import { TruckStore } from '../../Stores/Truck.Store';
import e from 'express';

@Component({
  selector: 'app-crud-camion',
  standalone: true,
  imports: [ReactiveFormsModule, MatProgressBarModule],
  templateUrl: './crud-camion.component.html',
  styleUrls: ['./crud-camion.component.scss']
})
export class CrudCamionComponent {
  isLoading = false;
  camionForm: FormGroup;

  @Output() truckAdded: EventEmitter<void> = new EventEmitter<void>();

  constructor(
    private fb: FormBuilder,
    private truckService: TruckService,
    @Inject(TruckStore) private store: typeof TruckStore,  
    private snackBar: MatSnackBar
  ) {
    this.camionForm = this.fb.group({
      matricula: ['', Validators.required],
      num_serie: ['', Validators.required],
    });
  }

 // En CrudCamionComponent
onSubmit() {
  this.isLoading = true;

  if (this.camionForm.valid) {
    const formValues = this.camionForm.value;
    const truck: Truck = {
      matricula: formValues.matricula,
      numero_unidad: formValues.num_serie
    };

    // Llamar al servicio para crear el camión
    this.truckService.createTruck(truck).then(() => {
      this.isLoading = false; // Desactiva el estado de carga

      // Mostrar notificación de éxito
      console.log('chuchuu',truck)
      this.snackBar.open('Camión registrado con éxito', 'Cerrar', {
        duration: 3000,
      });

      this.truckAdded.emit();
      this.camionForm.reset();
    }).catch((error) => {
      console.error('Error al registrar el camión:', error);
      this.snackBar.open('Error al registrar el camión. Intenta nuevamente.', 'Cerrar', {
        duration: 3000,
      });

      this.isLoading = false;
    });
  } else {
    console.log('Formulario inválido');

    // Mostrar notificación de formulario inválido
    this.snackBar.open('Por favor, completa el formulario correctamente.', 'Cerrar', {
      duration: 3000,
    });

    this.isLoading = false;
  }
}

  
}
