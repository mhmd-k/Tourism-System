import { Container, Stack } from "@mui/material";

function About() {
  return (
    <Container className="about">
      <h1>About Travel Helper</h1>
      <Stack direction="row" gap={2}>
        <div className="image">
          <img src="/src/assets/generate-trip-2.jpg" alt="" />
        </div>
        <div>
          <p>
            At Travel Helper, we're passionate about making travel planning
            easy, efficient, and cost-effective. Whether you're a seasoned
            globetrotter or a first-time traveler, our platform is designed to
            simplify your journey. Here's what we offer:
          </p>
          <div>
            Optimized Routes: Our intelligent algorithms calculate the shortest
            and most efficient travel routes between destinations. Say goodbye
            to hours of manual research - we've got you covered.
          </div>
          <div>
            Budget-Friendly Options: We understand that travel costs matter.
            That's why we prioritize finding the cheapest flights and affordable
            accommodation options. No more breaking the bank!
          </div>
          <div>
            Flight Booking: Need to book a flight? Look no further. Our seamless
            flight booking system connects you to major airlines, ensuring a
            smooth and hassle-free experience.
          </div>
          <div>
            Hotel Reservations: Finding the perfect place to stay is crucial.
            With our hotel booking feature, you can easily browse and reserve
            accommodations that suit your preferences and budget.
          </div>
        </div>
      </Stack>
    </Container>
  );
}

export default About;
