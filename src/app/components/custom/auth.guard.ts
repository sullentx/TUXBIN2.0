import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LocalStorageService } from '../../services/localStorage.Service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private localStorage: LocalStorageService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  canActivate(): boolean {
    if (this.localStorage.hasToken()) {
      return true;
    } else {
      this.snackBar.open(
        'Tu sesión ha expirado. Por favor, inicia sesión nuevamente.',
        'Cerrar',
        {
          duration: 3000, 
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
        }
      );

      this.router.navigate(['/login']); // Redirigir al login
      return false;
    }
  }
}
