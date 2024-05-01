import { mapStore } from "../../zustand/MapStore";

function TripHeader({ careAboutBudget }: { careAboutBudget: boolean }) {
  const trip = mapStore((state) => state.trip);

  if (!trip) return;

  return (
    <div className="trip-header">
      <h2>Trip to {trip.destination}</h2>
      <ul>
        <li>
          date: <span>{trip.date}</span>
        </li>
        {careAboutBudget ? (
          <li>
            budget:{" "}
            <span
              style={{
                color: trip.totalBudget - trip.TotalCost > 0 ? "blue" : "red",
              }}
            >
              {trip.totalBudget}$
            </span>
          </li>
        ) : (
          <></>
        )}
        <li>
          needed Mony: <span>{trip.TotalCost}$</span>
        </li>
        <li>
          number of people: <span>{trip.numberOfPeople}</span>
        </li>
      </ul>
    </div>
  );
}

export default TripHeader;
