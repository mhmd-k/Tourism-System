import {
  Avatar,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import PlaceIcon from "../../components/PlaceIcon";
import { TripPlace } from "../../types";
import { InfoOutlined } from "@mui/icons-material";
import { useState } from "react";
import PlaceModal from "./PlaceModal";
import { mapStore } from "../../zustand/MapStore";
import { stringToLngLat } from "../../utils";

function PlaceItem({
  place,
  nextPlace,
  isActive,
  activeIndex,
  setActiveIndex,
  userPlaces,
}: {
  place: TripPlace;
  nextPlace: TripPlace | null;
  isActive: boolean;
  activeIndex: number;
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
  userPlaces: TripPlace[];
}) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const { name, placeType, address, location } = place;

  const setCenter = mapStore((state) => state.setCenter);
  const setDestination = mapStore((state) => state.setDestination);

  const handleOpenCloseModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handelClick = () => {
    setCenter(stringToLngLat(location));

    if (nextPlace) {
      setDestination(stringToLngLat(nextPlace.location));
    } else {
      setDestination(null);
    }

    setActiveIndex(activeIndex);
  };

  let isUserPlace = false;
  userPlaces.forEach((e) => {
    if (e.name === place.name) isUserPlace = true;
  });

  return (
    <>
      <ListItem
        className={isActive ? "day-item active" : "day-item"}
        onClick={handelClick}
        secondaryAction={
          <IconButton
            edge="end"
            onClick={(
              event: React.MouseEvent<HTMLButtonElement, MouseEvent>
            ) => {
              event.stopPropagation();
              handleOpenCloseModal();
            }}
          >
            <InfoOutlined />
          </IconButton>
        }
      >
        <ListItemAvatar>
          <Avatar
            className="avatar"
            sx={{
              background: isUserPlace
                ? "linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%); "
                : "",
            }}
            title={placeType}
          >
            <PlaceIcon placeType={placeType.toLowerCase()} />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={name} secondary={address} />
      </ListItem>
      {isModalOpen ? (
        <PlaceModal
          place={place}
          isModalOpen={isModalOpen}
          handleOpenCloseModal={handleOpenCloseModal}
        />
      ) : (
        <></>
      )}
    </>
  );
}

export default PlaceItem;
