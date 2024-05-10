import { Container } from "@mui/material";
import FlightsTable from "../components/FlightsTable";

function FlightsReservationsPage() {
  return (
    <div className="reservations">
      <Container>
        <FlightsTable />
      </Container>
    </div>
  );
}

export default FlightsReservationsPage;
