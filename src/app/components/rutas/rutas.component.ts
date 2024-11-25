import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { PuntoRecoleccionService } from '../../services/PuntoRecoleccion.Service';
import { RutaService } from '../../services/Rutas.service';
import PuntoRecoleccion from '../../models/puntoRecoleccion';
import { LocationService } from '../../services/interceptor/Geolocalizacion.interceptor';
import { FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UpperCasePipe } from '@angular/common';
@Component({
  selector: 'app-rutas',
  standalone: true,
  imports: [UpperCasePipe,FormsModule],
  templateUrl: './rutas.component.html',
  styleUrls: ['./rutas.component.scss']
})
export class RutasComponent implements OnInit, AfterViewInit {
  @ViewChild('mapDiv') mapDivElement!: ElementRef;
  map!: mapboxgl.Map;
  puntos: PuntoRecoleccion[] = [];
  puntosGuardados: PuntoRecoleccion[] = [];
  selectedPoints: PuntoRecoleccion[] = [];
  routeCoordinates: [number, number][] = [];
  puntosFiltrados: PuntoRecoleccion[] = [];
  searchTerm: string = '';
  routeDrawn = true;


  constructor(
    private rutaService: RutaService,
    private puntoRecoleccionService: PuntoRecoleccionService,
    private locationService:LocationService,
    private snackBar:MatSnackBar
  ) {}
ngOnInit(): void {
  // Cargar los puntos de recolección desde el servicio
  this.puntoRecoleccionService.obtenerPuntos().subscribe((puntos) => {
    this.puntosGuardados = puntos;
    this.puntos = puntos; // Asigna los puntos a this.puntos también
  });
}


  private mostrarPuntosEnMapa(): void {
    this.puntosGuardados.forEach((punto) => {
      const coordinates: [number, number] = Array.isArray(punto.geojson.coordinates) && punto.geojson.coordinates.length === 2
        ? punto.geojson.coordinates
        : [0, 0]; 
  
      const marker = new mapboxgl.Marker()
        .setLngLat(coordinates)
        .addTo(this.map);
  
    });
  }

  private cargarPuntosGuardados(): void {
    this.puntoRecoleccionService.obtenerPuntos().subscribe((puntos) => {
      this.puntosGuardados = puntos;
      this.mostrarPuntosEnMapa();
    });
  }
  ngAfterViewInit(): void {
    // Inicializar el mapa
    this.locationService.getUserLocation().then(
      (coords) => {
        this.initializeMap(coords);
        this.cargarPuntosGuardados();  
      },
      () => {
        this.initializeMap([0, 0]);
        this.cargarPuntosGuardados();  
      }
    );

    // Agregar los marcadores de los puntos de recolección al mapa
    this.puntos.forEach((punto) => {
      const marker = new mapboxgl.Marker()
        .setLngLat(punto.geojson.coordinates)
        .setPopup(new mapboxgl.Popup().setHTML(`<b>${punto.calle}</b><br>${punto.colonia}`))
        .addTo(this.map);

      // Hacer que los puntos se puedan seleccionar al hacer clic
      marker.getElement().addEventListener('click', () => {
        this.selectPointForRoute(punto);
      });
    });
  }

  
  
  selectPointForRoute(punto: PuntoRecoleccion): void {
    const index = this.selectedPoints.findIndex((p) => p.id === punto.id);
    if (index === -1) {
      // Si el punto no está seleccionado, agregarlo a la lista
      this.selectedPoints.push(punto);
    } else {
      // Si el punto ya está seleccionado, quitarlo de la lista
      this.selectedPoints.splice(index, 1);
    }
  }

  // Trazar la ruta con los puntos seleccionados
  async drawRoute(): Promise<void> {
    if (this.selectedPoints.length < 2) {
      this.snackBar.open('Se necesitan dos puntos para trazar una ruta', 'Cerrar'),3000
      return;
    }
  
    // Si ya existe una ruta, eliminarla
    if (this.map.getLayer('route')) {
      this.map.removeLayer('route');
      this.map.removeSource('route');
    }
  
    try {
      // Construir la URL para la API de direcciones de Mapbox
      const accessToken = 'pk.eyJ1Ijoic3VsbGVudHgiLCJhIjoiY20zc3Vwcmp0MDEzODJtcHd0dm1zaXd0ZSJ9.uYiciu2hW8JyGW2UJk30ig'; // Reemplaza con tu token
  
      const coordinates = this.selectedPoints
        .map((punto) => punto.geojson.coordinates.join(','))
        .join(';');
  
      const response = await fetch(
        `https://api.mapbox.com/directions/v5/mapbox/driving/${coordinates}?geometries=geojson&access_token=${accessToken}`
      );
  
      const data = await response.json();
  
      if (data.routes && data.routes[0]) {
        // Obtener la geometría de la ruta optimizada
        const route = data.routes[0].geometry;
  
        // Agregar la fuente de datos para la ruta
        this.map.addSource('route', {
          type: 'geojson',
          data: {
            type: 'Feature',
            properties: {},
            geometry: route
          }
        });
  
        // Agregar la capa de la ruta
        this.map.addLayer({
          id: 'route',
          type: 'line',
          source: 'route',
          layout: {
            'line-join': 'round',
            'line-cap': 'round'
          },
          paint: {
            'line-color': '#1DB954',
            'line-width': 5
          }
        });
  
        // Ajustar el mapa para mostrar toda la ruta
        const routeCoordinates = route.coordinates;
        const bounds = new mapboxgl.LngLatBounds();
  
        routeCoordinates.forEach((coord: mapboxgl.LngLatBoundsLike | mapboxgl.LngLatLike) => {
          bounds.extend(coord);
        });
  
        this.map.fitBounds(bounds, {
          padding: 50
        });
  
        // Guardar la geometría de la ruta generada localmente
        this.routeCoordinates = route.coordinates; // Asigna las coordenadas de la ruta
      }
    } catch (error) {
      this.snackBar.open('Ocurrio un error intenta de nuevo', 'Cerrar', { duration: 3000 });

    }
  }
  
  private initializeMap(coords: [number, number]): void {
    this.map = new mapboxgl.Map({
      container: this.mapDivElement.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: coords,
      zoom: 12
    });
  }

  filterPuntos(): void {
    if (!this.searchTerm) {
      this.puntosFiltrados = this.puntosGuardados;
      return;
    }
  
    const searchTermLower = this.searchTerm.toLowerCase();
    this.puntosFiltrados = this.puntosGuardados.filter(punto => 
      punto.colonia.toLowerCase().includes(searchTermLower) ||
      punto.calle.toLowerCase().includes(searchTermLower) ||
      punto.cp.toString().includes(searchTermLower)
    );
  
    if (this.puntosFiltrados.length === 0) {
      this.snackBar.open('No se encontraron puntos', 'Cerrar', { duration: 3000 });
    }
  }
  

  // Verificar si un punto está seleccionado
  isSelected(punto: PuntoRecoleccion): boolean {
    return this.selectedPoints.some(p => p.id === punto.id);
  }

  // Obtener el índice de selección de un punto
  getSelectionIndex(punto: PuntoRecoleccion): number {
    return this.selectedPoints.findIndex(p => p.id === punto.id);
  }

  // Limpiar selección
  clearSelection(): void {
    this.selectedPoints = [];
    // Si existe una ruta en el mapa, removerla
    if (this.map.getLayer('route')) {
      this.map.removeLayer('route');
      this.map.removeSource('route');
    }
  }

 

  saveRoute(): void {
    if (this.routeCoordinates.length === 0) {
      this.snackBar.open('No hay ruta para guardar', 'Cerrar', { duration: 3000 });
      return;
    }
  
    const rutaData = {
      nombre_de_ruta: 'Ruta Norte', // Cambiar por un nombre dinámico si es necesario
      id_puntos_recoleccion: this.selectedPoints.map((p) => p.id), // Enviar los ids de los puntos seleccionados
    };
  
    this.rutaService.createRuta(rutaData).subscribe({
      next: () => {
        this.snackBar.open('Ruta guardada exitosamente', 'Cerrar', { duration: 3000 });
      },
      error: (err) => {
        this.snackBar.open('Error al guardar la ruta', 'Cerrar', { duration: 3000 });
      }
    });
  }
  removePoint(punto: PuntoRecoleccion): void {
    // Buscar el índice del punto en la lista de puntos seleccionados
    const index = this.selectedPoints.findIndex((p) => p.id === punto.id);
  
    if (index !== -1) {
      // Eliminar el punto de la lista
      this.selectedPoints.splice(index, 1);
  
      // Si existe una ruta trazada, se debe actualizar
      if (this.map.getLayer('route')) {
        this.map.removeLayer('route');
        this.map.removeSource('route');
        this.routeCoordinates = []; // Limpiar las coordenadas actuales de la ruta
      }
  
      this.snackBar.open(`Punto Eliminado de la lista, ${punto.colonia.toUpperCase()}`, 'Cerrar', { duration: 3000 });
    }
  }
  

}
