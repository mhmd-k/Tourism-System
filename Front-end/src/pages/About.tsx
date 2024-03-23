import { Container, Stack } from "@mui/material";

function About() {
  return (
    <Container className="about">
      <h1>About Travel Helper</h1>
      <Stack direction="row" gap={4}>
        <div className="image">
          <img src="/src/assets/generate-trip-2.jpg" alt="" />
        </div>
        <div className="content">
          <p>
            At <span>Travel Helper</span>, we believe that traveling should be
            an exciting and accessible experience for everyone. We understand
            that planning a trip can often be overwhelming, time-consuming, and
            expensive. That's why we have created a unique travel helper to make
            your journey as effortless as possible.
          </p>
          <p>
            Our mission is simple: to provide you with the most cost-effective
            and efficient travel itineraries tailored to your preferences.
            Whether you're a seasoned traveler or embarking on your first
            adventure, our website is designed to simplify the planning process
            and ensure you have an unforgettable trip.
          </p>
          <p>
            How does it work? It's easy! Just provide us with a few essential
            details, such as your desired destination, travel dates, budget and
            the number of people you are going with. Our advanced algorithm will
            then create the best itinerary for your needs.
          </p>
          <p>
            So, whether you're planning a weekend getaway, an international
            adventure, or a backpacking expedition, let{" "}
            <span>Travel Helper</span> be your trusted travel partner. Start
            exploring the world with us today and unlock a world of
            possibilities!
          </p>
        </div>
      </Stack>
    </Container>
  );
}

export default About;
