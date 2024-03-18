export interface Response {
  message: string;
  status: number;
  data?: unknown;
}

export interface User {
  name: string;
  email: string;
  token: string;
  image: null | string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignupRequest extends LoginRequest {
  name: string;
}

export interface UserResponse {
  message: string;
  status: number;
  data: {
    user: User;
  };
}

export interface UserResponseError {
  response: {
    data: {
      status: number;
      message: string;
    };
  };
}

export interface GenerateTripData {
  toCountry: string;
  fromCity: string;
  date: string;
  numberOfDays: number;
  numberOfPeople: number;
  budget: number;
  preferredFood: Array<string>;
  preferredPlaces: Array<string>;
}

export type PlacesTypes =
  | "airport"
  | "hotel"
  | "restaurant"
  | "night place"
  | "old place"
  | "natural place"
  | "shopping place";

export type FoodTypes =
  | "fine dinning"
  | "fast food"
  | "traditional"
  | "sea food"
  | "dessert";

export type TransportaionMethod = "plane" | "car" | "walking" | "train";

export interface TripPlace {
  id: number;
  name: string;
  placeType: PlacesTypes;
  price: number;
  stars: number;
  foodType: FoodTypes;
  address: string;
  transportaionMethod?: TransportaionMethod;
  ticketPrice?: number;
  location: string;
}
