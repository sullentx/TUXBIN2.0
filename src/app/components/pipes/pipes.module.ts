import { NgModule } from '@angular/core';
import { FormatTruckMatriculaPipe } from './format-truck-matricula.pipe'; // Asegúrate de que la ruta sea correcta
import { FormatKmPipe } from './format-km-pipe.pipe';
@NgModule({
  declarations: [FormatTruckMatriculaPipe,FormatKmPipe],
  exports: [FormatTruckMatriculaPipe, FormatKmPipe] // Exporta la pipe para que se pueda usar en otros módulos
})
export class PipesModule {}
