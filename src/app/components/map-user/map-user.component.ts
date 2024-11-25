import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import * as mapboxgl from 'mapbox-gl';
import { PuntoRecoleccionService } from '../../services/PuntoRecoleccion.Service';
import { LocationService } from '../../services/interceptor/Geolocalizacion.interceptor';
import { HttpClient } from '@angular/common/http';
import PuntoRecoleccion from '../../models/puntoRecoleccion';
import { PuntoListaComponent } from '../punto-lista/punto-lista.component';
@Component({
  selector: 'app-map',
  standalone: true,
  imports: [ReactiveFormsModule, PuntoListaComponent],
  templateUrl:'./map-user.component.html',
  styleUrl: './map-user.component.scss'
})
export class MapUserComponent implements OnInit, AfterViewInit {
  @ViewChild('mapDiv') mapDivElement!: ElementRef;
  map!: mapboxgl.Map;
  puntoForm!: FormGroup;
  searchResults: any[] = [];
  selectedCoordinates: [number, number] | null = null;
  puntosGuardados: PuntoRecoleccion[] = [];
  marker: mapboxgl.Marker | null = null;
  marcadores: mapboxgl.Marker[] = []; // Array para guardar todos los marcadores

  // Mapa de colores por día
  private coloresPorDia: Record<string, string> = {
    '1': '#ff0000', // Lunes - Rojo
    '2': '#00ff00', // Martes - Verde
    '3': '#0000ff', // Miércoles - Azul
    '4': '#ffff00', // Jueves - Amarillo
    '5': '#ff00ff', // Viernes - Magenta
    '6': '#00ffff', // Sábado - Cyan
    '7': '#ff8800'  // Domingo - Naranja
  };

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private puntoRecoleccionService: PuntoRecoleccionService,
    private locationService: LocationService
  ) {}

  ngOnInit(): void {
    this.puntoRecoleccionService.obtenerPuntos().subscribe((puntos) => {
      this.puntosGuardados = puntos;
    });
  }
  diasSemana = [
    { nombre: 'Lunes', color: '#FF6B6B' },
    { nombre: 'Martes', color: '#4ECB71' },
    { nombre: 'Miércoles', color: '#4A90E2' },
    { nombre: 'Jueves', color: '#FFC043' },
    { nombre: 'Viernes', color: '#B980F0' },
    { nombre: 'Sábado', color: '#45B7D1' },
    { nombre: 'Domingo', color: '#FF9F43' }
  ];
  

  ngAfterViewInit(): void {
    this.locationService.getUserLocation().then(
      (coords) => {
        this.initializeMap(coords);
        this.cargarPuntos();
      },
      () => {
        this.initializeMap([0, 0]);
        this.cargarPuntos();
      }
    );
  }

  
  private initializeMap(coords: [number, number]): void {
    this.map = new mapboxgl.Map({
      container: this.mapDivElement.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: coords,
      zoom: 12
    });
  }

  private cargarPuntos(): void {
    this.puntoRecoleccionService.obtenerPuntos().subscribe(
      (puntos) => {
        this.limpiarMarcadores();
        puntos.forEach(punto => this.agregarMarcador(punto));
        this.ajustarVistaMarcadores(puntos);
      },
      (error) => {
        console.error('Error al cargar los puntos', error);
      }
    );
  }

  private limpiarMarcadores(): void {
    this.marcadores.forEach(marcador => marcador.remove());
    this.marcadores = [];
  }

  private agregarMarcador(punto: PuntoRecoleccion): void {
    const el = document.createElement('div');
    el.className = 'marker';
    el.style.backgroundColor = this.coloresPorDia[punto.id_diarecoleccion] || '#999999';
    el.style.width = '20px';
    el.style.height = '20px';
    el.style.borderRadius = '50%';
    el.style.border = '2px solid white';
    el.style.boxShadow = '0 0 4px rgba(0,0,0,0.5)';

    if (
      Array.isArray(punto.geojson.coordinates) &&
      punto.geojson.coordinates.length === 2 &&
      typeof punto.geojson.coordinates[0] === 'number' &&
      typeof punto.geojson.coordinates[1] === 'number'
    ) {
      const marker = new mapboxgl.Marker(el)
        .setLngLat(punto.geojson.coordinates)
        .setPopup(
          new mapboxgl.Popup({ offset: 25 })
            .setHTML(`
              <h3>Punto de Recolección</h3>
              <p><strong>Calle:</strong> ${punto.calle}</p>
              <p><strong>Colonia:</strong> ${punto.colonia}</p>
              <p><strong>CP:</strong> ${punto.cp}</p>
              <p><strong>Día:</strong> ${this.obtenerNombreDia(punto.id_diarecoleccion)}</p>
            `)
        )
        .addTo(this.map);
      
      this.marcadores.push(marker);
    } else {
      console.error('Formato inválido para las coordenadas:', punto.geojson.coordinates);
    }
    
  }
  private obtenerNombreDia(id: string): string {
    const dias = {
      '1': 'Lunes',
      '2': 'Martes',
      '3': 'Miércoles',
      '4': 'Jueves',
      '5': 'Viernes',
      '6': 'Sábado',
      '7': 'Domingo'
    };
    return dias[1] || 'No especificado';
  }

  private ajustarVistaMarcadores(puntos: PuntoRecoleccion[]): void {
    if (puntos.length === 0) return;

    const bounds = new mapboxgl.LngLatBounds();
    puntos.forEach(punto => {
      bounds.extend(punto.geojson.coordinates);
    });

    this.map.fitBounds(bounds, {
      padding: 50,
      maxZoom: 15
    });
  }

}