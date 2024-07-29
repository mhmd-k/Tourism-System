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
  const { toCountry, fromCity, numberOfDays, numberOfPeople, date } =
    userPreferrences;

  if (!fromCity) {
    return "Please select the city you are going from";
  }

  if (!toCountry) {
    return "Please select a country";
  }

  if (!date) {
    return "Please pick a date";
  }

  if (!numberOfPeople) {
    return "Please insert the number of people going on the trip";
  }

  if (!numberOfDays) {
    return "Please insert the length of the trip";
  }

  // if the number of days is greter than 26
  if (Number(userPreferrences.numberOfDays) > 30)
    return "Maximum number of days is 30";

  // if the number of people is greter than 30
  if (Number(userPreferrences.numberOfPeople) > 30)
    return "Maximum number of people is 30";

  // if the user selected only one type of food
  if (userPreferrences.preferredFood.length === 1)
    return "Please select at least two type of food";

  // if the user selected only one type of places
  if (userPreferrences.preferredPlaces.length === 1)
    return "Please select at least two type of food";

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
  const cleanedStr = str.replace(/,/g, ""); // Remove commas
  const coords = cleanedStr.split(/\s+/).map(Number);
  return {
    lat: coords[0],
    lng: coords[1],
  };
};

export const formatMinutesToTime = (minutes: number): string => {
  if (minutes > 1440) minutes -= 1440;
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

export const formatPlaceType = (palceType: string): string => {
  let str = "";
  switch (palceType.toLowerCase().slice(0, 3)) {
    case "res":
      str = "Restaurant";
      break;
    case "old":
      str = "Old Place";
      break;
    case "nig":
      str = "Night Place";
      break;
    case "sho":
      str = "Shopping Place";
      break;
    case "hot":
      str = "Hotel";
      break;
    case "nat":
      str = "Natural Place";
      break;

    default:
      str = "Airport";
  }

  return str;
};

export function calculateTotalCost(
  place: TripPlace,
  numberOfPeople: number,
  ishotelAgain?: boolean
): number {
  let totalCost = 0;

  if (place.price && !ishotelAgain) {
    totalCost += place.price * numberOfPeople;
  }

  if (place.ticketprice) totalCost += place.ticketprice * numberOfPeople;
  if (place.ticketprice_return)
    totalCost += place.ticketprice_return * numberOfPeople;

  if (place.transportaioncost) {
    totalCost += place.transportaioncost;
  }

  return totalCost;
}

export function formatCurrency(amount: number): string {
  const formattedAmount =
    amount % 1 === 0 ? amount.toFixed(0) : amount.toFixed(2);
  const numberWithCommas = formattedAmount.replace(
    /\B(?=(\d{3})+(?!\d))/g,
    ","
  );
  return `$${numberWithCommas}`;
}
