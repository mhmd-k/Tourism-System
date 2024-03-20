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

export interface PlaceLocation {
  lng: number;
  lat: number;
}

export interface City {
  cityId: number;
  name: string;
  latitude: number;
  longitude: number;
  capital: boolean;
}

export interface TripPlace {
  id: number;
  name: string;
  placeType: string;
  address: string;
  location: string;
  stars?: number;
  description?: string;
  foodType?: string;
  price?: number;
  transportaionMethod?: string;
  ticketPrice?: number;
}

export interface HotelReservation {
  hotelId: number;
  hotelName: string;
  address: string;
  price: number;
  toatlAmountOfMony: number;
  location: string;
}

export interface FlightReservation {
  airportId: number;
  fromCity: string;
  airportName: string;
  address: string;
  price: number;
  toatlAmountOfMony: number;
  location: string;
}

export interface TripDay {
  dayId: number;
  date: string;
  city: City;
  neededMony: number;
  dayPlaces: TripPlace[];
  hotelReservation?: HotelReservation;
  flightReservation?: FlightReservation;
}
