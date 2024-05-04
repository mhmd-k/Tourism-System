import { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { Button, Container, Stack, Typography } from "@mui/material";
import AutoFixHighOutlinedIcon from "@mui/icons-material/AutoFixHighOutlined";
import { useLocation, useNavigate } from "react-router-dom";

function Home() {
  const [search, setSearch] = useState<string>("");

  const { state } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (state) {
      setTimeout(() => {
        navigate(location.pathname, {});
      }, 6000);
    }
  }, [navigate, state]);

  const handleSeachChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleSearch = () => {
    navigate("places", {
      state: {
        placeName: search,
      },
    });
  };

  return (
    <>
      {state ? <div className="welcome-msg">{state}</div> : <></>}
      <div className="home-page">
        <h1>Where to?</h1>
        <div className="search">
          <input
            type="search"
            name="search"
            value={search}
            onChange={handleSeachChange}
            placeholder="Place, City, Hotel..."
            autoComplete="off"
          />
          <Button onClick={handleSearch}>
            <SearchIcon />
          </Button>
        </div>
        <div className="home">
          <Container>
            <h2>Build a trip in minutes</h2>
            <Typography>
              Get a personalized itinerary just for you by answering some
              <br />
              questions and picking the places that you want to visit
            </Typography>
            <Stack sx={{ margin: "30px 0" }} direction={"row"} gap={2}>
              <Button
                endIcon={<AutoFixHighOutlinedIcon />}
                className="home-btn"
                variant="contained"
                sx={{
                  borderRadius: "30px",

                  backgroundColor: "var(--blue-color)",
                }}
                onClick={() => navigate("generateTrip")}
              >
                Generate A Trip
              </Button>
            </Stack>
          </Container>
          <div className="mobile-image">
            <img src="/src/assets/home-mobile.png" alt="" />
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
