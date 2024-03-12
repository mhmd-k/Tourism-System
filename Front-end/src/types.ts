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
  numberOfDays: number;
  numberOfPeople: number;
  budget: number;
  preferredFood: Array<string>;
  preferredPlaces: Array<string>;
}
