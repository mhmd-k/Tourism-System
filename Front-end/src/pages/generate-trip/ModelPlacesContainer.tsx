import { ModelPlace } from "../../types";
import { Stack } from "@mui/material";
import ModelPlaceCard from "./ModelPlaceCard";
import { useMemo } from "react";

function ModelPlacesContainer({ places }: { places: ModelPlace[] }) {
  const displayPlaces = useMemo(() => {
    const restaurants = places
      .filter((place) => place.placeType === "restaurant")
      .slice(0, 5);
    const oldPlaces = places
      .filter((place) => place.placeType === "old")
      .slice(0, 5);
    const nightPlaces = places
      .filter((place) => place.placeType === "night")
      .slice(0, 5);
    const shoppingPlaces = places
      .filter((place) => place.placeType === "shopping")
      .slice(0, 5);
    const hotels = places
      .filter((place) => place.placeType === "hotel")
      .slice(0, 5);
    const naturalPlaces = places
      .filter((place) => place.placeType === "natural")
      .slice(0, 5);

    return [
      ...restaurants,
      ...oldPlaces,
      ...nightPlaces,
      ...shoppingPlaces,
      ...hotels,
      ...naturalPlaces,
    ].sort(() => Math.random() - 0.5);
  }, [places]);

  return (
    <>
      <h3>Recommended to you by AI</h3>
      <Stack
        className="ai-places-container"
        direction="row"
        sx={{ overflowX: "auto" }}
        gap={2}
      >
        {displayPlaces.map((place) => (
          <ModelPlaceCard key={place.id} {...place} />
        ))}
      </Stack>
    </>
  );
}

export default ModelPlacesContainer;
