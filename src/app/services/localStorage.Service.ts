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
        console.error('Tiempo de expiración inválido:', expiresAt);
        return;
      }

      localStorage.setItem(this.TOKEN_KEY, token);
      localStorage.setItem(this.EXPIRES_AT_KEY, expiresAt.toString());
      
      console.log('Token y expiración guardados:', {
        token: token.substring(0, 10) + '...',
        expiresAt: expiresAt
      });
    } catch (error) {
      console.error('Error al guardar el token:', error);
    }
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  isTokenExpired(): boolean {
    try {
      const expiresAt = localStorage.getItem(this.EXPIRES_AT_KEY);
      
      if (!expiresAt) {
        console.log('No hay tiempo de expiración guardado');
        return true;
      }

      const expirationTime = parseInt(expiresAt);
      
      if (isNaN(expirationTime)) {
        console.log('Tiempo de expiración inválido');
        return true;
      }

      const currentTime = Date.now();

      console.log({
        currentTime,
        expirationTime,
        difference: expirationTime - currentTime,
        minutesRemaining: Math.floor((expirationTime - currentTime) / 1000 / 60)
      });

      return currentTime >= expirationTime;
    } catch (error) {
      console.error('Error al verificar la expiración:', error);
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
      console.error('Error al remover el token:', error);
    }
  }

  hasToken(): boolean {
    const token = this.getToken();
    const isExpired = this.isTokenExpired();

    console.log('Verificación de token:', {
      hasToken: !!token,
      isExpired: isExpired
    });

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
}