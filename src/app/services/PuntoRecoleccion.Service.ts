import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import PuntoRecoleccion from '../models/puntoRecoleccion';
@Injectable({
  providedIn: 'root'
})
export class PuntoRecoleccionService {
  private apiUrl = 'https://tuxbinapi.integrador.xyz/puntos_recoleccion';

  constructor(private http: HttpClient) {}

  createPuntoRecoleccion(punto: any): Observable<any> {
    return this.http.post(this.apiUrl, punto);
  }

  obtenerPuntos(): Observable<PuntoRecoleccion[]> {
    return this.http.get<PuntoRecoleccion[]>(this.apiUrl);
  }


  deletePuntoRecoleccion(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }


}
