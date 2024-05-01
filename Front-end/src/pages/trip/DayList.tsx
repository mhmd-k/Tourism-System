import { List } from "@mui/material";
import PlaceItem from "./PlaceItem";
import { useEffect, useState } from "react";
import { mapStore } from "../../zustand/MapStore";

function DayList() {
  const [activePlace, setActivePlace] = useState<number>(0);

  const trip = mapStore((state) => state.trip);
  const activeDay = mapStore((state) => state.activeDay);

  const day = trip?.tripDays[activeDay];

  useEffect(() => {
    setActivePlace(0);
  }, [day]);

  if (!day) return;

  return (
    <List>
      {day.dayPlaces.map((place, i) => (
        <PlaceItem
          key={i}
          place={place}
          nextPlace={day.dayPlaces[i + 1] || null}
          isActive={activePlace === i}
          activeIndex={i}
          setActiveIndex={setActivePlace}
        />
      ))}
    </List>
  );
}

export default DayList;
