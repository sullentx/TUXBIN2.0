import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule} from '@angular/forms';
import { PuntoRecoleccionService } from '../../services/PuntoRecoleccion.Service';
import { RutaService } from '../../services/Rutas.service';
import { TruckService } from '../../services/truck.service';
@Component({
  selector: 'app-rutas',
  standalone:true,
  imports:[ReactiveFormsModule],
  templateUrl: './rutas.component.html',
  styleUrls: ['./rutas.component.scss']
})
export class RutasComponent implements OnInit {
  rutaForm!: FormGroup;
  camiones: any[] = [];
  puntos: any[] = [];

  constructor(
    private fb: FormBuilder,
    private rutaService: RutaService,
    private puntoRecoleccionService: PuntoRecoleccionService,
    private camionService: TruckService
  ) {}

  ngOnInit(): void {
    this.rutaForm = this.fb.group({
      nombre_de_ruta: ['', Validators.required],
      id_camion: ['', Validators.required],
      id_puntos_recoleccion: [[], Validators.required]
    });

    this.cargarDatos();
  }

  private cargarDatos(): void {
    this.camionService.getAllTrucks().then(
      (data) => (this.camiones.push(data)),
      (error) => console.error('Error al cargar camiones', error)
    );

    this.puntoRecoleccionService.obtenerPuntos().subscribe(
      (data) => (this.puntos = data),
      (error) => console.error('Error al cargar puntos de recolección', error)
    );
  }

  onSubmit(): void {
    if (this.rutaForm.valid) {
      this.rutaService.crearRuta(this.rutaForm.value).subscribe(
        (response) => {
          console.log('Ruta creada:', response);
          alert('Ruta creada con éxito');
        },
        (error) => {
          console.error('Error al crear ruta:', error);
        }
      );
    }
  }
}
