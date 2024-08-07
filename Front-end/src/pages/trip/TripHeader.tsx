import { formatCurrency } from "../../utils";
import { mapStore } from "../../zustand/MapStore";

function TripHeader() {
  const trip = mapStore((state) => state.trip);

  if (!trip) return;

  return (
    <div className="trip-header">
      <h2>Trip to {trip.destination}</h2>
      <ul>
        <li>
          date
          <br /> <span>{trip.date}</span>
        </li>
        {typeof trip.totalBudget == "number" ? (
          <li>
            budget
            <br />
            <span
              style={{
                color:
                  trip.TotalCost - trip.totalBudget > 500
                    ? "red"
                    : "var(--blue-color)",
              }}
            >
              {formatCurrency(trip.totalBudget)}
            </span>
          </li>
        ) : (
          <></>
        )}
        <li>
          needed Money
          <br /> <span>{formatCurrency(trip.TotalCost)}</span>
        </li>
        <li>
          num of people
          <br /> <span>{trip.numberOfPeople}</span>
        </li>
      </ul>
    </div>
  );
}

export default TripHeader;
