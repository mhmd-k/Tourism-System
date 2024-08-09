import { ChangeEvent, useEffect, useState } from "react";
import TripHeader from "./TripHeader";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import DayList from "./DayList";
import MapElement from "./MapElement";
import { Box, Button, Drawer, IconButton } from "@mui/material";
import { Close, CreditCard, Map } from "@mui/icons-material";
import { mapStore } from "../../zustand/MapStore";
import { formatCurrency, stringToLngLat } from "../../utils";
import ReservationsModal from "./ReservationsModal";
import Popup from "../../components/Popup";
import EventNoteIcon from "@mui/icons-material/EventNote";
import ItineraryTable from "./ItineraryTable";
import Alert from "@mui/material/Alert";
import { alertStore } from "../../zustand/AlertStore";

function TripPage() {
  // const [isLoading] = useState(false);
  const [isMobileNavbarOpen, setIsMobileNavbarOpen] = useState<boolean>(false);
  const [isTripInfoModalOpen, setIsTripInfoModalOpen] =
    useState<boolean>(false);
  const [isReservationsModalOpen, setIsReservationsModalOpen] =
    useState<boolean>(false);
  const [isReservationsDone, setIsReservationsDone] = useState<boolean>(false);

  const alert = alertStore((state) => state.alert);
  const setAlert = alertStore((state) => state.setAlert);

  const trip = mapStore((state) => state.trip);
  const activeDay = mapStore((state) => state.activeDay);
  const setTrip = mapStore((state) => state.setTrip);
  const setActiveDay = mapStore((state) => state.setActiveDay);

  console.log("activeDay: ", activeDay);
  console.log("trip: ", trip);
  console.log("alert: ", alert);

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

  const handleOpenCloseTripInfoModel = () => {
    setIsTripInfoModalOpen(!isTripInfoModalOpen);
  };

  const handleOpenCloseReservationsModel = () => {
    setIsReservationsModalOpen(!isReservationsModalOpen);
  };

  const handleReservationsDone = () => setIsReservationsDone(true);

  useEffect(() => {
    if (!trip) {
      const storedTrip = localStorage.getItem("trip");
      if (storedTrip) {
        setTrip(JSON.parse(storedTrip));
      }
    }

    if (trip && Math.abs(trip.totalBudget - trip.TotalCost) > 500) {
      setAlert({
        text: `Your budget is so low, The cheapest trip costs
      ${formatCurrency(trip.TotalCost)}`,
        type: "warning",
      });
    }
  }, []);

  useEffect(() => {
    const n = setTimeout(() => {
      setAlert(null);
    }, 10000);

    return () => clearTimeout(n);
  }, [alert, setAlert]);

  useEffect(() => {
    localStorage.setItem("trip", JSON.stringify(trip));
  }, [trip]);

  // useEffect(() => {
  // async function fetchTripTimes() {
  //   setIsLoading(true);
  //   const newDays = [];
  //   if (trip) {
  //     for (const day of newTrip.tripDays) {
  //       let minutes = 9 * 60;
  //       const updatedDayPlaces = [];
  //       for (let i = 0; i < day.dayPlaces.length; i++) {
  //         if (i !== 0) {
  //           await new Promise((resolve) => setTimeout(resolve, 1000)); // Delay of 1 second
  //           const res = await getPath(
  //             stringToLngLat(day.dayPlaces[i - 1].location),
  //             stringToLngLat(day.dayPlaces[i].location)
  //           );
  //           minutes += res?.travelTimeInSeconds / 60;
  //           const spentTime = placeSpentTime(day.dayPlaces[i].placeType);
  //           updatedDayPlaces.push({
  //             ...day.dayPlaces[i],
  //             travelTimeInMinutes: Math.round(res?.travelTimeInSeconds / 60),
  //             time: formatMinutesToTime(minutes),
  //             spentTime: spentTime,
  //           });
  //           minutes += spentTime;
  //         } else {
  //           updatedDayPlaces.push({
  //             ...day.dayPlaces[i],
  //             time: formatMinutesToTime(minutes),
  //           });
  //         }
  //       }
  //       console.log(`Updated day places[${day.dayId}]: `, updatedDayPlaces);
  //       newDays.push({ ...day, dayPlaces: updatedDayPlaces });
  //     }
  //   }
  //   setTrip({ ...newTrip, tripDays: newDays });
  //   setIsLoading(false);
  // }
  // fetchTripTimes();
  // }, []);

  useEffect(() => {
    if (trip) {
      setCenter(stringToLngLat(trip.tripDays[activeDay].dayPlaces[0].location));

      setDestination(
        stringToLngLat(trip.tripDays[activeDay].dayPlaces[1].location)
      );

      setMarkers(
        trip.tripDays[activeDay].dayPlaces.map((e) => ({
          ...stringToLngLat(e.location),
          placeType: e.placeType,
        }))
      );
    }
  }, [activeDay, trip]);

  // if (isLoading) return <LoadingSpinner color="var(--green-color)" size={50} />;
  if (!trip) return <h2>Error fetching trip</h2>;

  const tripNavbar = (
    <>
      <IconButton
        color="primary"
        className="trip-info-btn"
        onClick={handleOpenCloseTripInfoModel}
      >
        <EventNoteIcon />
      </IconButton>
      <TripHeader />
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
          siblingCount={0}
        />

        <Popup
          isOpen={isTripInfoModalOpen}
          handleOpenClose={handleOpenCloseTripInfoModel}
        >
          <Box className="popup itinerary-popup">
            <Stack direction="row" justifyContent="space-between">
              <h2>Trip Itinerary:</h2>
              <Button
                variant="contained"
                color="error"
                onClick={handleOpenCloseTripInfoModel}
                className="close-btn"
              >
                <Close />
              </Button>
            </Stack>
            {trip.tripDays.map((_, i) => (
              <ItineraryTable key={i} dayNumber={i + 1} />
            ))}
          </Box>
        </Popup>
      </Stack>
      <DayList />
    </>
  );

  return (
    <div className="trip">
      {alert ? (
        <Alert
          className="trip-alert"
          severity={alert.type}
          color={alert.type}
          variant="outlined"
          onClose={() => setAlert(null)}
        >
          {alert.text}
        </Alert>
      ) : (
        <></>
      )}
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
      {!isReservationsDone ? (
        <IconButton
          className="reservations-btn"
          onClick={handleOpenCloseReservationsModel}
        >
          <CreditCard />
        </IconButton>
      ) : (
        <></>
      )}
      <Popup
        isOpen={isReservationsModalOpen}
        handleOpenClose={handleOpenCloseReservationsModel}
      >
        <Box className="popup reservations-popup">
          <Stack direction="row" justifyContent="space-between">
            <h2>Reservations Needed:</h2>
            <Button
              variant="contained"
              color="error"
              onClick={handleOpenCloseReservationsModel}
              className="close-btn"
            >
              <Close />
            </Button>
          </Stack>
          <ReservationsModal
            handleOpenCloseModel={handleOpenCloseReservationsModel}
            handleReservationsDone={handleReservationsDone}
          />
        </Box>
      </Popup>
    </div>
  );
}

export default TripPage;
