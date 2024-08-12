import { useEffect, useState } from "react";
import { Container, TextField, Typography } from "@mui/material";
import { NavLink, useLocation, useSearchParams } from "react-router-dom";
import PlaceCard from "../components/PlaceCard";
import { TripPlace } from "../types";
import LoadingSpinner from "../components/LoadingSpinner";
import axios from "axios";

const filters = [
  { label: "All", value: "" },
  { label: "Resturants", value: "restaurant" },
  { label: "Hotels", value: "hotel" },
  { label: "Old Places", value: "old" },
  { label: "Night Places", value: "night" },
  { label: "Natural Places", value: "natural" },
];

function PlacesPage() {
  const [places, setPlaces] = useState<TripPlace[]>([]);
  const [activeLink, setActiveLink] = useState<number>(0);
  const [placeName, setPlaceName] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [searchParams] = useSearchParams();

  const location = useLocation();

  useEffect(() => {
    async function getPlaces() {
      if (!location.state.placeName) return;

      setPlaceName(location.state.placeName);
      setIsLoading(true);
      setError("");

      const URL = `http://localhost:8000/api/search?placeName=${location.state.placeName}`;

      try {
        const response = await axios.get(URL);

        if (response.status === 200) {
          setPlaces(response.data.places);
        } else {
          setError(response.data.error);
        }
      } catch (error) {
        // @ts-expect-error error is undefined
        setError(error.response.data.error);
      } finally {
        setIsLoading(false);
      }
    }

    getPlaces();
  }, []);

  const handleSeachChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPlaceName(e.target.value);
  };

  const handleSearchSubmit = async () => {
    setIsLoading(true);
    setError("");

    const placeType = searchParams.get("type");

    const URL = placeType
      ? `http://localhost:8000/api/search?placeType=${placeType}&placeName=${placeName}`
      : `http://localhost:8000/api/search?placeName=${placeName}`;

    try {
      const response = await axios.get(URL);

      if (response.status === 200) {
        setPlaces(response.data.places);
      } else {
        setError(response.data.error);
      }
    } catch (error) {
      // @ts-expect-error error is undefined
      setError(error.response.data.error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredPlaces = searchParams.get("type")
    ? places.filter(
        (place) =>
          place.placeType.slice(0, 3) === searchParams.get("type")?.slice(0, 3)
      )
    : places;

  return (
    <div className="places-page">
      <Container>
        <div className="search">
          <TextField
            variant="outlined"
            placeholder="Search..."
            size="small"
            value={placeName}
            onInput={handleSeachChange}
            sx={{
              width: "100%",
              maxWidth: "300px",
            }}
            autoComplete="off"
          />
          <button onClick={handleSearchSubmit} disabled={isLoading}>
            {isLoading ? <LoadingSpinner color="white" size={20} /> : "Search"}
          </button>
        </div>
      </Container>
      <div className="filters">
        <Container>
          {filters.map((e, i) => (
            <NavLink
              key={i}
              to={e.value === "" ? "" : `?type=${e.value}`}
              onClick={() => setActiveLink(i)}
              className={() => (activeLink === i ? "active" : "")}
            >
              {e.label}
            </NavLink>
          ))}
        </Container>
      </div>
      {error ? (
        <Typography p={2} color={"error"} component={"h2"}>
          {error}
        </Typography>
      ) : (
        <></>
      )}
      <div className="places-container">
        {filteredPlaces.map((e, i) => (
          <PlaceCard {...e} key={i} />
        ))}
      </div>
    </div>
  );
}

export default PlacesPage;
