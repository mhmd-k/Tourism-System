import { List } from "@mui/material";
import PlaceItem from "./PlaceItem";
import { useEffect, useState } from "react";
import { mapStore } from "../../zustand/MapStore";
// import BreakItem from "./BreakItem";

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
        <div key={i}>
          <PlaceItem
            previosPlace={day.dayPlaces[i - 1] || null}
            place={place}
            nextPlace={day.dayPlaces[i + 1] || null}
            isActive={activePlace === i}
            activeIndex={i}
            setActiveIndex={setActivePlace}
          />
          {/* {i !== day.dayPlaces.length - 1 &&
          place.placeType.toLowerCase().slice(0, 3) !== "res" &&
          place.placeType.toLowerCase().slice(0, 3) !== "hot" &&
          place.placeType.toLowerCase().slice(0, 3) !== "air" ? (
            <BreakItem />
          ) : (
            <></>
          )} */}
        </div>
      ))}
    </List>
  );
}

export default DayList;
