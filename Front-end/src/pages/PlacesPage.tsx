import { useState } from "react";
import { Container, TextField } from "@mui/material";
import { NavLink } from "react-router-dom";
import PlaceCard from "../components/PlaceCard";
import { TripPlace } from "../types";

const filters = [
  { label: "All", value: "" },
  { label: "Resturants", value: "resturants" },
  { label: "Hotels", value: "hotels" },
  { label: "Old Places", value: "old_places" },
  { label: "Night Places", value: "night_places" },
  { label: "Natural Places", value: "natural_places" },
];

const places: TripPlace[] = [
  {
    id: 1,
    name: "Hotel Quirinale",
    address: "Via Nazionale 7, Central Station, 00184 Rome, Italy",
    location: "41.90182202037885 12.494873553074376",
    price: 200,
    stars: 5,
    placeType: "hotel",
  },
  {
    id: 2,
    name: "Hassler Roma resturnat",
    address: "Piazza della Trinità dei Monti, 6, 00187 Rome, Italy",
    location: "41.906092743874524 12.484043924238929",
    description:
      "dsfhvbo sdfuoias bkjdfer wuofuierf  wif iashdfuligasjkdf oiwuds f",
    stars: 2,
    price: 90,
    placeType: "restaurant",
    foodType: "fine dinning",
  },
];

function PlacesPage() {
  const [activeLink, setActiveLink] = useState<number>(0);
  const [search, setSearch] = useState<string>("");

  const handleSeachChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <div className="places-page">
      <Container>
        <div className="search">
          <TextField
            variant="outlined"
            placeholder="Search..."
            size="small"
            value={search}
            onInput={handleSeachChange}
            sx={{
              width: "100%",
              maxWidth: "300px",
            }}
            autoComplete="off"
          />
          <button>Search</button>
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
      <div className="places-container">
        {places.map((e, i) => (
          <PlaceCard {...e} key={i} />
        ))}
      </div>
    </div>
  );
}

export default PlacesPage;
