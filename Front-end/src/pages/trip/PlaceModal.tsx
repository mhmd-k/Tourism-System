import { IconButton, Stack, Typography } from "@mui/material";
import { DeleteOutline, EditLocationTwoTone } from "@mui/icons-material";
import { TripPlace } from "../../types";
import PlaceCard from "../../components/PlaceCard";
import { formatDistance, formatTravelTime } from "../../utils";
import { useState } from "react";
// import { getPath } from "../../RESTFunctions";
import ChangePlaceElement from "./ChangePlaceElement";
import { mapStore } from "../../zustand/MapStore";
import { alertStore } from "../../zustand/AlertStore";

function PlaceModal({
  previosPlace,
  place,
  handleOpenCloseModal,
}: {
  previosPlace: TripPlace | null;
  place: TripPlace;
  handleOpenCloseModal: () => void;
}) {
  // const [isLoading, setIsLoading] = useState<boolean>(false);
  // const [travelTimeInSeconds, setTravelTimeInSeconds] = useState<number | null>(
  //   null
  // );
  // const [destince, setDestince] = useState<number | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const setAlert = alertStore((state) => state.setAlert);

  const trip = mapStore((state) => state.trip);
  const activeDay = mapStore((state) => state.activeDay);
  const setTrip = mapStore((state) => state.setTrip);

  // useEffect(() => {
  //   async function getTime() {
  //     if (previosPlace && place.transportaionMethod) {
  //       setIsLoading(true);
  //       try {
  //         let t = "car";
  //         if (place.transportaionMethod === "walking") {
  //           t = "pedestrian";
  //         }

  //         const res = await getPath(
  //           stringToLngLat(previosPlace.location),
  //           stringToLngLat(place.location),
  //           t
  //         );

  //         setTravelTimeInSeconds(res.travelTimeInSeconds);
  //         setDestince(res.lengthInMeters);
  //       } catch (error) {
  //         console.error("getTravelTimeError", error);
  //       } finally {
  //         setIsLoading(false);
  //       }
  //     }
  //   }

  //   getTime();

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  const handleIsEditingChange = () => setIsEditing(!isEditing);

  const handlePlaceDelete = () => {
    if (trip) {
      setTrip({
        ...trip,
        tripDays: trip.tripDays.map((day, i) =>
          i === activeDay
            ? {
                ...day,
                neededMony: place.price
                  ? day.neededMony - place.price * trip.numberOfPeople
                  : day.neededMony,
                dayPlaces: day.dayPlaces.filter(
                  (p: TripPlace) => p.id !== place.id
                ),
              }
            : day
        ),
        TotalCost: place.price
          ? trip.TotalCost - place.price * trip.numberOfPeople
          : trip.TotalCost,
      });

      handleOpenCloseModal();

      setAlert({ text: "Place Deleted Successfully", type: "success" });
    }

    // TODO: make API call to delete the place
  };

  return (
    <>
      {isEditing ? (
        <ChangePlaceElement
          isEditing
          handleIsEditingChange={handleIsEditingChange}
          oldPlace={place}
          handleOpenCloseModal={handleOpenCloseModal}
        />
      ) : (
        <>
          <div className="header">
            <PlaceCard {...place} />
          </div>

          <div className="body">
            {place.description ? (
              <Typography
                component={"p"}
                color={"var(--text-color)"}
                fontSize={14}
                padding={1}
                borderBottom={"1px solid #d9d9d9"}
              >
                {place.description}
              </Typography>
            ) : (
              <></>
            )}
            <Stack
              direction="row"
              alignItems="center"
              padding="15px 0"
              borderBottom={"1px solid #d9d9d9"}
            >
              {place.transportation_time ? (
                <div title="travel time">
                  <img src="/src/assets/travel.png" alt="" />
                  {formatTravelTime(place.transportation_time)}{" "}
                  {place.transportaionMethod === "car"
                    ? "by car"
                    : place.transportaionMethod}
                </div>
              ) : (
                <></>
              )}

              {place.distancefromlastplace ? (
                <div title="arrival time">
                  <img src="/src/assets/distance.png" />{" "}
                  {formatDistance(place.distancefromlastplace)}
                </div>
              ) : (
                <></>
              )}

              {place.time ? (
                <div title="arrival time">
                  <img src="/src/assets/wall-clock.png" alt="" />
                  Time to spend: {formatTravelTime(place.time * 60)}
                </div>
              ) : (
                <></>
              )}
            </Stack>
          </div>

          {place.placeType !== "airport" && place.placeType !== "hotel" ? (
            <div className="footer">
              <Stack direction={"row"} alignItems={"center"}>
                <Stack direction={"row"} marginLeft={"auto"}>
                  <IconButton
                    color="success"
                    size="large"
                    onClick={handleIsEditingChange}
                  >
                    <EditLocationTwoTone />
                  </IconButton>
                  <IconButton
                    color="error"
                    size="large"
                    onClick={handlePlaceDelete}
                  >
                    <DeleteOutline />
                  </IconButton>
                </Stack>
              </Stack>
            </div>
          ) : (
            <></>
          )}
        </>
      )}
    </>
  );
}

export default PlaceModal;
