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

// export function setMarkerIcon(placeType: string) {
//   switch (placeType.slice(0, 2)) {
//     case "air":
//       return `
// <svg width="800px" height="800px" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns">

//     <title>airplane</title>
//     <desc>Created with Sketch Beta.</desc>
//     <defs>

// </defs>
//     <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage">
//         <g id="Icon-Set" sketch:type="MSLayerGroup" transform="translate(-308.000000, -307.000000)" fill="#000000">
//             <path d="M337.854,311.163 L330.402,318.642 L334.908,331.037 C335.13,331.747 334.992,332.627 334.705,332.914 C333.89,333.73 333.309,333.342 333,333 L325.795,323.266 L317.819,331.27 L319.255,336.6 C318.688,336.032 315.38,331.602 315.301,331.521 C315.248,331.469 310.896,328.225 310.427,327.753 L315.538,329.133 L323.665,321.152 L314,314 C313.723,313.752 313.358,313.02 314.104,312.271 C314.392,311.984 315.262,311.897 315.97,312.12 L328.311,316.592 L335.864,309.175 C336.392,308.647 337.425,308.701 337.888,309.164 C338.35,309.627 338.382,310.636 337.854,311.163 L337.854,311.163 Z M339.207,307.82 C337.961,306.57 335.771,306.863 334.518,308.119 L328.141,314.481 L316.313,310.061 C315.18,309.768 314.039,309.389 312.634,310.798 C311.917,311.516 310.427,313.01 312.634,315.221 L320.744,321.861 L315.467,327.127 L310.543,325.896 C309.813,325.708 309.321,325.855 308.946,326.269 C308.757,326.505 307.386,327.521 308.342,328.479 L314.067,332.933 L318.521,338.658 C319.213,339.352 319.856,338.919 320.735,338.084 C321.292,337.526 321.172,337.239 321.004,336.426 L319.892,331.536 L325.133,326.277 L331.763,334.389 C333.969,336.6 335.46,335.105 336.177,334.389 C337.583,332.979 337.205,331.837 336.912,330.702 L332.529,318.854 L338.88,312.481 C340.133,311.226 340.454,309.069 339.207,307.82 L339.207,307.82 Z" id="airplane" sketch:type="MSShapeGroup">

// </path>
//         </g>
//     </g>
// </svg>`;
//     case "res":
//       return `
//         <svg width="24" height="24" viewBox="0 0 24 24">
//           <path d="M11 2v8.5c0 1.1-.9 2-2 2H7v9c0 .55-.45 1-1 1s-1-.45-1-1v-9H2c-1.1 0-2-.9-2-2V2h2v8h2V2h2v8h2V2h2zm5 0v9.5c0 1.1-.9 2-2 2h-2v9c0 .55-.45 1-1 1s-1-.45-1-1v-9h-2c-1.1 0-2-.9-2-2V2h10z"/>
//         </svg>
//       `;
//     case "sho":
//       return `
//         <svg width="24" height="24" viewBox="0 0 24 24">
//           <path d="M20 4h-4V2c0-1.1-.9-2-2-2H10C8.9 0 8 0.9 8 2v2H4c-1.1 0-2 0.9-2 2v14c0 1.1 0.9 2 2 2h16c1.1 0 2-0.9 2-2V6c0-1.1-0.9-2-2-2zm-6 0H10V2h4v2zm4 16H4V6h16v14z"/>
//         </svg>
//       `;
//     case "nig":
//       return `
//           <svg width="24" height="24" viewBox="0 0 24 24">
//             <path d="M12 4.5c-4.42 0-8 3.58-8 8s3.58 8 8 8c2.61 0 4.96-1.27 6.42-3.24-1.43.42-2.97.74-4.54.74-4.42 0-8-3.58-8-8s3.58-8 8-8c1.57 0 3.11.32 4.54.74C16.96 5.77 14.61 4.5 12 4.5z"/>
//           </svg>
//         `;
//     case "old":
//       return `
//           <svg width="24" height="24" viewBox="0 0 24 24">
//             <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 13h-4.5V19h-1v-4H7v-1h4.5V7h1v5H17v1z"/>
//           </svg>
//         `;
//     case "nat":
//       return `
//           <svg width="24" height="24" viewBox="0 0 24 24">
//             <path d="M12 2c-5.53 0-10 4.47-10 10s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm0 17.93c-4.42 0-8-3.58-8-8 0-.16.01-.31.02-.47.58-.26 1.09-.63 1.52-1.1.32-.35.62-.74.87-1.15.64.17 1.29.28 1.97.28 2.97 0 5.33-2.36 5.33-5.33 0-.21-.02-.42-.04-.63.36-.13.71-.31 1.04-.51.23.56.39 1.17.39 1.82 0 1.95-1.58 3.53-3.53 3.53-.21 0-.42-.02-.63-.04-.13.36-.31.71-.51 1.04.56.23 1.17.39 1.82.39 2.97 0 5.33-2.36 5.33-5.33 0-.68-.11-1.33-.28-1.97.41-.25.8-.55 1.15-.87-.57-.48-1.1-1.02-1.51-1.63.16-.02.31-.03.47-.03 4.42 0 8 3.58 8 8s-3.58 8-8 8z"/>
//           </svg>
//         `;
//     case "hot":
//       return `
//           <svg width="24" height="24" viewBox="0 0 24 24">
//             <path d="M7 14h10v-2h2v-2h-2V8H7v2H5v2h2v2zm12-6h-2v2h2v-2zm-4 4H9v-2H7v2H5v2h14v-2h-2v-2zm0-6h2V4h-2v2zm4 12v-2h-2v-2H5v2H3v2H1v2h22v-2h-2v-2h-2zm-4 2v-2H9v2h10zm-4 0h-2v-2h2v2zm0-10H9V8h6v2zm0 4H9v-2h6v2z"/>
//           </svg>
//         `;
//     default:
//       return `
//           <svg width="24" height="24" viewBox="0 0 24 24">
//             <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
//           </svg>
//         `;
//   }
// }
