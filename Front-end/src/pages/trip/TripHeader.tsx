import { mapStore } from "../../zustand/MapStore";

function TripHeader() {
  const trip = mapStore((state) => state.trip);

  if (!trip) return;

  return (
    <div className="trip-header">
      <h2>Trip to {trip.destination}</h2>
      <ul>
        <li>
          date: <span>{trip.date}</span>
        </li>
        {typeof trip.totalBudget == "number" ? (
          <li>
            budget:{" "}
            <span
              style={{
                color:
                  Math.abs(trip.totalBudget - trip.TotalCost) > 500
                    ? "red"
                    : "var(--blue-color)",
              }}
            >
              {trip.totalBudget}$
            </span>
          </li>
        ) : (
          <></>
        )}
        <li>
          needed Money: <span>{trip.TotalCost}$</span>
        </li>
        <li>
          number of people: <span>{trip.numberOfPeople}</span>
        </li>
      </ul>
    </div>
  );
}

export default TripHeader;
