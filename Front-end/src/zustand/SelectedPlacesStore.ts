import { create } from "zustand";
import { ModelPlace, TripPlace } from "../types";

interface SelectedPlaces {
  places: TripPlace[];
  modelPlaces: ModelPlace[];
  addPlace: (place: ModelPlace) => void;
  removePlace: (id: number) => void;
  setPlaces: (key: string, places: TripPlace[]) => void;
}

export const selectedPlacesStore = create<SelectedPlaces>((set) => ({
  places: [],
  modelPlaces: [],
  addPlace: (place) =>
    set((state) => {
      return { ...state, modelPlaces: [...state.modelPlaces, place] };
    }),
  removePlace: (id) =>
    set((state) => {
      return {
        ...state,
        modelPlaces: state.modelPlaces.filter((place) => place.id !== id),
      };
    }),
  // set places or modelPlaces
  setPlaces: (key, places) => set({ [key]: places }),
}));
