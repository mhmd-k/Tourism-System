import axios from "axios";
import {
  GenerateTripData,
  LoginRequest,
  PlaceLocation,
  SignupRequest,
} from "./types";

export async function signup(request: SignupRequest) {
  const { name, email, password, age } = request;

  try {
    const response = await axios.post("http://localhost:8000/api/signup", {
      name,
      email,
      password,
      age,
    });

    console.log("Signup Respnose:", response);
    return response;
  } catch (error) {
    console.log("Signup Error:", error);
    return error;
  }
}

export async function login(request: LoginRequest) {
  const { email, password } = request;

  try {
    const response = await axios.post("http://localhost:8000/api/login", {
      email,
      password,
    });

    console.log("Login Respnose:", response);
    return response;
  } catch (error) {
    console.log("Login Error:", error);
    return error;
  }
}

export async function getPath(
  center: PlaceLocation,
  destination: PlaceLocation
) {
  try {
    const response = await axios.get(
      `https://api.tomtom.com/routing/1/calculateRoute/${center.lat},${center.lng}:${destination.lat},${destination.lng}/json?key=YZJHNBZyfgHI0qyHkfQGAPe8ALsnCJN4`
    );

    // console.log("Get Path Response: ", response.data);

    const data = await response.data;

    return {
      travelTimeInSeconds: data.routes[0].summary.travelTimeInSeconds,
      lengthInMeters: data.routes[0].summary.lengthInMeters,
      coordinates: data.routes[0].legs[0].points.map(
        (point: { latitude: number; longitude: number }) => [
          point.longitude,
          point.latitude,
        ]
      ),
    };
  } catch (error) {
    return {
      travelTimeInSeconds: 0,
      lengthInMeters: 0,
      coordinates: [],
    };
  }
}

export async function generateTrip(tripInfo: GenerateTripData) {
  const body = {
    date: tripInfo.date.split("-").join("/"),
    fromcity: tripInfo.fromCity.toLowerCase(),
    tocountry: tripInfo.toCountry.toLowerCase(),
    "N.days": tripInfo.numberOfDays,
    "N.people": tripInfo.numberOfPeople,
    totalBudget: tripInfo.budget,
    PriceIsImportant: tripInfo.careAboutBudget,
    preferedplaces: tripInfo.preferredPlaces.map((e) =>
      e.toLowerCase().split(" ").join("")
    ),
    preferedfood: {
      "Fine dinning": Boolean(
        tripInfo.preferredFood.find((e) => e === "Fine dinning")
      ),
      "Fast food": Boolean(
        tripInfo.preferredFood.find((e) => e === "Fast food")
      ),
      "Sea food": Boolean(tripInfo.preferredFood.find((e) => e === "Sea food")),
      Dessert: Boolean(tripInfo.preferredFood.find((e) => e === "Dessert")),
      Traditional: Boolean(
        tripInfo.preferredFood.find((e) => e === "Traditional")
      ),
    },
  };

  console.log("body: ", body);

  try {
    const response = await axios.put(
      "http://localhost:8000/api/generate_trip",
      body
    );

    console.log("response: ", response);

    if (response?.status === 200) {
      const tripData = response.data;

      const tripDays = Object.values(tripData.tripDays).map((day) => ({
        // @ts-expect-error unknown type
        ...day,
        // @ts-expect-error unknown type
        dayPlaces: Object.values(day.dayPlaces),
      }));

      const hotelReservation = Object.values(tripData.hotelReservation);
      const flightReservation = Object.values(tripData.flightReservation);

      console.log("trip data: ", {
        ...tripData,
        id: 1,
        tripDays,
        hotelReservation,
        flightReservation,
      });

      return {
        id: 1,
        ...tripData,
        tripDays,
        hotelReservation,
        flightReservation,
      };
    } else {
      throw new Error("something went worng please try again later");
    }
  } catch (e) {
    console.error("error: ", e);
  }
}
