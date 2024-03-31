import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import { IconButton, Stack, Typography } from "@mui/material";
import {
  DeleteOutline,
  EditLocationTwoTone,
  EmojiTransportation,
} from "@mui/icons-material";
import { TripPlace } from "../../types";
import PlaceCard from "../../components/PlaceCard";
import { formatTravelTime } from "../../utils";

function PlaceModal({
  place,
  isModalOpen,
  handleOpenCloseModal,
}: {
  place: TripPlace;
  isModalOpen: boolean;
  handleOpenCloseModal: () => void;
}) {
  return (
    <Modal
      open={isModalOpen}
      onClose={handleOpenCloseModal}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 800,
        },
      }}
    >
      <Fade in={isModalOpen}>
        <Box className="place-popup">
          <div className="header">
            <PlaceCard {...place} />
          </div>

          <div className="body">
            {place.description ? (
              <Typography
                component={"p"}
                color={"var(--text-color)"}
                fontSize={14}
                padding={1}
                borderBottom={"1px solid #d9d9d9"}
              >
                {place.description}
              </Typography>
            ) : (
              <></>
            )}
            <Stack
              direction="row"
              alignItems="center"
              padding="15px 0"
              borderBottom={"1px solid #d9d9d9"}
            >
              {place.placeType !== "airport" && place.transportationMethod ? (
                <div title="transport method">
                  <EmojiTransportation fontSize="small" />{" "}
                  {place.transportationMethod}
                </div>
              ) : (
                <></>
              )}
              {place.travelTimeInMinutes ? (
                <div title="travel time">
                  <img src="/src/assets/travel.png" alt="" />
                  {formatTravelTime(place.travelTimeInMinutes)}
                </div>
              ) : (
                <></>
              )}
              {place.time ? (
                <div title="arrival time">
                  <img src="/src/assets/wall-clock.png" alt="" />
                  {place.time}
                </div>
              ) : (
                <></>
              )}
            </Stack>
          </div>

          <div className="footer">
            <Stack direction={"row"} alignItems={"center"}>
              <Stack direction={"row"} marginLeft={"auto"}>
                <IconButton color="success" size="large">
                  <EditLocationTwoTone />
                </IconButton>
                <IconButton color="error" size="large">
                  <DeleteOutline />
                </IconButton>
              </Stack>
            </Stack>
          </div>
        </Box>
      </Fade>
    </Modal>
  );
}

export default PlaceModal;
