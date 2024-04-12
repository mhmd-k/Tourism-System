import { Container } from "@mui/material";
import trips from "../data/getTripsResponse.json";
import TripCard from "../components/TripCard";

function TripsPage() {
  return (
    <div className="trips">
      <Container sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {trips.map((trip, i) => (
          <TripCard {...trip} key={i} />
        ))}
      </Container>
    </div>
  );
}

export default TripsPage;
