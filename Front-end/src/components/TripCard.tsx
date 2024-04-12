import { DateRange, DeleteOutline } from "@mui/icons-material";
import { Trip } from "../types";
import { Link } from "react-router-dom";
import { IconButton } from "@mui/material";
import React from "react";

const cites = ["milan", "napoli", "roma", "venice", "florence"];

function TripCard({ id, destination, tripDays, date }: Trip) {
  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
  };

  return (
    <Link to={`${id}`}>
      <div className="trip-card">
        <div className="image">
          <img
            src={`https://source.unsplash.com/1600x900/?${cites[Math.floor(Math.random() * cites.length)]}`}
          />
        </div>
        <div className="content">
          <h3>
            Trip to {destination} for {tripDays.length} days
          </h3>
          <p>
            <DateRange /> {date}
          </p>
        </div>
        <IconButton
          sx={{
            position: "absolute",
            bottom: "10px",
            right: "10px",
            zIndex: "100",
          }}
          onClick={handleDelete}
          color="error"
        >
          <DeleteOutline />
        </IconButton>
      </div>
    </Link>
  );
}

export default TripCard;
