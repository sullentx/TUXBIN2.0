import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Person, PersonLog } from '../models/person';
import { LocalStorageService } from './localStorage.Service';

interface LoginResponse {
  access_token: string;
  rol: number;
  name: string;
  id: string;
  expires_at: number;  
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  

  private url: string = 'https://tuxbinapi.integrador.xyz'
 
  
  private headers = new HttpHeaders().set('Content-Type','application/json');

  constructor(private http: HttpClient, private localStorage:LocalStorageService) { }

    postPerson(person:Person):Observable <Person>  {
      let urlPost =`${this.url}/usuarios`;
      return this.http.post<Person>(`${urlPost}`, person, { headers: this.headers });
  }
//En lugar de recibir parametro por paramemtro ppude haber hecho una interface para solo recibirlo comoo obejto

postLogin(person: PersonLog): Observable<LoginResponse> {
  return this.http.post<LoginResponse>(`${this.url}/login`, person).pipe(
    tap(response => {
      if (response.access_token && response.expires_at) {
        // Asegurarnos de que expires_at sea un número
        const expirationTime = parseInt(response.expires_at.toString());
        
        
        // Guardar el token y la expiración
        this.localStorage.setToken(response.access_token, expirationTime);
        this.localStorage.setItem('rol', response.rol.toString());
        this.localStorage.setItem('name', response.name);
        this.localStorage.setItem('id', response.id);
        
        // Verificar que se guardó correctamente
      }
    })
  );
}

}
