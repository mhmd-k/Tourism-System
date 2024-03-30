import { GenerateTripData, PlaceLocation, User } from "./types";
import { DateTime } from "luxon";

export function isEmailValid(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

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
  for (const [, value] of Object.entries(userPreferrences)) {
    console.log("value:", value);
    if (!value) {
      return "Please fill all the fields";
    }
  }

  // if the user choosed less than 2 types of food
  if (userPreferrences.preferredFood.length < 2)
    return "Please Choose at least two types of food.";

  // if the user choosed less than 2 types of places
  if (userPreferrences.preferredPlaces.length < 2)
    return "Please Choose at least two types of Places.";

  return null;
}

export function setImage(placeType: string, foodType?: string) {
  let imageUrl = "";

  switch (placeType) {
    case "hotel":
      imageUrl = `/src/assets/hotel-${Math.ceil(Math.random() * 4)}.jpg`;
      break;

    case "airport":
      imageUrl = `/src/assets/airport-${Math.ceil(Math.random() * 3)}.jpg`;
      break;

    case "night place":
      imageUrl = `/src/assets/night-${Math.ceil(Math.random() * 2)}.jpg`;
      break;

    case "old place":
      imageUrl = `/src/assets/old-${Math.ceil(Math.random() * 5)}.jpg`;
      break;

    case "natural place":
      imageUrl = `/src/assets/nature-${Math.ceil(Math.random() * 3)}.jpg`;
      break;

    case "shopping place":
      imageUrl = `/src/assets/shop-${Math.ceil(Math.random() * 3)}.jpg`;
      break;

    case "restaurant":
      if (foodType === "fine dinning")
        imageUrl = `/src/assets/fine-dinning.jpg`;
      if (foodType === "sea food") imageUrl = `/src/assets/sea-food.jpg`;
      else imageUrl = `/src/assets/fast-food.jpg`;
      break;
  }

  return imageUrl;
}

export function stringToLngLat(str: string): PlaceLocation {
  const coords = str.split(" ");
  return {
    lat: Number(coords[0]),
    lng: Number(coords[1]),
  };
}

export function formatMinutesToTime(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const mins = Math.floor(minutes % 60);

  const time = DateTime.fromObject({ hour: hours, minute: mins });
  return time.toLocaleString(DateTime.TIME_SIMPLE);
}

export function formatTravelTime(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;

  let formattedTime = "";

  if (hours > 0) {
    formattedTime += `${hours}h `;
  }

  if (mins > 0) {
    formattedTime += `${mins}min`;
  }

  return formattedTime;
}

export function placeSpentTime(placeType: string): number {
  switch (placeType) {
    case "hotel":
      return 120; // 1 hour

    case "night place":
      return 120; // 2 hours

    case "old place":
      return 90; // 1 hour 30 minutes

    case "natural place":
      return 120; // 2 hours

    case "shopping place":
      return 60; // 1 hour

    case "restaurant":
      return 45; // 45 minutes

    default:
      return 0;
  }
}
