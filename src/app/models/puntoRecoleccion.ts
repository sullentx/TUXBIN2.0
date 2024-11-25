export default interface PuntoRecoleccion {
    id?: string;
    calle: string;
    colonia: string;
    cp: number;
    geojson: {
      type: string;
      coordinates: [number, number];
    };
    id_diarecoleccion: string;
  }