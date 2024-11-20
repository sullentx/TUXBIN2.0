import { NgModule } from '@angular/core';
import { FormatTruckMatriculaPipe } from './format-truck-matricula.pipe'; 
import { FormatKmPipe } from './format-km-pipe.pipe';
@NgModule({
  declarations: [FormatTruckMatriculaPipe,FormatKmPipe],
  exports: [FormatTruckMatriculaPipe, FormatKmPipe] 
})
export class PipesModule {}
