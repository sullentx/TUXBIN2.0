import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import Ruta from '../models/Ruta';


@Injectable({
  providedIn: 'root'
})
export class RutaService {
  private apiUrl = 'https://tuxbinapi.integrador.xyz/rutas'; 

  constructor(private http: HttpClient) {}

  createRuta(ruta: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, ruta);
  }

  getRutas(): Observable<Ruta[]> {
    return this.http.get<Ruta[]>(this.apiUrl);
  }

  
}
