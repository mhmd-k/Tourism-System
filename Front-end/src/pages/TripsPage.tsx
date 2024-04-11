import { Container } from "@mui/material";
import trips from "../data/getTripsResponse.json";
import TripCard from "../components/TripCard";

function TripsPage() {
  const tripsCards = trips.map((trip) => <TripCard {...trip} />);

  return (
    <div className="trips">
      <Container sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {tripsCards}
      </Container>
    </div>
  );
}

export default TripsPage;
