import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import mapboxgl from 'mapbox-gl'

mapboxgl.accessToken = 'pk.eyJ1Ijoic3VsbGVudHgiLCJhIjoiY20zc3Vwcmp0MDEzODJtcHd0dm1zaXd0ZSJ9.uYiciu2hW8JyGW2UJk30ig';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
