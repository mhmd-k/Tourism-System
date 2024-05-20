import { Box } from "@mui/material";
import { AttachMoney, Bed, LocationCity } from "@mui/icons-material";
import { mapStore } from "../../zustand/MapStore";

function DayModal() {
  const activeDay = mapStore((state) => state.activeDay);
  const trip = mapStore((state) => state.trip);

  if (!trip) return;

  const day = trip.tripDays[activeDay];

  return (
    <Box className="day-popup">
      <div className="header">
        <h3>Day {activeDay + 1}</h3>
        <div className="date">{day.date}</div>
      </div>
      <div className="body">
        <ul>
          <li>
            <LocationCity /> City: {day.city.name}{" "}
            {day.city.capital ? `(Capital)` : ""}
          </li>
          <li>
            <AttachMoney /> Needed Mony: {day.neededMony}$
          </li>
          <li>
            <Bed /> Hotel:{" "}
            {
              day.dayPlaces.find(
                (place) => place.placeType.toLowerCase() === "hotel"
              )?.name
            }
          </li>
        </ul>
      </div>
    </Box>
  );
}

export default DayModal;
