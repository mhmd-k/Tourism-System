import { AutocompleteRenderOptionState } from "@mui/material";
import PlaceIcon from "../../components/PlaceIcon";
import { TripPlace } from "../../types";

const PlaceOption = (
  place: TripPlace,
  state: AutocompleteRenderOptionState
) => (
  <div {...state} key={`${place.name}-${place.placeType}`}>
    <div className="icon">
      <PlaceIcon placeType={place.placeType} />
    </div>
  </div>
);

export default PlaceOption;
