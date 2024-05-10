export interface Response {
  message: string;
  status: number;
  data?: unknown;
}

export interface UploadImageResponse {
  status: number;
  data?: {
    image: string;
    message: string;
  };
}

export interface User {
  id: number;
  name: string;
  email: string;
  token: string;
  image: null | string;
  age: number;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignupRequest extends LoginRequest {
  name: string;
  age: number;
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
  cheapestTrip: boolean;
  careAboutBudget: boolean;
  budget: number;
  preferredFood: Array<string>;
  preferredPlaces: Array<string>;
}

export interface PlaceLocation {
  lng: number;
  lat: number;
}

export interface Trip {
  trip_id: number;
  date: string;
  fromCity: string;
  destination: string;
  totalBudget: number;
  TotalCost: number;
  numberOfPeople: number;
  tripDays: TripDay[];
  flightReservation: FlightReservation[];
  hotelReservation: HotelReservation[];
}

export interface TripDay {
  dayId: number;
  date: string;
  city: City;
  neededMony: number;
  dayPlaces: TripPlace[];
}

export interface City {
  city_id: number;
  name: string;
  latitude: number;
  longitude: number;
  capital: number | boolean;
}

export interface TripPlace {
  id: number;
  name: string;
  placeType: string;
  address: string;
  location: string;
  stars?: number;
  description?: string;
  food_type?: string;
  price?: number;
  transportaionMethod?: string | null;
  ticketPrice?: number;
  travelTimeInMinutes?: number;
  time?: number;
  spentTime?: number;
  city_id?: number;
  cityName?: string;
}

export interface HotelReservation {
  address: string;
  city_id: number;
  id: number;
  location: string;
  name: string;
  placeType: string;
  price: number;
  stars: number;
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

export interface AverageUserRatings {
  shopping: number;
  hotel: number;
  restaurant: number;
  night: number;
  old: number;
  natural: number;
}

export interface ModelPlace {
  cityId: number;
  cityName: string;
  id: number;
  name: string;
  placeType: string;
  predictedRating: number;
  time: number;
}
