import FlightReservations from "../data/flightReservationsResponse.json";
import { Container } from "@mui/material";
import FlightsTable from "../components/FlightsTable";

function FlightsReservationsPage() {
  return (
    <div className="reservations">
      <Container>
        <FlightsTable flights={FlightReservations} />
      </Container>
    </div>
  );
}

export default FlightsReservationsPage;
