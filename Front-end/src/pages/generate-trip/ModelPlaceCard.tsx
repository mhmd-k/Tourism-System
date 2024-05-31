import { IconButton } from "@mui/material";
import { ModelPlace } from "../../types";
import { Add, Remove } from "@mui/icons-material";
import PlaceIcon from "../../components/PlaceIcon";
import { memo, useMemo } from "react";
import { tripInfoStore } from "../../zustand/TripInfoStore";
import { setImage } from "../../utils";

// TODO: Optimize performance issue - all ModelPlaceCards components are re-rendering on any card's button click

const ModelPlaceCard = memo(
  ({
    id,
    placeType,
    name,
    cityName,
    cityId,
    predictedRating,
    time,
    foodType,
  }: ModelPlace) => {
    const modelPlaces = tripInfoStore((state) => state.modelPlaces);
    const addPlace = tripInfoStore((state) => state.addPlace);
    const removePlace = tripInfoStore((state) => state.removePlace);

    const image = useMemo(() => setImage(placeType, foodType), []);

    const isSelected = useMemo(
      () => modelPlaces.find((place) => place.id === id),
      [id, modelPlaces]
    );

    const handelSelect = () => {
      if (isSelected) {
        removePlace(id);
      } else {
        addPlace({
          id,
          name,
          cityId,
          placeType,
          cityName,
          predictedRating,
          time,
          foodType,
        });
      }
    };

    return (
      <div className="ai-place-card">
        <div className="place-image">
          <img src={image} alt="" loading="lazy" />
          <IconButton
            size="large"
            onClick={handelSelect}
            sx={{ backgroundColor: isSelected ? "#f44336" : "#2196f3" }}
          >
            {isSelected ? <Remove /> : <Add />}
          </IconButton>
        </div>
        <div className="place-type">
          <PlaceIcon placeType={placeType} /> {placeType.toUpperCase()}
        </div>
        <h4>{name}</h4>
        <p>city: {cityName}</p>
      </div>
    );
  }
);

export default ModelPlaceCard;
