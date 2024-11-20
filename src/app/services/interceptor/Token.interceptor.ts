import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { LocalStorageService } from '../localStorage.Service';
export const TokenInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const localStorage = inject(LocalStorageService);

  // Verificar si la ruta es pública (por ejemplo, login)
  const isPublicRoute = req.url.includes('/login') || req.url.includes('/public');
  
  if (isPublicRoute) {
    return next(req);
  }

  const token = localStorage.getToken();

  if (token && !localStorage.isTokenExpired()) {
    // Token válido, añadir al header
    const clonedRequest = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`)
    });

    return next(clonedRequest).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          localStorage.clear();
          router.navigate(['/login']);
        }
        return throwError(() => error);
      })
    );
  } else if (token && localStorage.isTokenExpired()) {
    // Token expirado
    localStorage.clear();
    router.navigate(['/login']);
    return throwError(() => new Error('Token expirado'));
  }

  // No hay token
  router.navigate(['/login']);
  return throwError(() => new Error('No hay token'));
};