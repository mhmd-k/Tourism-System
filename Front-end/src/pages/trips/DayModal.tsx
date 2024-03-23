import { Backdrop, Box, Fade, Modal } from "@mui/material";
import { TripDay } from "../../types";
import { AttachMoney, Bed, LocationCity } from "@mui/icons-material";

function DayModal({
  activeDay,
  day,
  isModalOpen,
  handleOpenCloseModal,
}: {
  activeDay: number;
  day: TripDay;
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
        <Box className="day-popup">
          <div className="header">
            <h3>Day {activeDay + 1}</h3>
            <div className="date">{day.date}</div>
          </div>
          <div className="body">
            <ul>
              <li>
                <LocationCity /> City: {day.city.name}{" "}
                {day.city.capital ? `(Capital)` : ""}
              </li>
              <li>
                <AttachMoney /> Needed Mony: {day.neededMony}$
              </li>
              <li>
                <Bed /> Hotel: {day.hotelReservation?.hotelName}
              </li>
            </ul>
          </div>
        </Box>
      </Fade>
    </Modal>
  );
}

export default DayModal;
