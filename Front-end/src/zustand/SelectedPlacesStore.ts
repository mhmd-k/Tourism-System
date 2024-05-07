import { create } from "zustand";
import { ModelPlace, TripPlace } from "../types";

interface selectedPlaces {
  places: TripPlace[];
  ModelPlaces: ModelPlace[];
  addPlace: (place: ModelPlace) => void;
  removePlace: (id: number) => void;
  setPlaces: (key: string, places: TripPlace[]) => void;
}

export const selectedPlacesStore = create<selectedPlaces>((set) => ({
  places: [],
  ModelPlaces: [],
  addPlace: (place) =>
    set((state) => {
      return { ...state, ModelPlaces: [...state.ModelPlaces, place] };
    }),
  removePlace: (id) =>
    set((state) => {
      return {
        ...state,
        ModelPlaces: state.ModelPlaces.filter((place) => place.id !== id),
      };
    }),
  setPlaces: (key, places) => set({ [key]: places }),
}));
