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
  country: string;
  gender: "Male" | "Female";
  ratings: {
    hotel: number;
    natural: number;
    night: number;
    old: number;
    restaurant: number;
    shopping: number;
  };
}

export interface UserCompanion {
  age: number;
  gender: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignupRequest extends LoginRequest {
  name: string;
  age: number;
  country: string;
  gender: string;
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
  numberOfDays: number | "";
  numberOfPeople: number | "";
  cheapestTrip: boolean;
  careAboutBudget: boolean;
  budget: number;
  preferredFood: string[];
  preferredPlaces: string[];
  userCompanions: UserCompanion[];
}

export interface PlaceLocation {
  lng: number;
  lat: number;
  placeType?: string;
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
  transportaionMethod: "car" | "plane" | "walking";
  time: number;
  money_amount?: number;
  stars?: number;
  description?: string;
  food_type?: string;
  price?: number;
  travelTimeInMinutes?: number;
  city_id?: number;
  cityName?: string;
  distancefromlastplace?: number;
  startHour?: string;
  endHour?: string;
  ticketprice?: number;
  transportaioncost?: number;
  ticketprice_return?: number;
  transportation_time?: number;
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

export interface CreditCard {
  cardNumber: number;
  name: string;
  cvv: number;
}

export interface FlightRes {
  airportId: number;
  numOfTickets: number;
  ticketPrice: number;
  date: string;
}

export interface HotelRes {
  hotelId: number;
  paidAmount: number;
  date: string;
}

export interface ReservationsRequest {
  hotels?: HotelRes[];
  flights?: FlightRes[];
  userId: number;
  tripId: number;
  creditCardInfo: CreditCard;
}

export interface ModelPlace {
  cityId: number;
  cityName: string;
  id: number;
  name: string;
  placeType: string;
  predictedRating: number;
  time: number;
  foodType: string;
}

export interface GenerateTripRequestPlace {
  id: number;
  name: string;
  time: number | undefined;
}

export interface GenerateTripRequestBody {
  user_id: number;
  date: string;
  fromcity: string;
  tocountry: string;
  "N.days": number | "";
  "N.people": number | "";
  totalBudget: number | string;
  preferedplaces: string[];
  preferedfood: {
    "Fine dinning": boolean;
    "Fast food": boolean;
    "Sea food": boolean;
    Dessert: boolean;
    Traditional: boolean;
  };
  places: {
    roma: {
      nightplace: GenerateTripRequestPlace[];
      shoppingplace: GenerateTripRequestPlace[];
      naturalplace: GenerateTripRequestPlace[];
      resturant: GenerateTripRequestPlace[];
      oldplace: GenerateTripRequestPlace[];
      hotel: GenerateTripRequestPlace[];
    };
    milan: {
      nightplace: GenerateTripRequestPlace[];
      shoppingplace: GenerateTripRequestPlace[];
      naturalplace: GenerateTripRequestPlace[];
      resturant: GenerateTripRequestPlace[];
      oldplace: GenerateTripRequestPlace[];
      hotel: GenerateTripRequestPlace[];
    };
    napoli: {
      nightplace: GenerateTripRequestPlace[];
      shoppingplace: GenerateTripRequestPlace[];
      naturalplace: GenerateTripRequestPlace[];
      resturant: GenerateTripRequestPlace[];
      oldplace: GenerateTripRequestPlace[];
      hotel: GenerateTripRequestPlace[];
    };
    florence: {
      nightplace: GenerateTripRequestPlace[];
      shoppingplace: GenerateTripRequestPlace[];
      naturalplace: GenerateTripRequestPlace[];
      resturant: GenerateTripRequestPlace[];
      oldplace: GenerateTripRequestPlace[];
      hotel: GenerateTripRequestPlace[];
    };
    venice: {
      nightplace: GenerateTripRequestPlace[];
      shoppingplace: GenerateTripRequestPlace[];
      naturalplace: GenerateTripRequestPlace[];
      resturant: GenerateTripRequestPlace[];
      oldplace: GenerateTripRequestPlace[];
      hotel: GenerateTripRequestPlace[];
    };
  };
}
