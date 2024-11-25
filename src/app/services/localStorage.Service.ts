import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  private readonly TOKEN_KEY = 'access_token';
  private readonly EXPIRES_AT_KEY = 'expires_at';

  constructor() { }

  setToken(token: string, expiresAt: number): void {
    try {
      // Asegurarnos de que expiresAt sea un número válido
      if (!expiresAt || isNaN(expiresAt)) {
        return;
      }

      localStorage.setItem(this.TOKEN_KEY, token);
      localStorage.setItem(this.EXPIRES_AT_KEY, expiresAt.toString());
      
   
    } catch (error) {
    }
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  isTokenExpired(): boolean {
    try {
      const expiresAt = localStorage.getItem(this.EXPIRES_AT_KEY);
      
      if (!expiresAt) {
        return true;
      }

      const expirationTime = parseInt(expiresAt);
      
      if (isNaN(expirationTime)) {
        return true;
      }

      const currentTime = Date.now();

    

      return currentTime >= expirationTime;
    } catch (error) {
      return true;
    }
  }

  removeToken(): void {
    try {
      localStorage.removeItem(this.TOKEN_KEY);
      localStorage.removeItem(this.EXPIRES_AT_KEY);
      localStorage.removeItem('rol');
      localStorage.removeItem('name');
      localStorage.removeItem('id');
    } catch (error) {
    }
  }

  hasToken(): boolean {
    const token = this.getToken();
    const isExpired = this.isTokenExpired();

    if (!token || isExpired) {
      this.removeToken();
      return false;
    }
    return true;
  }

  clear(): void {
    localStorage.clear();
  }

  getItem(key: string): string | null {
    return localStorage.getItem(key);
  }

  setItem(key: string, value: string): void {
    localStorage.setItem(key, value);
  }
  getItemId(key: string): number | null {
    const value = localStorage.getItem(key);
    return value ? parseInt(value, 10) : null;  // Convertir la cadena a número
  }
  

}