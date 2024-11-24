import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { Material } from '../models/material';

@Injectable({
  providedIn: 'root'
})
export class MaterialService {

  private url: string = 'http://127.0.0.1:8000'; 

  constructor(private http: HttpClient) {}



  // Crear un nuevo material informativo
  createMaterial(material: Material, file: File): Observable<any> {
    const formData = new FormData();
    
    formData.append('titulo', material.titulo);
    formData.append('contenido', material.contenido);
    formData.append('id_usuario', String(material.id_usuario));
    if (file) {
      formData.append('file', file); 
    }
  
    return this.http.post(`${this.url}/material-informativo`, formData);
  }

  getAllMaterials(): Observable<Material[]> {
    return this.http.get<Material[]>(`${this.url}/material-informativo`);
  }
  
 


}
