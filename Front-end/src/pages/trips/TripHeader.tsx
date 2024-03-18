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
    <div
      style={{
        textAlign: "left",
        padding: "10px",
        borderBottom: "1px solid black",
      }}
    >
      <h2>Trip to {destination}</h2>
      <div>date: {date}</div>
      <div>budget: {totalBudget}</div>
      <div>number of people: {numberOfPeople}</div>
    </div>
  );
}

export default TripHeader;
