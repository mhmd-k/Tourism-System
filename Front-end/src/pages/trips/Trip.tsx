import { ChangeEvent, useState } from "react";
import tripData from "../../data/generateTripResponse.json";
import TripHeader from "./TripHeader";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import DayList from "./DayList";
import { PlaceLocation } from "../../types";
import MapElement from "./MapElement";

function Trip() {
  const [trip] = useState(tripData || null);
  const [activeDay, setActiveDay] = useState(0);
  const [location, setLocation] = useState<PlaceLocation>({
    lng: 12.46031690814332,
    lat: 42.920110744370284,
  });

  const handleDayChange = (_event: ChangeEvent<unknown>, page: number) => {
    setActiveDay(page - 1);
  };

  const handleChangeLocation = (location: PlaceLocation) => {
    setLocation(location);
  };

  return (
    <div className="trip">
      <aside>
        <TripHeader
          destination={trip.destination}
          date={trip.date}
          fromCity={trip.fromCity}
          totalBudget={trip.totalBudget}
          numberOfPeople={trip.numberOfPeople}
        />
        <Stack
          direction={"row"}
          alignItems={"center"}
          padding={"10px"}
          justifyContent={"center"}
        >
          <Pagination
            count={trip.tripDays.length}
            color="primary"
            onChange={handleDayChange}
          />
        </Stack>
        <DayList
          day={trip.tripDays[activeDay]}
          handleChangeLocation={handleChangeLocation}
        />
      </aside>
      <MapElement {...location} />
    </div>
  );
}

export default Trip;
