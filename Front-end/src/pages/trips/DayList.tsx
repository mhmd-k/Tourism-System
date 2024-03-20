import { List } from "@mui/material";
import { PlaceLocation, TripDay } from "../../types";
import PlaceItem from "./PlaceItem";
import { useState } from "react";

function DayList({
  day,
  handleChangeLocation,
}: {
  day: TripDay;
  handleChangeLocation: (location: PlaceLocation) => void;
}) {
  const [activePlace, setActivePlace] = useState<number>(0);

  console.log("day: ", day);

  return (
    <List>
      {day.dayPlaces.map((place, i) => (
        <PlaceItem
          key={i}
          place={place}
          handleChangeLocation={handleChangeLocation}
          isActive={activePlace === i}
          activeIndex={i}
          setActiveIndex={setActivePlace}
        />
      ))}
    </List>
  );
}

export default DayList;
