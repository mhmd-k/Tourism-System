import axios from "axios";
import { SignupRequest } from "./types";

export async function signup(request: SignupRequest) {
  const { name, email, password } = request;

  try {
    const response = await axios.post("http://localhost:8000/api/signup", {
      name,
      email,
      password,
    });

    console.log("Signup Respnose:", response);
    return response;
  } catch (error) {
    console.log("Signup Error:", error);
    return error;
  }
}
