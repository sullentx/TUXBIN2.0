import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";
import { TruckService } from '../../services/truck.service';
import { Truck } from '../../models/truck';

@Component({
  selector: 'app-crud-camion',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, ReactiveFormsModule],
  templateUrl: './crud-camion.component.html',
  styleUrls: ['./crud-camion.component.scss']
})
export class CrudCamionComponent {

  camionForm: FormGroup;
  
  @Output() truckAdded: EventEmitter<void> = new EventEmitter<void>();

  constructor(private fb: FormBuilder, private truckService: TruckService) {
    this.camionForm = this.fb.group({
      matricula: ['', Validators.required],
      num_serie: ['', Validators.required],
      distancia: ['', [Validators.required, Validators.min(0)]]
    });
  }

  onSubmit() {
    if (this.camionForm.valid) {
      const formValues = this.camionForm.value;
      const truck: Truck = {
        id: 0,
        matricula: formValues.matricula,
        num_serie: formValues.num_serie,
        routeTraveled: formValues.distancia
      };
      this.truckService.postTruck(truck).subscribe({
        next: (response) => {
          console.log('Camión registrado con éxito:', response);
          this.truckAdded.emit();  
          this.camionForm.reset(); 
        },
        error: (error) => {
          console.error('Error al registrar el camión:', error);
        }
      });
    } else {
      console.log('Formulario inválido');
    }
  }
}
