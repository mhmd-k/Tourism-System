import axios from "axios";
import {
  AverageUserRatings,
  GenerateTripData,
  LoginRequest,
  ModelPlace,
  PlaceLocation,
  SignupRequest,
  Trip,
  TripPlace,
  User,
} from "./types";

const flaskUrl = "http://127.0.0.1:5000";
const laravelUrl = "http://localhost:8000/api";

export async function signup(request: SignupRequest) {
  const { name, email, password, age } = request;

  try {
    const response = await axios.post(`${laravelUrl}/signup`, {
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
    const response = await axios.post(`${laravelUrl}/login`, {
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

export async function generateTrip(
  userId: number,
  tripInfo: GenerateTripData,
  places: (TripPlace | ModelPlace)[]
) {
  const romaPlaces = places.filter(
    (e) => e.cityName && e.cityName.toLowerCase() === "roma"
  );
  const milanPlaces = places.filter(
    (e) => e.cityName && e.cityName.toLowerCase() === "milan"
  );
  const venicePlaces = places.filter(
    (e) => e.cityName && e.cityName.toLowerCase() === "venice"
  );
  const napoliPlaces = places.filter(
    (e) => e.cityName && e.cityName.toLowerCase() === "napoli"
  );
  const florencePlaces = places.filter(
    (e) => e.cityName && e.cityName.toLowerCase() === "florence"
  );

  let totalBudget: string | number = 0;

  if (!tripInfo.careAboutBudget) {
    // the user dosen't care about budget
    totalBudget = "Open";
  } else if (tripInfo.careAboutBudget && tripInfo.cheapestTrip) {
    // the user wants the cheapeast trip posibile
    totalBudget = "Minimum";
  } else if (
    tripInfo.careAboutBudget &&
    !tripInfo.cheapestTrip &&
    tripInfo.budget
  ) {
    // the user entered a budget
    totalBudget = tripInfo.budget;
  }

  const body = {
    user_id: userId,
    date: tripInfo.date.split("-").join("/"),
    fromcity: tripInfo.fromCity.toLowerCase(),
    tocountry: tripInfo.toCountry.toLowerCase(),
    "N.days": tripInfo.numberOfDays,
    "N.people": tripInfo.numberOfPeople,
    totalBudget: totalBudget,
    preferedplaces: tripInfo.preferredPlaces.map(
      (e) => e.toLowerCase().split(" ")[0]
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
    places: {
      roma: {
        night: romaPlaces
          .filter((e) => e.placeType.slice(0, 3) === "nig")
          .map((place) => ({
            id: place.id,
            name: place.name,
            time: place.time,
          })),
        shopping: romaPlaces
          .filter((e) => e.placeType.slice(0, 3) === "sho")
          .map((place) => ({
            id: place.id,
            name: place.name,
            time: place.time,
          })),
        natural: romaPlaces
          .filter((e) => e.placeType.slice(0, 3) === "nat")
          .map((place) => ({
            id: place.id,
            name: place.name,
            time: place.time,
          })),
        Resturants: romaPlaces
          .filter((e) => e.placeType.slice(0, 3) === "res")
          .map((place) => ({
            id: place.id,
            name: place.name,
            time: place.time,
          })),
        old: romaPlaces
          .filter((e) => e.placeType.slice(0, 3) === "old")
          .map((place) => ({
            id: place.id,
            name: place.name,
            time: place.time,
          })),
        Hotels: romaPlaces
          .filter((e) => e.placeType.slice(0, 3) === "hot")
          .slice(0, 1)
          .map((place) => ({
            id: place.id,
            name: place.name,
            time: place.time,
          })),
      },
      milan: {
        night: milanPlaces
          .filter((e) => e.placeType.slice(0, 3) === "nig")
          .map((place) => ({
            id: place.id,
            name: place.name,
            time: place.time,
          })),
        shopping: milanPlaces
          .filter((e) => e.placeType.slice(0, 3) === "sho")
          .map((place) => ({
            id: place.id,
            name: place.name,
            time: place.time,
          })),
        natural: milanPlaces
          .filter((e) => e.placeType.slice(0, 3) === "nat")
          .map((place) => ({
            id: place.id,
            name: place.name,
            time: place.time,
          })),
        Resturants: milanPlaces
          .filter((e) => e.placeType.slice(0, 3) === "res")
          .map((place) => ({
            id: place.id,
            name: place.name,
            time: place.time,
          })),
        old: milanPlaces
          .filter((e) => e.placeType.slice(0, 3) === "old")
          .map((place) => ({
            id: place.id,
            name: place.name,
            time: place.time,
          })),
        Hotels: milanPlaces
          .filter((e) => e.placeType.slice(0, 3) === "hot")
          .slice(0, 1)
          .map((place) => ({
            id: place.id,
            name: place.name,
            time: place.time,
          })),
      },
      venice: {
        night: venicePlaces
          .filter((e) => e.placeType.slice(0, 3) === "nig")
          .map((place) => ({
            id: place.id,
            name: place.name,
            time: place.time,
          })),
        shopping: venicePlaces
          .filter((e) => e.placeType.slice(0, 3) === "sho")
          .map((place) => ({
            id: place.id,
            name: place.name,
            time: place.time,
          })),
        natural: venicePlaces
          .filter((e) => e.placeType.slice(0, 3) === "nat")
          .map((place) => ({
            id: place.id,
            name: place.name,
            time: place.time,
          })),
        Resturants: venicePlaces
          .filter((e) => e.placeType.slice(0, 3) === "res")
          .map((place) => ({
            id: place.id,
            name: place.name,
            time: place.time,
          })),
        old: venicePlaces
          .filter((e) => e.placeType.slice(0, 3) === "old")
          .map((place) => ({
            id: place.id,
            name: place.name,
            time: place.time,
          })),
        Hotels: venicePlaces
          .filter((e) => e.placeType.slice(0, 3) === "hot")
          .slice(0, 1)
          .map((place) => ({
            id: place.id,
            name: place.name,
            time: place.time,
          })),
      },
      napoli: {
        night: napoliPlaces
          .filter((e) => e.placeType.slice(0, 3) === "nig")
          .map((place) => ({
            id: place.id,
            name: place.name,
            time: place.time,
          })),
        shopping: napoliPlaces
          .filter((e) => e.placeType.slice(0, 3) === "sho")
          .map((place) => ({
            id: place.id,
            name: place.name,
            time: place.time,
          })),
        natural: napoliPlaces
          .filter((e) => e.placeType.slice(0, 3) === "nat")
          .map((place) => ({
            id: place.id,
            name: place.name,
            time: place.time,
          })),
        Resturants: napoliPlaces
          .filter((e) => e.placeType.slice(0, 3) === "res")
          .map((place) => ({
            id: place.id,
            name: place.name,
            time: place.time,
          })),
        old: napoliPlaces
          .filter((e) => e.placeType.slice(0, 3) === "old")
          .map((place) => ({
            id: place.id,
            name: place.name,
            time: place.time,
          })),
        Hotels: napoliPlaces
          .filter((e) => e.placeType.slice(0, 3) === "hot")
          .slice(0, 1)
          .map((place) => ({
            id: place.id,
            name: place.name,
            time: place.time,
          })),
      },
      florence: {
        night: florencePlaces
          .filter((e) => e.placeType.slice(0, 3) === "nig")
          .map((place) => ({
            id: place.id,
            name: place.name,
            time: place.time,
          })),
        shopping: florencePlaces
          .filter((e) => e.placeType.slice(0, 3) === "sho")
          .map((place) => ({
            id: place.id,
            name: place.name,
            time: place.time,
          })),
        natural: florencePlaces
          .filter((e) => e.placeType.slice(0, 3) === "nat")
          .map((place) => ({
            id: place.id,
            name: place.name,
            time: place.time,
          })),
        Resturants: florencePlaces
          .filter((e) => e.placeType.slice(0, 3) === "res")
          .map((place) => ({
            id: place.id,
            name: place.name,
            time: place.time,
          })),
        old: florencePlaces
          .filter((e) => e.placeType.slice(0, 3) === "old")
          .map((place) => ({
            id: place.id,
            name: place.name,
            time: place.time,
          })),
        Hotels: florencePlaces
          .filter((e) => e.placeType.slice(0, 3) === "hot")
          .slice(0, 1)
          .map((place) => ({
            id: place.id,
            name: place.name,
            time: place.time,
          })),
      },
    },
  };

  console.log("body: ", body);

  try {
    const response = await axios.put(`${laravelUrl}/generate_trip`, body);

    console.log("response: ", response);

    if (response?.status === 200) {
      const tripData = response.data.trip as Trip;

      const tripDays = Object.values(tripData.tripDays).map((day) => ({
        ...day,
        dayPlaces: Object.values(day.dayPlaces),
      }));

      const hotelReservation = Object.values(tripData.hotelReservation);
      const flightReservation = Object.values(tripData.flightReservation);

      console.log("trip data: ", {
        ...tripData,
        tripDays,
        hotelReservation,
        flightReservation,
      });

      return {
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

export async function getPredictedPlacesRatings(
  user: User,
  averageUserRatings: AverageUserRatings
) {
  try {
    const response = await axios.post(`${flaskUrl}/predict`, {
      age: user.age,
      gender: "Male",
      country: "China",
      ...averageUserRatings,
    });

    if (response.status === 200) {
      const data = await response.data;

      console.log("getPredictedPlacesRatings Response: ", data);

      return data;
    } else {
      throw new Error("Server error: " + response.status);
    }
  } catch (error) {
    console.error("getPredictedPlacesRatings error: ", error);
  }
}
