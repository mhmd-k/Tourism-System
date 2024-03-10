export interface Response {
  message: string;
  status: number;
  data?: unknown;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignupRequest extends LoginRequest {
  name: string;
}
