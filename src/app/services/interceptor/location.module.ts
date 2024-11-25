import { NgModule } from '@angular/core';
import { LocationService } from './Geolocalizacion.interceptor';

@NgModule({
  providers: [LocationService],
})
export class LocationModule {}
