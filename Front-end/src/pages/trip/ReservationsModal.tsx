import { useState } from "react";
import Box from "@mui/material/Box";
import HotelsTable from "../../components/HotelsTable";
import FlightsTable from "../../components/FlightsTable";
import FormLabel from "@mui/material/FormLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import Typography from "@mui/material/Typography";
import CreditCardRoundedIcon from "@mui/icons-material/CreditCardRounded";
import SimCardRoundedIcon from "@mui/icons-material/SimCardRounded";
import { styled } from "@mui/system";
import { Alert, Button } from "@mui/material";
import { Info } from "@mui/icons-material";
import { mapStore } from "../../zustand/MapStore";
import { bookReservations } from "../../RESTFunctions";
import { ReservationsRequest } from "../../types";
import { userStore } from "../../zustand/UserStore";
import { alertStore } from "../../zustand/AlertStore";
import LoadingSpinner from "../../components/LoadingSpinner";

const FormGrid = styled("div")(() => ({
  display: "flex",
  flexDirection: "column",
}));

interface ReservationsModalProps {
  handleOpenCloseModel: () => void;
  handleReservationsDone: () => void;
}

function ReservationsModal({
  handleOpenCloseModel,
  handleReservationsDone,
}: ReservationsModalProps) {
  const [cardNumber, setCardNumber] = useState("");
  const [cvv, setCvv] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const setAlert = alertStore((state) => state.setAlert);

  const user = userStore((state) => state.user);

  const trip = mapStore((state) => state.trip);

  const flightsReservations = trip ? trip.flightReservation : [];
  const hotelsReservations = trip ? trip.hotelReservation : [];
  const numberOfPeople = trip ? trip.numberOfPeople : 0;

  const handleCardNumberChange = (event: { target: { value: string } }) => {
    if (event.target.value.length > 16) {
      setCardNumber(event.target.value.slice(0, 16));
    } else {
      setCardNumber(event.target.value);
    }
  };

  const handleNameChange = (event: { target: { value: string } }) => {
    setName(event.target.value);
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

  let totalCost = 0;
  flightsReservations.forEach((e) => {
    totalCost += e.toatlAmountOfMony;
  });
  hotelsReservations.forEach((e) => {
    totalCost += e.price * numberOfPeople;
  });

  const handlebooking = async () => {
    setIsLoading(true);

    try {
      if (trip && user) {
        const flightsRequest: ReservationsRequest = {
          flights: flightsReservations.map((e) => ({
            ticketPrice: e.price,
            numOfTickets: trip?.numberOfPeople,
            airportId: e.airportId,
            date: trip?.date,
          })),
          tripId: trip?.trip_id,
          userId: user?.id,
          creditCardInfo: {
            cardNumber: Number(cardNumber),
            name: name,
            cvv: Number(cvv),
          },
        };

        const hotelsRequest: ReservationsRequest = {
          hotels: hotelsReservations.map((e) => ({
            paidAmount: e.price * trip?.numberOfPeople,
            hotelId: e.id,
            date: trip?.date,
          })),
          tripId: trip?.trip_id,
          userId: user?.id,
          creditCardInfo: {
            cardNumber: Number(cardNumber),
            name: name,
            cvv: Number(cvv),
          },
        };

        const res = await bookReservations(flightsRequest, hotelsRequest);

        if (res) {
          setAlert({
            text: "Your reservations have been confirmed!",
            type: "success",
          });

          handleReservationsDone();
          handleOpenCloseModel();
        } else {
          setAlert({
            text: "An unexpected error occurred. Please try again later.",
            type: "error",
          });
        }
      }
    } catch (error) {
      console.error(error);
      setAlert({
        text: "An unexpected error occurred. Please try again later.",
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const isSubmitBtnDisabled =
    isLoading || !name || !cvv || !cardNumber || !expirationDate;

  return (
    <>
      {hotelsReservations.length > 0 && <HotelsTable />}
      {flightsReservations.length > 0 && <FlightsTable />}
      <p>Total: {totalCost}$</p>
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
            These reservations are fake, we are not going to take your money,
            you can put any information below and it would work.
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
          <Box className="payment-box">
            <FormGrid sx={{ flex: 1 }}>
              <FormLabel htmlFor="card-number" required>
                Card number
              </FormLabel>
              <OutlinedInput
                type="number"
                id="card-number"
                autoComplete="card-number"
                placeholder="0000 0000 0000 0000"
                required
                value={cardNumber}
                onChange={handleCardNumberChange}
              />
            </FormGrid>
            <FormGrid className="cvv">
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
          <Box className="payment-box">
            <FormGrid sx={{ flexGrow: 1 }}>
              <FormLabel htmlFor="card-name" required>
                Name
              </FormLabel>
              <OutlinedInput
                id="card-name"
                autoComplete="card-name"
                placeholder="John Smith"
                value={name}
                onChange={handleNameChange}
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
              disabled={isSubmitBtnDisabled}
              onClick={handlebooking}
            >
              {isLoading ? <LoadingSpinner size={10} color="white" /> : "Done"}
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default ReservationsModal;
