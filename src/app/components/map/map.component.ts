// map.component.ts
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import * as mapboxgl from 'mapbox-gl';
import { PuntoRecoleccionService } from '../../services/PuntoRecoleccion.Service';
import { LocationService } from '../../services/interceptor/Geolocalizacion.interceptor';
import { HttpClient } from '@angular/common/http';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import PuntoRecoleccion from '../../models/puntoRecoleccion';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UpperCasePipe } from '@angular/common';
import { HeaderComponent } from "../header/header.component";
import { HeaderAdminComponent } from "../header-admin/header-admin.component";
@Component({
  selector: 'app-map',
  standalone: true,
  imports: [ReactiveFormsModule, UpperCasePipe, HeaderAdminComponent],
  templateUrl:'./map.component.html',
  styleUrl: './map.component.scss'
})
export class MapComponent implements OnInit, AfterViewInit {
  @ViewChild('mapDiv') mapDivElement!: ElementRef;
  map!: mapboxgl.Map;
  puntoForm!: FormGroup;
  searchResults: any[] = [];
  selectedCoordinates: [number, number] | null = null;
  marker: mapboxgl.Marker | null = null;
  puntosGuardados: PuntoRecoleccion[] = [];
  markers: { [key: string]: mapboxgl.Marker } = {};


  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private puntoRecoleccionService: PuntoRecoleccionService,
    private locationService: LocationService,
    private snackBar: MatSnackBar
  ) {}



  ngOnInit(): void {
    this.puntoForm = this.fb.group({
      search: [''],
      CP: [null, [Validators.required, Validators.min(10000), Validators.max(99999)]],
      Colonia: ['', Validators.required],
      Calle: ['', Validators.required],
      id_DiaRecoleccion: ['', Validators.required]
      
    });

    this.puntoForm.get('search')?.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged()
      )
      .subscribe((query) => {
        if (query.length > 2) {
          this.searchLocations(query);
        } else {
          this.searchResults = [];
        }
      });

      this.puntoRecoleccionService.obtenerPuntos().subscribe((puntos) => {
        this.puntosGuardados = puntos;
      });
  }

  ngAfterViewInit(): void {
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
  }

  private cargarPuntosGuardados(): void {
    this.puntoRecoleccionService.obtenerPuntos().subscribe((puntos) => {
      this.puntosGuardados = puntos;
      this.mostrarPuntosEnMapa();
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
  
  eliminarPunto(punto: PuntoRecoleccion): void {
    this.puntoRecoleccionService.deletePuntoRecoleccion(punto.id || '').subscribe(
      () => {
        this.puntosGuardados = this.puntosGuardados.filter(p => p.id !== punto.id);
        
        this.snackBar.open('Punto eliminado exitosamente', 'Cerrar', {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'center'
        });
      },
      (error) => {
        
        this.snackBar.open('Hubo un error al eliminar el punto', 'Cerrar', {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'center'
        });
      }
    );
  }


  
  
  private initializeMap(coords: [number, number]): void {
    this.map = new mapboxgl.Map({
      container: this.mapDivElement.nativeElement,
      style: 'mapbox://styles/mapbox/outdoors-v12',
      center: coords,
      zoom: 12
    });

    this.map.addControl(new mapboxgl.NavigationControl());

    this.map.on('click', (e) => {
      const coords: [number, number] = [e.lngLat.lng, e.lngLat.lat];
      this.updateMarker(coords);
      this.selectedCoordinates = coords;
      this.reverseGeocode(coords);
    });
  }

  private updateMarker(coords: [number, number]): void {
    if (this.marker) {
      this.marker.remove();
    }
    this.marker = new mapboxgl.Marker()
      .setLngLat(coords)
      .addTo(this.map);
  }

  
  searchLocations(query: string): void {
    const accessToken = 'pk.eyJ1Ijoic3VsbGVudHgiLCJhIjoiY20zc3Vwcmp0MDEzODJtcHd0dm1zaXd0ZSJ9.uYiciu2hW8JyGW2UJk30ig'; // Reemplaza con tu token
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?access_token=${accessToken}&country=mx`;
    
    this.http.get(url).subscribe((response: any) => {
      this.searchResults = response.features;
    });
  }

  selectLocation(result: any): void {
    const coords: [number, number] = result.center;
    this.map.flyTo({
      center: coords,
      zoom: 15
    });
    this.updateMarker(coords);
    this.selectedCoordinates = coords;
    this.searchResults = [];
    
    const context = result.context || [];
    const address = this.extractAddressComponents(result, context);
    
    this.puntoForm.patchValue({
      Calle: address.street || '',
      Colonia: address.neighborhood || '',
      CP: address.postalCode || ''
    });
  }

  private extractAddressComponents(result: any, context: any[]): any {
    const address: any = {};
    
    // Try to get street name
    address.street = result.address ? `${result.address} ${result.text}` : result.text;
    
    // Extract neighborhood (colonia) and postal code from context
    context.forEach((item: any) => {
      if (item.id.startsWith('neighborhood')) {
        address.neighborhood = item.text;
      } else if (item.id.startsWith('postcode')) {
        address.postalCode = item.text;
      }
    });
    
    return address;
  }
  private reverseGeocode(coords: [number, number]): void {
    const accessToken = 'pk.eyJ1Ijoic3VsbGVudHgiLCJhIjoiY20zc3Vwcmp0MDEzODJtcHd0dm1zaXd0ZSJ9.uYiciu2hW8JyGW2UJk30ig';
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${coords[0]},${coords[1]}.json?access_token=${accessToken}`;
    
    this.http.get(url).subscribe((response: any) => {
      if (response.features && response.features.length > 0) {
        const result = response.features[0];
        const address = this.extractAddressComponents(result, result.context || []);
        console.log(result.context)
        this.puntoForm.patchValue({
          Calle: address.street || '',
          Colonia: address.city || '',
          CP: address.postalCode || ''
        });
      }
    });
  }

  
  guardarPunto(): void {
    if (this.puntoForm.valid && this.selectedCoordinates) {
      const geojson = {
        type: "Point",
        coordinates: this.selectedCoordinates
      };
  
      const punto: PuntoRecoleccion = {
        calle: this.puntoForm.get('Calle')?.value.toLowerCase(),
        colonia: this.puntoForm.get('Colonia')?.value.toLowerCase(),
        cp: this.puntoForm.get('CP')?.value,
        geojson: geojson,
        id_diarecoleccion: this.puntoForm.get('id_DiaRecoleccion')?.value
      };
  
      this.puntoRecoleccionService.createPuntoRecoleccion(punto).subscribe(
        (response) => {
  
          this.puntosGuardados.push(response);  
  
          this.mostrarPuntosEnMapa();
  
          this.puntoForm.reset();
          this.selectedCoordinates = null;
  
          this.snackBar.open('Punto agregado exitosamente', 'Cerrar', {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'center'
          });
        },
        (error) => {
  
          this.snackBar.open('Hubo un error al agregar el punto', 'Cerrar', {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'center'
          });
        }
      );
    }
  }
  
}