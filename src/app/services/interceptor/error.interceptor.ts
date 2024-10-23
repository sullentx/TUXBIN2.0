import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private snackBar: MatSnackBar) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        // Manejar el error
        let errorMessage = 'Ocurrió un error desconocido';
        if (error.error instanceof ErrorEvent) {
          //lado del cliente
          errorMessage = `Error : ${error.error.message}`;
        } else {
          // Errores del lado del servidor
          errorMessage = `Código de error: ${error.status}\nMensaje: ${error.message}`;
        }
          // Mostrar un mensaje en el snackbar
        this.snackBar.open(errorMessage, 'Cerrar' ,{
          duration: 5000,
        });
        return throwError(error);
      })
    );
  }
}
