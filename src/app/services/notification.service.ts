import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Notification } from '../models/Notification';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private apiUrl = 'https://tuxbinapi.integrador.xyz/notificaciones'; 

  constructor(private http: HttpClient) {}

  createNotification(notification: Notification): Observable<Notification> {
  
    return this.http.post<Notification>(this.apiUrl, notification).pipe(
      tap((response) => {
      }),
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }
  
  getNotifications(): Observable<Notification[]> {
    return this.http.get<Notification[]>(this.apiUrl);
  }

  
}
