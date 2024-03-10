import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { Button, Container, Stack, Typography } from "@mui/material";
import AddLocationAltOutlinedIcon from "@mui/icons-material/AddLocationAltOutlined";
import AutoFixHighOutlinedIcon from "@mui/icons-material/AutoFixHighOutlined";
import { useNavigate } from "react-router-dom";

function Home() {
  const [search, setSearch] = useState("");

  const handleSeachChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const navigate = useNavigate();

  return (
    <div className="home-page">
      <h1>Where to?</h1>
      <div className="search">
        <input
          type="search"
          name="search"
          value={search}
          onChange={handleSeachChange}
          placeholder="Place, City, Hotel..."
        />
        <SearchIcon />
      </div>
      <div className="home">
        <Container>
          <h2>Build a trip in minutes</h2>
          <Typography>Get a personalized itinerary just for you</Typography>
          <Stack sx={{ margin: "30px 0" }} direction={"row"} gap={2}>
            <Button
              endIcon={<AddLocationAltOutlinedIcon />}
              color="primary"
              variant="contained"
              sx={{ borderRadius: "30px", padding: "10px 20px" }}
            >
              Build Your Own Trip
            </Button>
            <Button
              endIcon={<AutoFixHighOutlinedIcon />}
              className="home-btn"
              variant="contained"
              sx={{
                borderRadius: "30px",
                padding: "10px 20px",
                backgroundColor: "rgb(14, 186, 169)",
              }}
              onClick={() => navigate("generateTrip")}
            >
              Generate A Trip
            </Button>
          </Stack>
        </Container>
      </div>
    </div>
  );
}

export default Home;
