import Box from "@mui/material/Box";
import { IconButton, Stack, Typography } from "@mui/material";
import { DeleteOutline, EditLocationTwoTone } from "@mui/icons-material";
import { TripPlace } from "../../types";
import PlaceCard from "../../components/PlaceCard";
import { formatDistance, formatTravelTime, stringToLngLat } from "../../utils";
import { useEffect, useState } from "react";
import { getPath } from "../../RESTFunctions";
import LoadingSpinner from "../../components/LoadingSpinner";

function PlaceModal({
  previosPlace,
  place,
}: {
  previosPlace: TripPlace | null;
  place: TripPlace;
}) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [travelTimeInSeconds, setTravelTimeInSeconds] = useState<number | null>(
    null
  );
  const [destince, setDestince] = useState<number | null>(null);

  // console.log("travelTimeInSeconds:", travelTimeInSeconds);
  // console.log("destince:", destince);

  useEffect(() => {
    async function getTime() {
      if (previosPlace && place.transportaionMethod) {
        setIsLoading(true);
        try {
          let t = "car";
          if (place.transportaionMethod === "walking") {
            t = "pedestrian";
          }

          const res = await getPath(
            stringToLngLat(previosPlace.location),
            stringToLngLat(place.location),
            t
          );

          setTravelTimeInSeconds(res.travelTimeInSeconds);
          setDestince(res.lengthInMeters);
        } catch (error) {
          console.error("getTravelTimeError", error);
        } finally {
          setIsLoading(false);
        }
      }
    }

    getTime();
  }, []);

  return (
    <Box className="place-popup">
      {isLoading ? (
        <LoadingSpinner size={30} color="red" />
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
              {travelTimeInSeconds !== null ? (
                <div title="travel time">
                  <img src="/src/assets/travel.png" alt="" />
                  {formatTravelTime(travelTimeInSeconds / 60)}{" "}
                  {place.transportaionMethod === "car"
                    ? "by car"
                    : place.transportaionMethod}
                </div>
              ) : (
                <></>
              )}

              {destince !== null ? (
                <div title="arrival time">
                  <img src="/src/assets/distance.png" />{" "}
                  {formatDistance(destince)}
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

          <div className="footer">
            <Stack direction={"row"} alignItems={"center"}>
              <Stack direction={"row"} marginLeft={"auto"}>
                <IconButton color="success" size="large">
                  <EditLocationTwoTone />
                </IconButton>
                <IconButton color="error" size="large">
                  <DeleteOutline />
                </IconButton>
              </Stack>
            </Stack>
          </div>
        </>
      )}
    </Box>
  );
}

export default PlaceModal;
