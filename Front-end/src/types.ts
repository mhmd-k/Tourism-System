export interface Response {
  message: string;
  status: number;
  data?: unknown;
}

export interface User {
  name: string;
  email: string;
  token: string;
  imageReferance: null | string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignupRequest extends LoginRequest {
  name: string;
}

export interface SignupResponse {
  message: string;
  status: number;
  data: {
    user: User;
  };
}

export interface SignupError {
  response: {
    data: {
      status: number;
      message: string;
    };
  };
}
