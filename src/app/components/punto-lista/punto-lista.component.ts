// punto-lista.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { UpperCasePipe } from '@angular/common';
import PuntoRecoleccion from '../../models/puntoRecoleccion';

@Component({
  selector: 'app-punto-lista',
  standalone: true,
  imports: [UpperCasePipe],
  templateUrl: './punto-lista.component.html',
  styleUrl:'./punto-lista.component.scss'
})
export class PuntoListaComponent {
  @Input() puntos: PuntoRecoleccion[] = [];
  @Output() puntoHovered = new EventEmitter<PuntoRecoleccion>();
  @Output() puntoUnhovered = new EventEmitter<PuntoRecoleccion>();

  onPuntoHover(punto: PuntoRecoleccion) {
    this.puntoHovered.emit(punto);
  }

  onPuntoLeave(punto: PuntoRecoleccion) {
    this.puntoUnhovered.emit(punto);
  }
}