import { ChangeEvent, useState } from "react";
import tripData from "../../data/generateTripResponse.json";
import TripHeader from "./TripHeader";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import DayList from "./DayList";
import { PlaceLocation } from "../../types";
import MapElement from "./MapElement";
import { Box, Drawer, IconButton } from "@mui/material";
import { Map } from "@mui/icons-material";

function Trip() {
  const [trip] = useState(tripData || null);
  const [activeDay, setActiveDay] = useState(0);
  const [location, setLocation] = useState<PlaceLocation>({
    lat: Number(trip.tripDays[activeDay].dayPlaces[0].location.split(" ")[0]),
    lng: Number(trip.tripDays[activeDay].dayPlaces[0].location.split(" ")[1]),
  });
  const [open, setOpen] = useState<boolean>(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const handleDayChange = (_event: ChangeEvent<unknown>, page: number) => {
    setActiveDay(page - 1);
    setLocation({
      lat: Number(trip.tripDays[page - 1].dayPlaces[0].location.split(" ")[0]),
      lng: Number(trip.tripDays[page - 1].dayPlaces[0].location.split(" ")[1]),
    });
  };

  const handleChangeLocation = (location: PlaceLocation) => {
    setLocation(location);
  };

  return (
    <div className="trip">
      <IconButton className="trip-mobile-btn" onClick={toggleDrawer(true)}>
        <Map color="primary" fontSize="large" />
      </IconButton>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        <Box
          sx={{ width: 320 }}
          role="presentation"
          onClick={toggleDrawer(false)}
        >
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
              page={activeDay + 1}
            />
          </Stack>
          <DayList
            day={trip.tripDays[activeDay]}
            handleChangeLocation={handleChangeLocation}
          />
        </Box>
      </Drawer>
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
            page={activeDay + 1}
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
