import { NgModule } from '@angular/core';
import { FormatTruckMatriculaPipe } from './format-truck-matricula.pipe'; 
import { FormatKmPipe } from './format-km-pipe.pipe';
import { TimeRemainingPipe } from './timeReaming.pipe';
@NgModule({
  declarations: [FormatTruckMatriculaPipe,FormatKmPipe, TimeRemainingPipe],
  exports: [FormatTruckMatriculaPipe, FormatKmPipe, TimeRemainingPipe] 
})
export class PipesModule {}
