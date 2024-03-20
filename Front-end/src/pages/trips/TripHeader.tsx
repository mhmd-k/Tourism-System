import { Typography } from "@mui/material";

interface TripHeaderProps {
  destination: string;
  date: string;
  fromCity: string;
  totalBudget: number;
  numberOfPeople: number;
}

function TripHeader({
  destination,
  date,
  totalBudget,
  numberOfPeople,
}: TripHeaderProps) {
  return (
    <div className="trip-header">
      <Typography component={"h2"}>Trip to {destination}</Typography>
      <ul>
        <li>
          date: <span>{date}</span>
        </li>
        <li>
          budget: <span>{totalBudget}$</span>
        </li>
        <li>
          number of people: <span>{numberOfPeople}</span>
        </li>
      </ul>
    </div>
  );
}

export default TripHeader;
