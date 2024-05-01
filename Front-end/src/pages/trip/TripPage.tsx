import { ChangeEvent, useEffect, useState } from "react";
import tripData from "../../data/generateTripResponse.json";
import TripHeader from "./TripHeader";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import DayList from "./DayList";
import MapElement from "./MapElement";
import { Box, Drawer, IconButton } from "@mui/material";
import { CreditCard, InfoSharp, Map } from "@mui/icons-material";
import DayModal from "./DayModal";
import { mapStore } from "../../zustand/MapStore";
import { Trip, TripPlace } from "../../types";
import {
  formatMinutesToTime,
  placeSpentTime,
  stringToLngLat,
} from "../../utils";
import { getPath } from "../../RESTFunctions";
import Spinner from "../../components/Spinner";
import ReservationsModal from "./ReservationsModal";
import { useLocation } from "react-router-dom";

function TripPage() {
  const [trip, setTrip] = useState<Trip | null>(tripData);
  const [isLoading, setIsLoading] = useState(false);
  const [activeDay, setActiveDay] = useState(0);
  const [isMobileNavbarOpen, setIsMobileNavbarOpen] = useState<boolean>(false);
  const [isDayModalOpen, setIsDayModalOpen] = useState<boolean>(false);
  const [isReservationsModalOpen, setIsReservationsModalOpen] =
    useState<boolean>(false);

  console.log("activeDay: ", activeDay);
  console.log("trip: ", trip);

  const location = useLocation();

  console.log("location: ", location);

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

  const handleOpenCloseReservationsModel = () => {
    setIsReservationsModalOpen(!isReservationsModalOpen);
  };

  useEffect(() => {
    const newTrip = location.state.trip as Trip;

    setTrip(newTrip);

    async function fetchTripTimes() {
      setIsLoading(true);
      const newDays = [];
      if (trip) {
        for (const day of newTrip.tripDays) {
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

              const spentTime = placeSpentTime(day.dayPlaces[i].placeType);

              updatedDayPlaces.push({
                ...day.dayPlaces[i],
                travelTimeInMinutes: Math.round(res?.travelTimeInSeconds / 60),
                time: formatMinutesToTime(minutes),
                spentTime: spentTime,
              });

              minutes += spentTime;
            } else {
              updatedDayPlaces.push({
                ...day.dayPlaces[i],
                time: formatMinutesToTime(minutes),
              });
            }
          }

          console.log(`Updated day places[${day.dayId}]: `, updatedDayPlaces);

          newDays.push({ ...day, dayPlaces: updatedDayPlaces });
        }
      }

      setTrip({ ...newTrip, tripDays: newDays });
      setIsLoading(false);
    }

    // fetchTripTimes();
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
        TotalCost={trip.TotalCost}
        numberOfPeople={trip.numberOfPeople}
        careAboutBudget={location.state.careAboutBudget as boolean}
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
        userPlaces={location.state.places as TripPlace[]}
      />
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
      {trip.flightReservation || trip.hotelReservation ? (
        <IconButton
          className="reservations-btn"
          onClick={handleOpenCloseReservationsModel}
        >
          <CreditCard />
        </IconButton>
      ) : (
        <></>
      )}
      <ReservationsModal
        handleOpenCloseModal={handleOpenCloseReservationsModel}
        isModalOpen={isReservationsModalOpen}
        flightsReservations={trip.flightReservation}
        hotelsReservations={trip.hotelReservation}
        numberOfPeople={trip.numberOfPeople}
      />
    </div>
  );
}

export default TripPage;