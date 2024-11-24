import { Component, OnInit, Input } from '@angular/core';
import { MaterialService } from '../../services/material.service';
import { Material } from '../../models/material';
import { SlicePipe } from '@angular/common';
@Component({
  selector: 'app-cont-card',
  standalone: true,
  imports: [SlicePipe],
  templateUrl: './cont-card.component.html',
  styleUrls: ['./cont-card.component.scss']
})
export class ContCardComponent implements OnInit {
  items: Material[] = []; // Lista de materiales

  constructor(private materialService: MaterialService) {}

  ngOnInit(): void {
    this.loadMaterials(); // Cargar materiales al inicializar el componente
  }

  // Método para obtener materiales desde el backend
  private loadMaterials(): void {
    this.materialService.getAllMaterials().subscribe({
      next: (materials) => {
        this.items = materials; // Asigna los materiales recibidos a la lista
        console.log('Materiales cargados:', materials);
      },
      error: (err) => {
        console.error('Error al cargar materiales:', err);
      }
    });
  }

  // Método para recibir el material creado desde el componente hijo
  onMaterialCreated(newMaterial: Material): void {
    this.items.push(newMaterial); // Agregar el nuevo material a la lista de 
    console.log('cargandoo')
  }
}
