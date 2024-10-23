import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Truck } from '../models/truck';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TruckService {

  private url: string = ' http://localhost:3000/'
 
  private headers = new HttpHeaders().set('Content-Type','application/json');

  constructor(private http: HttpClient) { }

  postTruck(truck:Truck):Observable <Truck>  {
      let urlPost = this.url + 'createTruck/create'
      return this.http.post<Truck>(`${urlPost}`, truck, { headers: this.headers });
  }

  getTruck(): Observable<Truck[]> {
    let urlPost = this.url + 'getAllTruck/trucks'
    return this.http.get<Truck[]>(`${urlPost}`);
  }
  updateTruck(truck: Truck): Observable<Truck> {
    const urlPost = this.url + 'updateTruck/';
    return this.http.put<Truck>(`${urlPost}${truck.id}`, truck);
}

  
  deleteTruck(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}deleteTruck/${id}`);
  }
  
  getTruckById(id: number): Observable<Truck> {
    const urlPost = this.url + 'getOneTruck/truckId/';
    return this.http.get<Truck>(`${urlPost}${id}`);
  }
  
}

