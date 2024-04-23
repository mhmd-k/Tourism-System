interface TripHeaderProps {
  destination: string;
  date: string;
  fromCity: string;
  totalBudget: number;
  TotalCost: number;
  numberOfPeople: number;
  careAboutBudget: boolean;
}

function TripHeader({
  destination,
  date,
  totalBudget,
  TotalCost,
  numberOfPeople,
  careAboutBudget,
}: TripHeaderProps) {
  return (
    <div className="trip-header">
      <h2>Trip to {destination}</h2>
      <ul>
        <li>
          date: <span>{date}</span>
        </li>
        {careAboutBudget ? (
          <li>
            budget:{" "}
            <span
              style={{ color: totalBudget - TotalCost > 0 ? "blue" : "red" }}
            >
              {totalBudget}$
            </span>
          </li>
        ) : (
          <></>
        )}
        <li>
          needed Mony: <span>{TotalCost}$</span>
        </li>
        <li>
          number of people: <span>{numberOfPeople}</span>
        </li>
      </ul>
    </div>
  );
}

export default TripHeader;
