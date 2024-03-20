import {
  Avatar,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import PlaceIcon from "../../components/PlaceIcon";
import { PlaceLocation, TripPlace } from "../../types";
import { InfoOutlined } from "@mui/icons-material";
import { useState } from "react";
import PlaceModal from "./PlaceModal";

function PlaceItem({
  place,
  handleChangeLocation,
  isActive,
  activeIndex,
  setActiveIndex,
}: {
  place: TripPlace;
  handleChangeLocation: (location: PlaceLocation) => void;
  isActive: boolean;
  activeIndex: number;
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
}) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const { name, placeType, address, location } = place;

  const handleOpenCloseModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <>
      <ListItem
        className={isActive ? "day-item active" : "day-item"}
        onClick={() => {
          handleChangeLocation({
            lat: Number(location.split(" ")[0]),
            lng: Number(location.split(" ")[1]),
          });
          setActiveIndex(activeIndex);
        }}
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
