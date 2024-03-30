import { ChangeEvent, useEffect, useState } from "react";
import tripData from "../../data/generateTripResponse.json";
import TripHeader from "./TripHeader";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import DayList from "./DayList";
import MapElement from "./MapElement";
import { Box, Drawer, IconButton } from "@mui/material";
import { InfoSharp, Map } from "@mui/icons-material";
import DayModal from "./DayModal";
import { mapStore } from "../../zustand/MapStore";
import { Trip } from "../../types";
import {
  formatMinutesToTime,
  placeSpentTime,
  stringToLngLat,
} from "../../utils";
import { getPath } from "../../RESTFunctions";
import Spinner from "../../components/Spinner";

function TripPage() {
  const [trip, setTrip] = useState<Trip | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [activeDay, setActiveDay] = useState(0);
  const [isMobileNavbarOpen, setIsMobileNavbarOpen] = useState<boolean>(false);
  const [isDayModalOpen, setIsDayModalOpen] = useState<boolean>(false);

  console.log("activeDAy: ", activeDay);

  const setCenter = mapStore((state) => state.setCenter);
  const setDestination = mapStore((state) => state.setDestination);
  const setMarkers = mapStore((state) => state.setMarkers);

  const toggleDrawer = (newOpen: boolean) => () => {
    setIsMobileNavbarOpen(newOpen);
  };

  const handleDayChange = (_event: ChangeEvent<unknown>, page: number) => {
    setActiveDay(page - 1);
    if (trip) {
      setCenter(stringToLngLat(trip.tripDays[activeDay].dayPlaces[0].location));
      setDestination(
        stringToLngLat(trip.tripDays[activeDay].dayPlaces[1].location)
      );
    }
  };

  const handleOpenCloseModel = () => {
    setIsDayModalOpen(!isDayModalOpen);
  };

  useEffect(() => {
    setTrip(tripData);

    async function fetchTripTimes() {
      setIsLoading(true);
      const newDays = [];
      for (const day of tripData.tripDays) {
        let minutes = 9 * 60;
        const updatedDayPlaces = [];
        for (let i = 0; i < day.dayPlaces.length; i++) {
          if (i !== 0) {
            await new Promise((resolve) => setTimeout(resolve, 1000)); // Delay of 1 second

            const res = await getPath(
              stringToLngLat(day.dayPlaces[i - 1].location),
              stringToLngLat(day.dayPlaces[i].location)
            );

            minutes += res?.travelTimeInSeconds / 60;

            updatedDayPlaces.push({
              ...day.dayPlaces[i],
              travelTimeInMinutes: Math.round(res?.travelTimeInSeconds / 60),
              time: formatMinutesToTime(minutes),
            });

            const spentTime = placeSpentTime(day.dayPlaces[i].placeType);
            minutes += spentTime;
          } else {
            updatedDayPlaces.push({
              ...day.dayPlaces[i],
              time: formatMinutesToTime(minutes),
            });
          }
        }

        console.log("Updated day places: ", updatedDayPlaces);

        newDays.push({ ...day, dayPlaces: updatedDayPlaces });
      }

      setTrip({ ...tripData, tripDays: newDays });
      setIsLoading(false);
    }

    fetchTripTimes();
  }, []);

  useEffect(() => {
    if (trip) {
      setCenter(stringToLngLat(trip.tripDays[activeDay].dayPlaces[0].location));

      setDestination(
        stringToLngLat(trip.tripDays[activeDay].dayPlaces[1].location)
      );

      setMarkers(
        trip.tripDays[activeDay].dayPlaces.map((e) =>
          stringToLngLat(e.location)
        )
      );
    }
  }, [activeDay, trip]);

  if (isLoading) return <Spinner color="var(--green-color)" size={50} />;
  if (!trip) return <h2>Error fetching trip</h2>;

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
      <DayList day={trip.tripDays[activeDay]} />
    </>
  );

  return (
    <div className="trip">
      <IconButton className="trip-mobile-btn" onClick={toggleDrawer(true)}>
        <Map color="primary" fontSize="large" />
      </IconButton>
      <Drawer open={isMobileNavbarOpen} onClose={toggleDrawer(false)}>
        <Box sx={{ width: 320 }} role="presentation">
          {tripNavbar}
        </Box>
      </Drawer>
      <aside>{tripNavbar}</aside>
      <MapElement />
    </div>
  );
}

export default TripPage;
