import { create } from "zustand";
import { PlaceLocation, Trip } from "../types";

interface MapStore {
  trip: Trip | null;
  activeDay: number;
  center: PlaceLocation;
  duration: number;
  destination: PlaceLocation | null;
  markers: PlaceLocation[];
  setTrip: (trip: Trip) => void;
  setActiveDay: (day: number) => void;
  setCenter: (center: PlaceLocation) => void;
  setDuration: (duration: number) => void;
  setDestination: (destination: PlaceLocation | null) => void;
  setMarkers: (markers: PlaceLocation[]) => void;
}

export const mapStore = create<MapStore>((set) => ({
  trip: null,
  activeDay: 0,
  center: { lng: 0, lat: 0 },
  duration: 0,
  destination: { lng: 0, lat: 0 },
  markers: [],
  setTrip: (trip) => set({ trip }),
  setActiveDay: (activeDay) => set({ activeDay }),
  setCenter: (center) => set({ center }),
  setDuration: (duration) => set({ duration }),
  setDestination: (destination) => set({ destination }),
  setMarkers: (markers) => set({ markers: markers }),
}));
