import { Component, EventEmitter, Output } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MaterialService } from '../../services/material.service';
import { Material } from '../../models/material';
import { FormBuilder, FormGroup ,Validators } from '@angular/forms';
import { MatDialogActions } from '@angular/material/dialog';
import { MatDialogContent } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms'; // Importa ReactiveFormsModule
import { LocalStorageService } from '../../services/localStorage.Service';

@Component({
  selector: 'app-crud-informacion',
  standalone: true,
  imports: [MatDialogActions,MatDialogContent,ReactiveFormsModule],
  templateUrl: './crud-informacion.component.html',
  styleUrls: ['./crud-informacion.component.scss']
})
export class CrudInformacionComponent {
  selectedFile: File | null = null;
  form: FormGroup;
  @Output() materialCreated: EventEmitter<Material> = new EventEmitter<Material>(); // Crear un output para emitir el material


  constructor(
    public dialogRef: MatDialogRef<CrudInformacionComponent>,
    private materialService: MaterialService,
    private snackBar: MatSnackBar,
    private fb: FormBuilder,
    private localStorage: LocalStorageService
  ) {
    // Inicializamos el formulario reactivo con el campo título y descripción
    this.form = this.fb.group({
      titulo: [''],  // Agregado el campo título
      descripcion: ['', [Validators.maxLength(249)]],  // Descripción con validación
    });
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  } 
  close(): void {
    this.dialogRef.close(false);
  }

  // Función para guardar
  save(): void {
    // Evitar que se ejecute si el formulario no es válido
    if (!this.selectedFile || !this.form.valid) {
      this.snackBar.open('Por favor complete todos los campos y seleccione un archivo', 'Cerrar', {
        duration: 2000,
      });
      return; // Salir de la función si no es válido
    }

    const idUser = this.localStorage.getItemId('id');
    const material: Material = {
      titulo: this.form.value.titulo,
      contenido: this.form.value.descripcion,
      path_imagen: this.selectedFile.name,
      id_usuario: idUser || 0,
    };

    this.materialService.createMaterial(material, this.selectedFile).subscribe({
      next: (response) => {
        this.snackBar.open('Material creado exitosamente', 'Cerrar', {
          duration: 2000,
        });
        this.materialCreated.emit(response);
        this.dialogRef.close(true);
      },
      error: (error) => {
        console.log(error)
        this.snackBar.open('Error al crear material informativo', 'Cerrar', {
          duration: 2000,
        });
      },
    });
  }
  
  // Cerrar el diálogo sin validar si el formulario es válido (para el botón "Cerrar")

  
}
