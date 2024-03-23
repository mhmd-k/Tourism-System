import { ChangeEvent, useEffect, useState } from "react";
import tripData from "../../data/generateTripResponse.json";
import TripHeader from "./TripHeader";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import DayList from "./DayList";
import { PlaceLocation, Trip } from "../../types";
import MapElement from "./MapElement";
import { Box, Drawer, IconButton } from "@mui/material";
import { InfoSharp, Map } from "@mui/icons-material";
import DayModal from "./DayModal";

function TripPage() {
  const [trip] = useState<Trip>(tripData);
  const [activeDay, setActiveDay] = useState(0);
  const [center, setCenter] = useState<PlaceLocation>({
    lat: Number(trip.tripDays[activeDay].dayPlaces[0].location.split(" ")[0]),
    lng: Number(trip.tripDays[activeDay].dayPlaces[0].location.split(" ")[1]),
  });
  const [open, setOpen] = useState<boolean>(false);
  const [markers, setMarkers] = useState<PlaceLocation[]>([]);
  const [isDayModalOpen, setIsDayModalOpen] = useState<boolean>(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const handleDayChange = (_event: ChangeEvent<unknown>, page: number) => {
    setActiveDay(page - 1);
    setCenter({
      lat: Number(trip.tripDays[page - 1].dayPlaces[0].location.split(" ")[0]),
      lng: Number(trip.tripDays[page - 1].dayPlaces[0].location.split(" ")[1]),
    });
  };

  const handleChangeLocation = (location: PlaceLocation) => {
    setCenter(location);
  };

  const handleOpenCloseModel = () => {
    setIsDayModalOpen(!isDayModalOpen);
  };

  useEffect(() => {
    setMarkers(
      trip.tripDays[activeDay].dayPlaces.map((e) => ({
        lat: Number(e.location.split(" ")[0]),
        lng: Number(e.location.split(" ")[1]),
      }))
    );
  }, [activeDay, trip]);

  const tripNavbar = (
    <>
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
        justifyContent={"space-evenly"}
      >
        <Pagination
          count={trip.tripDays.length}
          color="primary"
          onChange={handleDayChange}
          page={activeDay + 1}
        />
        <IconButton title="Day info" onClick={handleOpenCloseModel}>
          <InfoSharp />
        </IconButton>
        <DayModal
          activeDay={activeDay}
          day={trip.tripDays[activeDay]}
          isModalOpen={isDayModalOpen}
          handleOpenCloseModal={handleOpenCloseModel}
        />
      </Stack>
      <DayList
        day={trip.tripDays[activeDay]}
        handleChangeLocation={handleChangeLocation}
      />
    </>
  );

  return (
    <div className="trip">
      <IconButton className="trip-mobile-btn" onClick={toggleDrawer(true)}>
        <Map color="primary" fontSize="large" />
      </IconButton>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        <Box sx={{ width: 320 }} role="presentation">
          {tripNavbar}
        </Box>
      </Drawer>
      <aside>{tripNavbar}</aside>
      <MapElement center={center} markers={markers} />
    </div>
  );
}

export default TripPage;
