import { create } from "zustand";
import { GenerateTripData, ModelPlace, TripPlace } from "../types";

interface TripInfoStore {
  tripInfo: GenerateTripData;
  setTripInfo: (tripInfo: GenerateTripData) => void;
  places: TripPlace[];
  modelPlaces: ModelPlace[];
  addPlace: (place: ModelPlace) => void;
  removePlace: (id: number) => void;
  setPlaces: (places: TripPlace[]) => void;
  setModelPlaces: (modelPlaces: ModelPlace[]) => void;
}

const defaultTripInfo: GenerateTripData = {
  toCountry: "",
  fromCity: "",
  date: "",
  numberOfDays: "",
  numberOfPeople: "",
  cheapestTrip: true,
  careAboutBudget: false,
  budget: 0,
  preferredFood: [],
  preferredPlaces: [],
  userCompanions: null,
};

export const tripInfoStore = create<TripInfoStore>((set) => ({
  tripInfo: defaultTripInfo,
  setTripInfo: (tripInfo) => set({ tripInfo }),
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
        places: state.places.filter((place) => place.id !== id),
      };
    }),
  // set places or modelPlaces
  setPlaces: (places) =>
    set((state) => {
      return { ...state, places };
    }),
  setModelPlaces: (modelPlaces) =>
    set((state) => {
      return { ...state, modelPlaces };
    }),
}));
