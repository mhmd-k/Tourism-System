import { Backdrop, Box, Fade, Modal } from "@mui/material";

function ReservationModal() {
  return (
    <Modal
      open={true}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 800,
        },
      }}
    >
      <Fade in={true}>
        <Box className="reservation-popup">
          <div className="info">
            <h3>
              Total <span>$450</span>
            </h3>
            <ul>
              <li>
                date: <span>4/15/2024</span>
              </li>
              <li>
                Hotel: <span>Lameraza Hotel Roma</span>
              </li>
              <li>
                Price pear person: <span>$150</span>
              </li>
            </ul>
          </div>
          <div className="form">Hello</div>
        </Box>
      </Fade>
    </Modal>
  );
}

export default ReservationModal;
