import { List } from "@mui/material";
import { TripDay, TripPlace } from "../../types";
import PlaceItem from "./PlaceItem";
import { useEffect, useState } from "react";

function DayList({
  day,
  userPlaces,
}: {
  day: TripDay;
  userPlaces: TripPlace[];
}) {
  const [activePlace, setActivePlace] = useState<number>(0);

  useEffect(() => {
    setActivePlace(0);
  }, [day]);

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
          userPlaces={userPlaces}
        />
      ))}
    </List>
  );
}

export default DayList;
