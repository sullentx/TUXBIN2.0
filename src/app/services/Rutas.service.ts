import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import Ruta from '../models/Ruta';


@Injectable({
  providedIn: 'root'
})
export class RutaService {
  private apiUrl = 'http://127.0.0.1:8000/rutas'; 

  constructor(private http: HttpClient) {}

  crearRuta(ruta: Ruta): Observable<Ruta> {
    return this.http.post<Ruta>(this.apiUrl, ruta);
  }
}
