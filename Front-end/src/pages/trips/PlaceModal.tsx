import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import { IconButton, Stack, Typography } from "@mui/material";
import { DeleteOutline, EditLocationTwoTone } from "@mui/icons-material";
import { TripPlace } from "../../types";
import PlaceCard from "../../components/PlaceCard";

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
          <div className="place-popup-header">
            <PlaceCard {...place} />
          </div>

          {place.description ? (
            <Typography
              component={"p"}
              color={"var(--text-color)"}
              fontSize={14}
              padding={1}
              borderBottom={"1px solid var(--secondary-text-color)"}
            >
              {place.description}
            </Typography>
          ) : (
            <></>
          )}

          <div className="footer">
            <Stack direction={"row"} justifyContent={"end"}>
              <IconButton color="success" size="large">
                <EditLocationTwoTone />
              </IconButton>
              <IconButton color="error" size="large">
                <DeleteOutline />
              </IconButton>
            </Stack>
          </div>
        </Box>
      </Fade>
    </Modal>
  );
}

export default PlaceModal;
