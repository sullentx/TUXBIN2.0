import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { PuntoRecoleccionService } from '../../services/PuntoRecoleccion.Service';
import { LocationService } from '../../services/interceptor/Geolocalizacion.interceptor';
import { HttpClient } from '@angular/common/http';
import PuntoRecoleccion from '../../models/puntoRecoleccion';
import { PuntoListaComponent } from '../punto-lista/punto-lista.component';
import { ReactiveFormsModule } from '@angular/forms';
import Ruta from '../../models/Ruta';
import * as turf from '@turf/turf';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [PuntoListaComponent, ReactiveFormsModule, HeaderComponent, FooterComponent],
  templateUrl: './map-user.component.html',
  styleUrls: ['./map-user.component.scss']
})
export class MapUserComponent implements OnInit, AfterViewInit {
  @ViewChild('mapDiv') mapDivElement!: ElementRef;
  map!: mapboxgl.Map;
  puntosGuardados: PuntoRecoleccion[] = [];
  rutas: any[] = []; // Array para las rutas
  marcadores: mapboxgl.Marker[] = []; // Array para los marcadores de los puntos
  rutaSeleccionada: any = null; // Ruta seleccionada por el usuario
  searchRoute:string = '';

  // Mapa de colores por día
  private coloresPorDia: Record<string, string> = {
    '1': '#ff0000',
    '2': '#00ff00',
    '3': '#0000ff',
    '4': '#ffff00',
    '5': '#ff00ff',
    '6': '#00ffff',
    '7': '#ff8800'
  };

  constructor(
    private puntoRecoleccionService: PuntoRecoleccionService,
    private locationService: LocationService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    // Obtener puntos de recolección
    this.puntoRecoleccionService.obtenerPuntos().subscribe(puntos => {
      this.puntosGuardados = puntos;
    });

  
    // Aquí puedes obtener las rutas, suponiendo que tienes un servicio para esto
    this.obtenerRutas();
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

  verDetallesRuta(ruta:Ruta){}

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

    if (Array.isArray(punto.geojson.coordinates) &&
      punto.geojson.coordinates.length === 2 &&
      typeof punto.geojson.coordinates[0] === 'number' &&
      typeof punto.geojson.coordinates[1] === 'number') {
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
    puntos.forEach(punto => bounds.extend(punto.geojson.coordinates));

    this.map.fitBounds(bounds, { padding: 50, maxZoom: 15 });
  }

  private obtenerRutas(): void {
    this.http.get<any[]>('http://127.0.0.1:8000/rutas').subscribe(rutas => {
      this.rutas = rutas; // Guardar las rutas en un array
    });
  }

  // Método para seleccionar una ruta de la lista
  public seleccionarRuta(ruta: any): void {
    this.rutaSeleccionada = ruta;
    this.mostrarRutaEnMapa(ruta);
  }

  // Mostrar la ruta seleccionada en el mapa
  private mostrarRutaEnMapa(ruta: any): void {
    // Limpiar las rutas previas
  // Limpiar las rutas previas
const style = this.map.getStyle();
if (style && style.layers) {
  style.layers.forEach(layer => {
    if (layer.id.startsWith('ruta-')) {
      this.map.removeLayer(layer.id);
      this.map.removeSource(layer.id);
    }
  });
}


    // Conectar los puntos de la ruta seleccionada
    const coordenadasRuta: [number, number][] = [];
    ruta.id_puntos_recoleccion.forEach((idPunto: string | undefined) => {
      const punto = this.puntosGuardados.find(p => p.id === idPunto);
      if (punto && Array.isArray(punto.geojson.coordinates)) {
        coordenadasRuta.push(punto.geojson.coordinates as [number, number]);
      }
    });

    // Si tenemos más de un punto, mostramos la ruta
    if (coordenadasRuta.length > 1) {
      const coordinates = coordenadasRuta.map((coord) => coord.join(',')).join(';');

      const accessToken = 'pk.eyJ1Ijoic3VsbGVudHgiLCJhIjoiY20zc3Vwcmp0MDEzODJtcHd0dm1zaXd0ZSJ9.uYiciu2hW8JyGW2UJk30ig'; // Tu token de Mapbox

      fetch(`https://api.mapbox.com/directions/v5/mapbox/driving/${coordinates}?geometries=geojson&access_token=${accessToken}`)
        .then(response => response.json())
        .then(data => {
          if (data.routes && data.routes[0]) {
            const route = data.routes[0].geometry;
            this.map.addSource(`ruta-${ruta.id}`, {
              type: 'geojson',
              data: {
                type: 'Feature',
                properties: {},
                geometry: route
              }
            });

            this.map.addLayer({
              id: `ruta-${ruta.id}`,
              type: 'line',
              source: `ruta-${ruta.id}`,
              paint: {
                'line-color': '#007cbf',
                'line-width': 4
              }
            });
          }
        })
        .catch(error => console.error('Error al obtener la ruta:', error));
    }
  }

  obtenerPuntoMasCercano(rutaCoordenadas: any[]) {
    // Suponiendo que el centro del mapa es el punto de referencia
    const ubicacionMapa = this.map.getCenter();  // Obtén las coordenadas actuales del mapa

    let puntoMasCercano = null;
    let distanciaMinima = Infinity;

    // Calcular la distancia entre la ubicación actual del mapa y cada punto de la ruta
    rutaCoordenadas.forEach((punto: any) => {
      const distancia = turf.distance(
        turf.point([ubicacionMapa.lng, ubicacionMapa.lat]),
        turf.point([punto.lng, punto.lat])
      );

      if (distancia < distanciaMinima) {
        distanciaMinima = distancia;
        puntoMasCercano = punto;
      }
    });

    return puntoMasCercano;
  }
}
