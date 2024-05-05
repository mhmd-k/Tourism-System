import { IconButton } from "@mui/material";
import { ModelPlace } from "../../types";
import { Add, Remove } from "@mui/icons-material";
import PlaceIcon from "../../components/PlaceIcon";
import { memo, useMemo, useState } from "react";
import { selectedPlacesStore } from "../../zustand/SelectedPlacesStore";
import { setImage } from "../../utils";

const ModelPlaceCard = memo(
  ({ id, placeType, name, cityName, cityId, predictedRating }: ModelPlace) => {
    const [selected, setSelected] = useState<boolean>(false);

    const addPlace = selectedPlacesStore((state) => state.addPlace);
    const removePlace = selectedPlacesStore((state) => state.removePlace);

    const image = useMemo(
      () =>
        placeType !== "restaurant"
          ? setImage(placeType)
          : `https://source.unsplash.com/1600x900/?${name}`,
      [name, placeType]
    );

    const handelSelect = () => {
      if (selected) {
        removePlace(id);
      } else {
        addPlace({
          id,
          name,
          cityId,
          placeType,
          cityName,
          predictedRating,
        });
      }
      setSelected(!selected);
    };

    return (
      <div className="ai-place-card">
        <div className="place-image">
          <img src={image} alt="" loading="lazy" />
          <IconButton
            size="large"
            onClick={handelSelect}
            sx={{ backgroundColor: selected ? "#f44336" : "#2196f3" }}
          >
            {selected ? <Remove /> : <Add />}
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
