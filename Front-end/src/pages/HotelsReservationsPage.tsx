import { Container } from "@mui/material";
import hotelReservations from "../data/hotelReservationsResponse.json";
import HotelsTable from "../components/HotelsTable";

function HotelsReservationsPage() {
  return (
    <div className="reservations">
      <Container>
        <HotelsTable hotels={hotelReservations} />
      </Container>
    </div>
  );
}

export default HotelsReservationsPage;
