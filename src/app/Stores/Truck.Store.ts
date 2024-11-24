// stores/truck.store.ts
import { patchState, signalStore, withState, withMethods } from '@ngrx/signals';
import { Truck } from '../models/truck';

// Definir la interfaz del estado
interface TruckState {
  trucks: Truck[];
  selectedTruck: Truck | null;
  loading: boolean;
  error: string | null;
}

// Estado inicial
const initialState: TruckState = {
  trucks: [],
  selectedTruck: null,
  loading: false,
  error: null
};

export const TruckStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store) => ({
    
    // Métodos para actualizar el estado
    setTrucks(trucks: Truck[]) {
      patchState(store, { trucks });
    },

  getTruckCount(): number {
    return store.trucks.length;
  },

    addTruck(truck: Truck) {
      patchState(store, (state) => ({
        trucks: [...state.trucks, truck]
      }));
    },

    updateTruck(updatedTruck: Truck) {
      patchState(store, (state) => ({
        trucks: state.trucks.map(truck => 
          truck.id === updatedTruck.id ? updatedTruck : truck
        )
      }));
    },

    deleteTruck(id: string) { // Cambiar id a string
      patchState(store, (state) => ({
        trucks: state.trucks.filter(truck => truck.id === id) // Cambiar comparación a string
      }));
    },

    setSelectedTruck(truck: Truck | null) {
      patchState(store, { selectedTruck: truck });
    },

    setTruckById(id: string, truck: Truck) { // Cambiar id a string
      patchState(store, (state) => ({
        trucks: state.trucks.map(t => t.id === id ? truck : t) // Cambiar comparación a string
      }));
    },

    setLoading(loading: boolean) {
      patchState(store, { loading });
    },

    setError(error: string | null) {
      patchState(store, { error });
    },

  }))
);
