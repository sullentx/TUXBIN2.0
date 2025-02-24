// services/truck.service.ts
import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Truck } from '../models/truck';
import { TruckStore } from '../Stores/Truck.Store';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TruckService {
  private url: string = 'https://tuxbinapi.integrador.xyz/';
  private headers = new HttpHeaders().set('Content-Type', 'application/json');
  private store = inject(TruckStore);

  constructor(private http: HttpClient) {}

  async getAllTrucks(): Promise<void> {
    try {
      this.store.setLoading(true);
      const urlGet = this.url + 'camiones';
      const trucks = await firstValueFrom(this.http.get<Truck[]>(urlGet));
      this.store.setTrucks(trucks);
      this.store.setError(null);
    } catch (error) {
      this.store.setError('Error al cargar los camiones');
    } finally {
      this.store.setLoading(false);
    }
  }

  async createTruck(truck: Truck) {
    try {
      this.store.setLoading(true);
      const urlPost = this.url + 'camiones';
      const newTruck = await firstValueFrom(
        this.http.post<Truck>(urlPost, truck, { headers: this.headers })
      );
      this.store.addTruck(newTruck);
      this.store.setError(null);
    } catch (error) {
      this.store.setError('Error al crear el camión');
    } finally {
      this.store.setLoading(false);
    }
  }
  

  async getTruckById(id: string): Promise<Truck> {  // Cambiar id a string
    try {
      this.store.setLoading(true);
      const urlGet = `${this.url}camiones/${id}`;
      const truck = await firstValueFrom(this.http.get<Truck>(urlGet));
      this.store.setSelectedTruck(truck); // Guardar en el store
      this.store.setError(null);
      return truck; // Retornar el objeto Truck
    } catch (error) {
      this.store.setError('Error al cargar el camión');
      throw error; // Lanzar error para manejarlo en el componente
    } finally {
      this.store.setLoading(false);
    }
  }
  
  async updateTruck(truck: Truck): Promise<void> {
    try {
      this.store.setLoading(true);
      const urlPut = `${this.url}camiones/${truck.id}`;
      const updatedTruck = await firstValueFrom(
        this.http.put<Truck>(urlPut, truck, { headers: this.headers })
      );
      this.store.updateTruck(updatedTruck); // Actualiza el camión en la tienda
      this.store.setError(null);
    } catch (error) {
      this.store.setError('Error al actualizar el camión');
    } finally {
      this.store.setLoading(false);
    }
  }
  
  async deleteTruck(id: string): Promise<void> {  // Cambiar id a string
    try {
      this.store.setLoading(true);
      const urlDelete = `${this.url}camiones/${id}`;
      await firstValueFrom(this.http.delete(urlDelete));
      this.store.deleteTruck(id); // Elimina el camión de la tienda
      this.store.setError(null);
    } catch (error) {
      this.store.setError('Error al eliminar el camión');
    } finally {
      this.store.setLoading(false);
    }
  }

  async TruckCount(): Promise<Truck[]> {
    try {
      this.store.setLoading(true);
      const urlGet = this.url + 'camiones';
      const trucks = await firstValueFrom(this.http.get<Truck[]>(urlGet));
      this.store.setTrucks(trucks);
      this.store.setError(null);
      return trucks; // Devuelve los camiones
    } catch (error) {
      this.store.setError('Error al cargar los camiones');
      throw error; // Lanza el error si necesitas manejarlo
    } finally {
      this.store.setLoading(false);
    }
  }
}
