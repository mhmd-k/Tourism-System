import { DateRange, DeleteOutline } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { IconButton } from "@mui/material";
import React from "react";
import { TripDay } from "../types";

interface TripCardProps {
  trip_id: number;
  destination: string;
  tripDays: TripDay[];
  date: string;
}

function TripCard({ trip_id, destination, tripDays, date }: TripCardProps) {
  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
  };

  return (
    <Link to={`${trip_id}`}>
      <div className="trip-card">
        <div className="image">
          <img src={`/src/assets/italy-${trip_id}.jpg`} />
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
