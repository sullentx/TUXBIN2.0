import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatKm'
})
export class FormatKmPipe implements PipeTransform {
  transform(value: number, decimalPlaces: number = 1): string {
    if (value === null || value === undefined) {
      return '';
    }
    return `${value.toFixed(decimalPlaces)} KM`; 
  }
}
