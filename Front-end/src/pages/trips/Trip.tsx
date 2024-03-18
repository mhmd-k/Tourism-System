import { ChangeEvent, useState } from "react";
import MapElement from "./MapElement";
import tripData from "../../data/generateTripResponse.json";
import TripHeader from "./TripHeader";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import DayList from "./DayList";

function Trip() {
  const [trip, setTrip] = useState(tripData);
  const [activeDay, setActiveDay] = useState(0);

  const handleDayChange = (_event: ChangeEvent<unknown>, page: number) => {
    setActiveDay(page - 1);
  };

  console.log("trip: ", trip);

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
        <Stack direction={"row"} alignItems={"center"} padding={"10px"}>
          Days:{" "}
          <Pagination
            count={trip.tripDays.length}
            color="primary"
            onChange={handleDayChange}
          />
        </Stack>
        <DayList {...trip.tripDays[activeDay]} />
      </aside>
      <MapElement lng={12.46031690814332} lat={42.920110744370284} />
    </div>
  );
}

export default Trip;
