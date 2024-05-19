import {
  GenerateTripData,
  ModelPlace,
  PlaceLocation,
  TripPlace,
  User,
} from "./types";
import { DateTime } from "luxon";

export const isEmailValid = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const getStoredUser = (): User | null => {
  const storedUser = localStorage.getItem("user");
  return storedUser ? JSON.parse(storedUser) : null;
};

// this funciton is used to logout the user
export const clearUserInfo = (): void => {
  localStorage.removeItem("user");
  window.location.reload();
};

export function validateTripInfo(
  userPreferrences: GenerateTripData
): string | null {
  // if there is a field empty
  for (const [key, value] of Object.entries(userPreferrences)) {
    if (
      !value &&
      key !== "careAboutBudget" &&
      key !== "budget" &&
      key !== "cheapestTrip"
    ) {
      return "Please fill all the fields";
    }
  }

  // if the number of days is greter than 26
  if (Number(userPreferrences.numberOfDays) > 30)
    return "Maximum number of days is 30";

  // if the number of people is greter than 30
  if (Number(userPreferrences.numberOfPeople) > 30)
    return "Maximum number of people is 30";

  return null;
}

export function setImage(placeType: string, foodType?: string) {
  let imageUrl = "";

  switch (placeType.slice(0, 3)) {
    case "hot":
      imageUrl = `/src/assets/hotel-${Math.ceil(Math.random() * 4)}.jpg`;
      break;

    case "air":
      imageUrl = `/src/assets/airport-${Math.ceil(Math.random() * 3)}.jpg`;
      break;

    case "nig":
      imageUrl = `/src/assets/night-${Math.ceil(Math.random() * 3)}.jpg`;
      break;

    case "old":
      imageUrl = `/src/assets/old-${Math.ceil(Math.random() * 4)}.jpg`;
      break;

    case "nat":
      imageUrl = `/src/assets/nature-${Math.ceil(Math.random() * 3)}.jpg`;
      break;

    case "sho":
      imageUrl = `/src/assets/shop-${Math.ceil(Math.random() * 3)}.jpg`;
      break;

    case "res":
      if (foodType === "sea food") imageUrl = "/src/assets/sea-food.jpg";
      if (foodType === "fine dinning") imageUrl = "/src/assets/fineDinning.jpg";
      if (foodType === "fast food") imageUrl = "/src/assets/fastFood.jpg";
      if (foodType === "dessert") imageUrl = "/src/assets/dessert.jpg";
      if (foodType === "traditional") imageUrl = "/src/assets/traditional.jpg";
      break;
  }

  return imageUrl;
}

export const stringToLngLat = (str: string): PlaceLocation => {
  const coords = str.split(/\s+/).map(Number);
  return {
    lat: coords[0],
    lng: coords[1],
  };
};

export const formatMinutesToTime = (minutes: number): string => {
  const hours = Math.floor(minutes / 60);
  const mins = Math.floor(minutes % 60);

  const time = DateTime.fromObject({ hour: hours, minute: mins });
  return time.toLocaleString(DateTime.TIME_SIMPLE);
};

export function formatTravelTime(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;

  let formattedTime = "";

  if (hours > 0) {
    formattedTime += `${hours}h `;
  }

  if (mins > 0) {
    formattedTime += `${Math.round(mins)}min`;
  }

  return formattedTime;
}

export function placeSpentTime(placeType: string): number {
  switch (placeType.toLowerCase()) {
    case "resturant":
      return 60; // 1 hour

    default:
      return 120; // 2 hours
  }
}

export function formatDistance(distanceInMeters: number): string {
  if (distanceInMeters < 1000) {
    return `${distanceInMeters}m`;
  }

  const distanceInKilometers = (distanceInMeters / 1000).toFixed(1);
  return `${distanceInKilometers}km`;
}

export function prepareCitySelectedPlaces(
  cityPlaces: (TripPlace | ModelPlace)[]
) {
  return {
    nightplace: cityPlaces
      .filter((e) => e.placeType.slice(0, 3) === "nig")
      .map((place) => ({
        id: place.id,
        name: place.name,
        time: place.time,
      })),
    shoppingplace: cityPlaces
      .filter((e) => e.placeType.slice(0, 3) === "sho")
      .map((place) => ({
        id: place.id,
        name: place.name,
        time: place.time,
      })),
    naturalplace: cityPlaces
      .filter((e) => e.placeType.slice(0, 3) === "nat")
      .map((place) => ({
        id: place.id,
        name: place.name,
        time: place.time,
      })),
    resturant: cityPlaces
      .filter((e) => e.placeType.slice(0, 3) === "res")
      .map((place) => ({
        id: place.id,
        name: place.name,
        time: place.time,
      })),
    oldplace: cityPlaces
      .filter((e) => e.placeType.slice(0, 3) === "old")
      .map((place) => ({
        id: place.id,
        name: place.name,
        time: place.time,
      })),
    hotel: cityPlaces
      .filter((e) => e.placeType.slice(0, 3) === "hot")
      .slice(0, 1)
      .map((place) => ({
        id: place.id,
        name: place.name,
        time: place.time,
      })),
  };
}

export function sleep(duration: number): Promise<void> {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, duration);
  });
}
