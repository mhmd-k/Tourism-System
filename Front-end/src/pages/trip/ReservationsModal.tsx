import { useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import HotelsTable from "../../components/HotelsTable";
import FlightsTable from "../../components/FlightsTable";
import FlightsReservations from "../../data/flightReservationsResponse.json";
import HotelsReservations from "../../data/hotelReservationsResponse.json";
import FormLabel from "@mui/material/FormLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import Typography from "@mui/material/Typography";
import CreditCardRoundedIcon from "@mui/icons-material/CreditCardRounded";
import SimCardRoundedIcon from "@mui/icons-material/SimCardRounded";
import { styled } from "@mui/system";
import { Alert, Button } from "@mui/material";
import { Info } from "@mui/icons-material";

const FormGrid = styled("div")(() => ({
  display: "flex",
  flexDirection: "column",
}));

function ReservationsModal({
  isModalOpen,
  handleOpenCloseModal,
}: {
  isModalOpen: boolean;
  handleOpenCloseModal: () => void;
}) {
  const [cardNumber, setCardNumber] = useState("");
  const [cvv, setCvv] = useState("");
  const [expirationDate, setExpirationDate] = useState("");

  const handleCardNumberChange = (event: { target: { value: string } }) => {
    const value = event.target.value.replace(/\D/g, "");
    const formattedValue = value.replace(/(\d{4})(?=\d)/g, "$1 ");
    if (value.length <= 16) {
      setCardNumber(formattedValue);
    }
  };

  const handleCvvChange = (event: { target: { value: string } }) => {
    const value = event.target.value.replace(/\D/g, "");
    if (value.length <= 3) {
      setCvv(value);
    }
  };

  const handleExpirationDateChange = (event: { target: { value: string } }) => {
    const value = event.target.value.replace(/\D/g, "");
    const formattedValue = value.replace(/(\d{2})(?=\d{2})/, "$1/");
    if (value.length <= 4) {
      setExpirationDate(formattedValue);
    }
  };

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
        <Box className="reservations-popup">
          <h3>Reservations Needed:</h3>
          <HotelsTable hotels={HotelsReservations.slice(0, 2)} />
          <FlightsTable flights={FlightsReservations.slice(0, 1)} />
          <p>Total: 2400$</p>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                p: 3,
                width: "100%",
                borderRadius: "20px",
                border: "1px solid ",
                borderColor: "divider",
                backgroundColor: "background.paper",
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.05)",
                gap: 2,
              }}
            >
              <Alert icon={<Info />} color="warning">
                These reservations are fake, we are not going to take your
                money, you can put any information below and it would work.
              </Alert>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: "10px",
                }}
              >
                <Typography variant="subtitle2">Credit card</Typography>
                <CreditCardRoundedIcon sx={{ color: "text.secondary" }} />
              </Box>
              <SimCardRoundedIcon
                sx={{
                  fontSize: { xs: 48, sm: 56 },
                  transform: "rotate(90deg)",
                  color: "text.secondary",
                }}
              />
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                  gap: 2,
                }}
              >
                <FormGrid sx={{ flexGrow: 1 }}>
                  <FormLabel htmlFor="card-number" required>
                    Card number
                  </FormLabel>
                  <OutlinedInput
                    id="card-number"
                    autoComplete="card-number"
                    placeholder="0000 0000 0000 0000"
                    required
                    value={cardNumber}
                    onChange={handleCardNumberChange}
                  />
                </FormGrid>
                <FormGrid sx={{ maxWidth: "20%" }}>
                  <FormLabel htmlFor="cvv" required>
                    CVV
                  </FormLabel>
                  <OutlinedInput
                    id="cvv"
                    autoComplete="CVV"
                    placeholder="123"
                    required
                    value={cvv}
                    onChange={handleCvvChange}
                  />
                </FormGrid>
              </Box>
              <Box sx={{ display: "flex", gap: 2 }}>
                <FormGrid sx={{ flexGrow: 1 }}>
                  <FormLabel htmlFor="card-name" required>
                    Name
                  </FormLabel>
                  <OutlinedInput
                    id="card-name"
                    autoComplete="card-name"
                    placeholder="John Smith"
                    required
                  />
                </FormGrid>
                <FormGrid sx={{ flexGrow: 1 }}>
                  <FormLabel htmlFor="card-expiration" required>
                    Expiration date
                  </FormLabel>
                  <OutlinedInput
                    id="card-expiration"
                    autoComplete="card-expiration"
                    placeholder="MM/YY"
                    required
                    value={expirationDate}
                    onChange={handleExpirationDateChange}
                  />
                </FormGrid>
              </Box>
              <Box display={"flex"}>
                <Button
                  color="primary"
                  variant="contained"
                  sx={{ marginLeft: "auto" }}
                >
                  Done
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
}

export default ReservationsModal;
