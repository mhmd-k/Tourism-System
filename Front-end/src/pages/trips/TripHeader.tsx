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
      <h2>Trip to {destination}</h2>
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
