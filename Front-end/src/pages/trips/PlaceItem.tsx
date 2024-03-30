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
}: {
  place: TripPlace;
  nextPlace: TripPlace | null;
  isActive: boolean;
  activeIndex: number;
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
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
          <Avatar className="avatar">
            <PlaceIcon placeType={placeType} />
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
