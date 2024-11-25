import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeRemaining'
})
export class TimeRemainingPipe implements PipeTransform {

  transform(value: string): string {
    const now = new Date();
    const expirationDate = new Date(value); // La fecha de expiración en formato ISO
    const difference = expirationDate.getTime() - now.getTime();

    if (difference <= 0) {
      return 'Expirada'; // Si ya pasó el tiempo, mostramos "Expirada"
    }

    const hours = Math.floor(difference / (1000 * 3600));
    const minutes = Math.floor((difference % (1000 * 3600)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    let remainingTime = '';

    if (hours > 0) {
      remainingTime += `${hours} horas `;
    }

    if (minutes > 0) {
      remainingTime += `${minutes} minutos `;
    }

    remainingTime += `${seconds} segundos`;

    return remainingTime;
  }

}
