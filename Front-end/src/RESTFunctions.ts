import axios from "axios";
import {
  GenerateTripData,
  GenerateTripRequestBody,
  LoginRequest,
  ModelPlace,
  PlaceLocation,
  ReservationsRequest,
  SignupRequest,
  Trip,
  TripPlace,
  UploadImageResponse,
  User,
} from "./types";
import { prepareCitySelectedPlaces } from "./utils";

const flaskUrl = "http://127.0.0.1:5000";
const laravelUrl = "http://localhost:8000/api";

export async function signup(request: SignupRequest) {
  const { name, email, password, age, gender, country } = request;

  try {
    const response = await axios.post(`${laravelUrl}/signup`, {
      name,
      email,
      password,
      age,
      gender,
      country,
    });

    console.log("Signup Respnose:", response);
    if (response.status === 200) {
      const data = await response.data;
      return data;
    }
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
  destination: PlaceLocation,
  transportMethod?: string
) {
  let URL = `https://api.tomtom.com/routing/1/calculateRoute/${center.lat},${center.lng}:${destination.lat},${destination.lng}/json?key=YZJHNBZyfgHI0qyHkfQGAPe8ALsnCJN4`;

  if (transportMethod) {
    URL = `https://api.tomtom.com/routing/1/calculateRoute/${center.lat},${center.lng}:${destination.lat},${destination.lng}/json?travelMode=${transportMethod}&key=YZJHNBZyfgHI0qyHkfQGAPe8ALsnCJN4`;
  }

  try {
    const response = await axios.get(URL);

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

  let preferredFood = tripInfo.preferredFood;
  let preferredPlaces = tripInfo.preferredPlaces;

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

  if (preferredFood.length === 0) {
    preferredFood = [
      "Sea food",
      "Traditional",
      "Dessert",
      "Fast food",
      "Fine dinning",
    ];
  }

  if (preferredPlaces.length === 0) {
    preferredPlaces = [
      "oldplace",
      "naturalplace",
      "nightplace",
      "shoppingplace",
    ];
  }

  console.log("tripInfo: ", tripInfo);

  const body: GenerateTripRequestBody = {
    user_id: userId,
    date: tripInfo.date.split("-").join("/"),
    fromcity: tripInfo.fromCity.toLowerCase(),
    tocountry: tripInfo.toCountry.toLowerCase(),
    "N.days": tripInfo.numberOfDays,
    "N.people": tripInfo.numberOfPeople,
    totalBudget: totalBudget,
    preferedplaces: preferredPlaces,
    preferedfood: {
      "Fine dinning": Boolean(preferredFood.find((e) => e === "Fine dinning")),
      "Fast food": Boolean(preferredFood.find((e) => e === "Fast food")),
      "Sea food": Boolean(preferredFood.find((e) => e === "Sea food")),
      Dessert: Boolean(preferredFood.find((e) => e === "Dessert")),
      Traditional: Boolean(preferredFood.find((e) => e === "Traditional")),
    },
    places: {
      roma: prepareCitySelectedPlaces(romaPlaces),
      milan: prepareCitySelectedPlaces(milanPlaces),
      napoli: prepareCitySelectedPlaces(napoliPlaces),
      florence: prepareCitySelectedPlaces(florencePlaces),
      venice: prepareCitySelectedPlaces(venicePlaces),
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

export async function getPredictedPlacesRatings(user: User) {
  console.log("user:", user);

  try {
    const response = await axios.post(`${flaskUrl}/predict`, {
      age: user.age,
      gender: user.gender,
      country: user.country,
      ...user.ratings,
    });

    if (response.status === 200) {
      console.log("getPredictedPlacesRatings Response: ", response.data);

      return response.data;
    } else {
      throw new Error("Server error: " + response.status);
    }
  } catch (error) {
    console.error("getPredictedPlacesRatings error: ", error);
  }
}

export async function getCountries(str: string) {
  try {
    const res = await axios.post(`${laravelUrl}/get_all-countries`, {
      letter: str,
    });

    console.log("getCountiesResponse: ", res);

    if (res.status === 200) {
      return res.data.countries;
    } else {
      throw new Error("error fetching countries");
    }
  } catch (error) {
    console.error("getCountiesResponse error: ", error);
  }
}

export async function getCities(str: string) {
  try {
    const res = await axios.post(`${laravelUrl}/get_all-cities`, {
      letter: str,
    });

    console.log("getCitiesResponse: ", res);

    if (res.status === 200) {
      return res.data.cities.filter((city: string) => city !== "roma");
    } else {
      throw new Error("error fetching cities");
    }
  } catch (error) {
    console.error("getCitiesResponse error: ", error);
  }
}

export async function getPlaces(placeName: string, placeType?: string) {
  const URL = placeType
    ? `${laravelUrl}/search?placeName=${placeName}&placeType=${placeType}`
    : `${laravelUrl}/search?placeName=${placeName}`;

  try {
    const response = await axios.get(URL);

    if (response.status === 200) {
      return response.data.places;
    } else {
      throw new Error(`getPalces error, status code:${response.status}`);
    }
  } catch (error) {
    console.error(error);
  }
}

export async function uploadImage(
  image: FormDataEntryValue | null,
  userId: number
) {
  try {
    const response: UploadImageResponse = await axios.post(
      "http://localhost:8000/api/update-image",
      {
        image: image,
        userId: userId,
      },
      { headers: { "Content-Type": "multipart/form-data" } }
    );

    console.log("UploadImageResponse: ", response);
    if (response.status === 200) {
      return response.data;
    }

    throw new Error("Error uploading image");
  } catch (error) {
    console.error("Error occurred during image upload:", error);
  }
}

export async function deleteImage(userId: number): Promise<boolean> {
  try {
    const res: UploadImageResponse = await axios.put(
      `${laravelUrl}/delete-image`,
      { userId: userId }
    );

    console.log("Delete Image response: ", res);
    if (res.status === 200) {
      return true;
    }

    throw new Error("Error deleting image");
  } catch (error) {
    console.error("Error occurred during image delete:", error);
    return false;
  }
}

export async function bookReservations(
  flightsReq: ReservationsRequest,
  hotelsReq: ReservationsRequest
) {
  try {
    console.log("flightsRequest: ", flightsReq);
    console.log("hotelsRequest: ", hotelsReq);

    const [response1, response2] = await Promise.all([
      axios.post(`${laravelUrl}/store_flights`, flightsReq),
      axios.post(`${laravelUrl}/store_hotels_reservations`, hotelsReq),
    ]);

    console.log("Res1: ", response1);
    console.log("Res2: ", response2);

    // Check if both responses have a status of 200
    if (response1.status === 200 && response2.status === 200) {
      return true;
    } else {
      throw new Error("Error storing flights or hotel reservations");
    }
  } catch (err) {
    console.error("storeFlightsError: ", err);
    return false;
  }
}

export async function getHotelsReservations(userId: number) {
  try {
    const response = await axios.post(`${laravelUrl}/get_hotels_reservations`, {
      userId,
    });

    console.log("get hotels res response: ", response);

    if (response.status === 200) {
      return response;
    } else {
      throw new Error("Error getting hotels reservations");
    }
  } catch (err) {
    console.error(err);
  }
}
