import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatTruckMatricula'
})
export class FormatTruckMatriculaPipe implements PipeTransform {
  transform(matricula: number): string {
    return `MATRÍCULA: ${matricula.toString().padStart(6, '0')}`;
  }
}
